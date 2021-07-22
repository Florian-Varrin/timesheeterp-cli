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
timesheeter-cli/0.1.2 linux-x64 node-v12.21.0
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
* [`tser projects:delete`](#tser-projectsdelete)
* [`tser projects:edit [FILE]`](#tser-projectsedit-file)
* [`tser projects:list [FILE]`](#tser-projectslist-file)
* [`tser times:add [FILE]`](#tser-timesadd-file)
* [`tser times:delete`](#tser-timesdelete)
* [`tser times:edit`](#tser-timesedit)
* [`tser times:get`](#tser-timesget)

## `tser config`

Configure the client

```
USAGE
  $ tser config
```

_See code: [src/commands/config.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.1.2/src/commands/config.ts)_

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

_See code: [src/commands/login.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.1.2/src/commands/login.ts)_

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
  $ tser prj:create
```

_See code: [src/commands/projects/create.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.1.2/src/commands/projects/create.ts)_

## `tser projects:delete`

delete a project

```
USAGE
  $ tser projects:delete

OPTIONS
  --force
  --id=id  Id of the project

ALIASES
  $ tser project:delete
  $ tser prj:delete
```

_See code: [src/commands/projects/delete.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.1.2/src/commands/projects/delete.ts)_

## `tser projects:edit [FILE]`

edit a project

```
USAGE
  $ tser projects:edit [FILE]

OPTIONS
  --id=id  Id of the project

ALIASES
  $ tser project:edit
  $ tser prj:edit
```

_See code: [src/commands/projects/edit.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.1.2/src/commands/projects/edit.ts)_

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
  $ tser prj:list
```

_See code: [src/commands/projects/list.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.1.2/src/commands/projects/list.ts)_

## `tser times:add [FILE]`

add a time to a project

```
USAGE
  $ tser times:add [FILE]

OPTIONS
  -p, --project-id=project-id  Id of the project
  --date=date                  time's date
  --description=description    time's description
  --duration=duration          time's duration in decimal
  --today                      add time for today

ALIASES
  $ tser time:add
```

_See code: [src/commands/times/add.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.1.2/src/commands/times/add.ts)_

## `tser times:delete`

edit a time

```
USAGE
  $ tser times:delete

OPTIONS
  -p, --project-id=project-id  Id of the project
  -t, --time-id=time-id        Id of the time
  --force

ALIASES
  $ tser time:delete
```

_See code: [src/commands/times/delete.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.1.2/src/commands/times/delete.ts)_

## `tser times:edit`

edit a time

```
USAGE
  $ tser times:edit

OPTIONS
  -p, --project-id=project-id  Id of the project
  -t, --time-id=time-id        Id of the time

ALIASES
  $ tser time:add
```

_See code: [src/commands/times/edit.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.1.2/src/commands/times/edit.ts)_

## `tser times:get`

get times for a project

```
USAGE
  $ tser times:get

OPTIONS
  -e, --end=end                End date of the query
  -p, --project-id=project-id  Id of the project
  -s, --start=start            Start date of the query
  -x, --extended               show extra columns
  --columns=columns            only show provided columns (comma-separated)
  --csv                        output is csv format [alias: --output=csv]
  --filter=filter              filter property by partial string matching, ex: name=foo
  --no-header                  hide table header from output
  --no-truncate                do not truncate output to fit screen
  --output=csv|json|yaml       output in a more machine friendly format
  --sort=sort                  property to sort by (prepend '-' for descending)

ALIASES
  $ tser time:get
```

_See code: [src/commands/times/get.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.1.2/src/commands/times/get.ts)_
<!-- commandsstop -->
