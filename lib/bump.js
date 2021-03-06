#!/usr/bin/env node
const fs = require('fs');
class Bump {
  constructor(path, action = 'build') {
    this.versionRex =
      /<Version>[\S]*(([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+))[\S]*<\/Version>/i;
    this.packageVersionRex =
      /<PackageVersion>[\S]*(([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+))[\S]*<\/PackageVersion>/i;
    this.assemblyVersionRex =
      /<AssemblyVersion>[\S]*(([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+))[\S]*<\/AssemblyVersion>/i;
    this.fileVersionRex =
      /<FileVersion>[\S]*(([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+))[\S]*<\/FileVersion>/i;
    this.informationalVersionRex =
      /<InformationalVersion>[\S]*(([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+))[\S]*<\/InformationalVersion>/gi;
    this.versions = new Map([
      ['Version', this.versionRex],
      ['PackageVersion', this.packageVersionRex],
      ['AssemblyVersion', this.assemblyVersionRex],
      ['FileVersion', this.fileVersionRex],
      ['InformationalVersion', this.informationalVersionRex],
    ]);
    this.optionsRex = /((major)|(minor)|(patch))/i;
    this.file = path;
    this.action = action;
  }
  bump(current = false, dryRun = false, tagRepo = false) {
    let options = 'build';
    const optionsMatches = this.optionsRex.exec(this.action);
    if (optionsMatches && optionsMatches.length >= 3) {
      options = optionsMatches[1].toString();
    }
    // console.debug(`options: ${JSON.stringify(options)}`);
    const originContent = fs.readFileSync(this.file, 'utf8').toString();
    // console.debug(`originContent: ${originContent}`);
    var bumppedContent = originContent.trim();
    var modified = false;
    this.versions.forEach((v, k) => {
      const matches = v.exec(bumppedContent);
      // console.debug(`matches: ${JSON.stringify(matches)}`);
      if (matches && matches.length === 6) {
        const originVersion = matches[1].toString();
        if (current) {
          console.log(originVersion);
          return;
        }
        // console.debug(`${k}.originVersion: ${originVersion}`);
        const bumppedVersion = Bump.bumpVersion(matches, options);
        // console.debug(`${k}.bumppedVersion: ${bumppedVersion}`);
        const originMatch = matches[0].toString();
        // console.debug(`${k}.originMatch: ${originMatch}`);
        const bumppedMatch = originMatch.replace(originVersion, bumppedVersion);
        // console.debug(`${k}.bumppedMatch: ${bumppedMatch}`);
        bumppedContent = bumppedContent.replace(originMatch, bumppedMatch);
        console.info(bumppedVersion);

        if (tagRepo) {
          var gitTag = require('git-tag')({ localOnly: dryRun });

          gitTag.create(bumppedVersion, null, function (res) {
            console.log('git tag', bumppedVersion);
          });
        }

        // console.info(`Bumped ${k} to ${bumppedVersion}`);
        modified = true;
      }
    });
    // console.debug(`bumppedContent: ${bumppedContent}`);
    if (!dryRun && !current) {
      fs.writeFileSync(this.file, bumppedContent, 'utf8');
    }
    return true;
  }
  static bumpVersion(matches, options) {
    if (options === 'major') {
      const versionPart = +matches[2].toString() + 1;
      return `${versionPart}.0.0.0`;
    }
    if (options === 'minor') {
      const versionPart = +matches[3].toString() + 1;
      return `${matches[2]}.${versionPart}.0.0`;
    }
    if (options === 'patch') {
      const versionPart = +matches[4].toString() + 1;
      return `${matches[2]}.${matches[3]}.${versionPart}.0`;
    }
    const versionPart = +matches[5].toString() + 1;
    return `${matches[2]}.${matches[3]}.${matches[4]}.${versionPart}`;
  }
}

module.exports = Bump;
