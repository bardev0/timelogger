# Timelogger

## About

Simple, command line tool that allows users to log their time spent on project durring a coding session.
Build with open-soucre, data privacy and customization in mind lets you to simplify your time loging habits and focus on projects on hand.

## Installation

```
pnpm install
pnpm run build
```

### Packaging

By default project contains a build scripts for linux (x64) and macOS (arm64).
All executables are placed in **build** directory.

> -   Linux

```
pnpm run package-cmd-linux
```

> -   MacOs

```
pnpm run package-cmd-macos
```

## Configuration

Example config file is included withing repo.
Copy **timelogger.toml** to `~./config/` folder.

## Usage
| Command      | Description |
| ----------- | ----------- |
| `./timelogger -s`| initilizes new session|
| `./timelogger -c`| closes last session|
| `./timelogger -los` | list all open sessions|
| `./timelogger -lcs` | list all closed sessions|

# Roadmap
- [] finish all CLI logging options
- [] add CVS export
- [] add templating enging to export stats to HTML/PDF for fun with charts.js
