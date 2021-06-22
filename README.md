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
timesheeter-cli/0.0.0 linux-x64 node-v12.18.2
$ tser --help [COMMAND]
USAGE
  $ tser COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tser config`](#tser-config)
* [`tser help [COMMAND]`](#tser-help-command)
* [`tser login`](#tser-login)
* [`tser projects:create`](#tser-projectscreate)
* [`tser projects:delete [FILE]`](#tser-projectsdelete-file)
* [`tser projects:list [FILE]`](#tser-projectslist-file)

## `tser config`

Configure the client

```
USAGE
  $ tser config
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

Login to TimeSheetER

```
USAGE
  $ tser login

OPTIONS
  -a, --account=account
```

_See code: [src/commands/login.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.0.0/src/commands/login.ts)_

## `tser projects:create`

create a project

```
USAGE
  $ tser projects:create

OPTIONS
  -h, --hourRate=hourRate  hour rate the project
  -n, --name=name          name of the project

ALIASES
  $ tser project:create
```

_See code: [src/commands/projects/create.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.0.0/src/commands/projects/create.ts)_

## `tser projects:delete [FILE]`

describe the command here

```
USAGE
  $ tser projects:delete [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/projects/delete.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.0.0/src/commands/projects/delete.ts)_

## `tser projects:list [FILE]`

list projects

```
USAGE
  $ tser projects:list [FILE]

OPTIONS
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --sort=sort             property to sort by (prepend '-' for descending)

ALIASES
  $ tser project:list
```

_See code: [src/commands/projects/list.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.0.0/src/commands/projects/list.ts)_
<!-- commandsstop -->
