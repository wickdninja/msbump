# msbump

![image](https://user-images.githubusercontent.com/6932589/135706650-25dffc3b-ea0e-48b2-999c-2f88d55c6f9b.png)


CLI utility to bump versions of dotnet projects.


## Usage

You can use `npx` to execute directly or install globally. 

`npx msbump --p path/to/project.csproj [major|minor|patch|build]`

OR 

`npm i -g msbump`

`msbump --p path/to/project.csproj [major|minor|patch|build]`

### Args

<strong>--[path|project|p]</strong>  is <strong>required</strong> and `[major|minor|patch|build]` is optional

### Examples:

```
npx msbump --p ./tests/test.csproj
Bumped Version to 1.0.0.1

npx msbump --p ./tests/test.csproj build
Bumped Version to 1.0.0.2

npx msbump --p ./tests/test.csproj patch
Bumped Version to 1.0.1.2

npx msbump --p ./tests/test.csproj minor
Bumped Version to 1.1.1.2

npx msbump --p ./tests/test.csproj major
Bumped Version to 2.1.1.2
```
