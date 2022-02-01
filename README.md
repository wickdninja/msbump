# msbump

![bump](https://user-images.githubusercontent.com/6932589/152014161-38ed2813-ebc4-4784-948d-889ceb1419c0.png)

CLI utility to bump versions of dotnet projects.

## Usage

You can use `npx` to execute directly or install globally.

`npx msbump --p path/to/project.csproj [major|minor|patch|build]`

OR

`npm i -g msbump`

`msbump --p path/to/project.csproj [major|minor|patch|build]`

### Args

**`--[path|project|p]`** **required**

***`[major|minor|patch|build]` optional ( defaults to `build` )***

***`--[tag]` optional ( adds git tag )***

### Examples

```sh
npx msbump --p ./tests/test.csproj
Bumped Version to 1.0.0.1

npx msbump --p ./tests/test.csproj build
Bumped Version to 1.0.0.2

npx msbump --p ./tests/test.csproj patch
Bumped Version to 1.0.1.0

npx msbump --p ./tests/test.csproj minor
Bumped Version to 1.1.0.0

npx msbump --p ./tests/test.csproj major
Bumped Version to 2.0.0.0

# bump and tag 
npx msbump --p ./tests/test.csproj major --tag
Bumped Version to 3.0.0.0
```

### Using Build Targets

```xml
<Target Name="BumpBuildVersionOnDebugBuild" BeforeTargets="Build" Condition=" '$(Configuration)' == 'Debug'">
    <Exec Command="npx msbump --p ./*.csproj build" ContinueOnError="true">
      <Output TaskParameter="ExitCode" PropertyName="ErrorCode" />
    </Exec>
  </Target>
  <Target Name="BumpPatchVersionOnReleaseBuild" BeforeTargets="Build" Condition=" '$(Configuration)' == 'Release'">
    <Exec Command="npx msbump --p ./*.csproj patch" ContinueOnError="true">
      <Output TaskParameter="ExitCode" PropertyName="ErrorCode" />
    </Exec>
  </Target>
```
