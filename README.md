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
pnpm run package-server-linux
```

> -   MacOs

```
pnpm run package-cmd-macos
pnpm run package-server-macos
```

## Configuration

Users can connect to local MongoDB instance

## Usage

### Start

`./timelogger --start` initilizes new session
`./timelogger --stop` stops last session
`./timelogger --list` list all sessions ( with open current one )
`./timelogger --total` sums up total time spent coding
