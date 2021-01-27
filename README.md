timesheeter-cli
===============

CLI client for TimeSheetER

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/timesheeter-cli.svg)](https://npmjs.org/package/timesheeter-cli)
[![Downloads/week](https://img.shields.io/npm/dw/timesheeter-cli.svg)](https://npmjs.org/package/timesheeter-cli)
[![License](https://img.shields.io/npm/l/timesheeter-cli.svg)](https://github.com/Florian-Varrin/timesheeter-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g timesheeter-cli
$ tser COMMAND
running command...
$ tser (-v|--version|version)
timesheeter-cli/0.0.0 win32-x64 node-v12.18.2
$ tser --help [COMMAND]
USAGE
  $ tser COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tser config [FILE]`](#tser-config-file)
* [`tser help [COMMAND]`](#tser-help-command)
* [`tser login`](#tser-login)

## `tser config [FILE]`

describe the command here

```
USAGE
  $ tser config [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/config.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.0.0/src/commands/config.ts)_

## `tser help [COMMAND]`

display help for tser

```
USAGE
  $ tser help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

## `tser login`

describe the command here

```
USAGE
  $ tser login
```

_See code: [src/commands/login.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.0.0/src/commands/login.ts)_
<!-- commandsstop -->
