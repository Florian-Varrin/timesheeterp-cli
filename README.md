# TimesheetERP
TimesheetERP is an open source ERP created primarily for developers. Besides being made for a need, it is a project made mostly for fun. But feel free to use it.  
The primary goal was to be able to use this ERP via the CLI to not lose productivity by switching tool too often.

At the moment it includes the possibility to create timers to identify what time is spent on each task and to assign times to different projects.

## Technology
This repository is the CLI client part of the application and was written with Typescript ❤ using the [oclif](https://oclif.io/) framework and run on [NodeJS](https://nodejs.org/en/). It uses the [JS client library](https://github.com/Florian-Varrin/timesheeterp-client-js-sdk).

## Server
Running the [server](https://github.com/Florian-Varrin/timesheeterp-server) is needed to use this CLI as nothing is stored locally. 
<!-- tocstop -->
# Usage
This is a hobby projet and not a production ready solution, there are certainly bugs. Do not hesitate to open issues if you encounter some.
<!-- usage -->
```sh-session
$ npm install -g timesheeter-cli
$ tser COMMAND
running command...
$ tser (-v|--version|version)
timesheeter-cli/0.2.2 linux-x64 node-v16.14.2
$ tser --help [COMMAND]
USAGE
  $ tser COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tser autocomplete [SHELL]`](#tser-autocomplete-shell)
* [`tser clocks:create`](#tser-clockscreate)
* [`tser clocks:delete`](#tser-clocksdelete)
* [`tser clocks:edit`](#tser-clocksedit)
* [`tser clocks:list`](#tser-clockslist)
* [`tser clocks:reset`](#tser-clocksreset)
* [`tser clocks:start`](#tser-clocksstart)
* [`tser clocks:stop`](#tser-clocksstop)
* [`tser config`](#tser-config)
* [`tser help [COMMAND]`](#tser-help-command)
* [`tser login`](#tser-login)
* [`tser projects:create`](#tser-projectscreate)
* [`tser projects:delete`](#tser-projectsdelete)
* [`tser projects:edit`](#tser-projectsedit)
* [`tser projects:list`](#tser-projectslist)
* [`tser times:create`](#tser-timescreate)
* [`tser times:delete`](#tser-timesdelete)
* [`tser times:edit`](#tser-timesedit)
* [`tser times:list`](#tser-timeslist)

## `tser autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ tser autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ tser autocomplete
  $ tser autocomplete bash
  $ tser autocomplete zsh
  $ tser autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.3.0/src/commands/autocomplete/index.ts)_

## `tser clocks:create`

create a clock

```
USAGE
  $ tser clocks:create

OPTIONS
  -n, --name=name  name of the clock
  -s, --start      Start the clock after creation
  --stop-all       Stop all other clocks

ALIASES
  $ tser clock:create
  $ tser clk:create
```

_See code: [src/commands/clocks/create.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/clocks/create.ts)_

## `tser clocks:delete`

delete a clock

```
USAGE
  $ tser clocks:delete

OPTIONS
  --force
  --id=id  Id of the clock

ALIASES
  $ tser clock:delete
  $ tser clk:delete
```

_See code: [src/commands/clocks/delete.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/clocks/delete.ts)_

## `tser clocks:edit`

edit a clock

```
USAGE
  $ tser clocks:edit

OPTIONS
  --id=id  Id of the clock

ALIASES
  $ tser clock:edit
  $ tser clk:edit
```

_See code: [src/commands/clocks/edit.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/clocks/edit.ts)_

## `tser clocks:list`

list clocks

```
USAGE
  $ tser clocks:list

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
  $ tser clock:list
  $ tser clk:list
```

_See code: [src/commands/clocks/list.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/clocks/list.ts)_

## `tser clocks:reset`

reset a clock

```
USAGE
  $ tser clocks:reset

OPTIONS
  -s, --start  Start the clock after reset
  --all        Reset all clocks
  --id=id      Id of the clock

ALIASES
  $ tser clock:reset
  $ tser clk:reset
```

_See code: [src/commands/clocks/reset.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/clocks/reset.ts)_

## `tser clocks:start`

start a clock

```
USAGE
  $ tser clocks:start

OPTIONS
  --id=id     Id of the clock
  --stop-all  Stop all other clocks

ALIASES
  $ tser clock:start
  $ tser clk:start
```

_See code: [src/commands/clocks/start.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/clocks/start.ts)_

## `tser clocks:stop`

stop a clock

```
USAGE
  $ tser clocks:stop

OPTIONS
  --all    Stop all clocks
  --id=id  Id of the clock

ALIASES
  $ tser clock:stop
  $ tser clk:stop
```

_See code: [src/commands/clocks/stop.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/clocks/stop.ts)_

## `tser config`

Configure the client

```
USAGE
  $ tser config
```

_See code: [src/commands/config.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/config.ts)_

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

_See code: [src/commands/login.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/login.ts)_

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

_See code: [src/commands/projects/create.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/projects/create.ts)_

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

_See code: [src/commands/projects/delete.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/projects/delete.ts)_

## `tser projects:edit`

edit a project

```
USAGE
  $ tser projects:edit

OPTIONS
  --id=id  Id of the project

ALIASES
  $ tser project:edit
  $ tser prj:edit
```

_See code: [src/commands/projects/edit.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/projects/edit.ts)_

## `tser projects:list`

list projects

```
USAGE
  $ tser projects:list

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

_See code: [src/commands/projects/list.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/projects/list.ts)_

## `tser times:create`

add a time to a project

```
USAGE
  $ tser times:create

OPTIONS
  -p, --project-id=project-id  Id of the project
  --date=date                  time's date
  --description=description    time's description
  --duration=duration          time's duration in decimal
  --today                      add time for today

ALIASES
  $ tser time:create
```

_See code: [src/commands/times/create.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/times/create.ts)_

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

_See code: [src/commands/times/delete.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/times/delete.ts)_

## `tser times:edit`

edit a time

```
USAGE
  $ tser times:edit

OPTIONS
  -p, --project-id=project-id  Id of the project
  -t, --time-id=time-id        Id of the time

ALIASES
  $ tser time:edit
```

_See code: [src/commands/times/edit.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/times/edit.ts)_

## `tser times:list`

get times for a project

```
USAGE
  $ tser times:list

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
  $ tser time:list
```

_See code: [src/commands/times/list.ts](https://github.com/Florian-Varrin/timesheeter-cli/blob/v0.2.2/src/commands/times/list.ts)_
<!-- commandsstop -->
