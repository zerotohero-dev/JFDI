#! /usr/bin/env node

/*
 *           ___         ___           ___
 *          /\  \       /\  \         /\  \          ___
 *          \:\  \     /::\  \       /::\  \        /\  \
 *      ___ /::\__\   /:/\:\  \     /:/\:\  \       \:\  \
 *     /\  /:/\/__/  /::\~\:\  \   /:/  \:\__\      /::\__\
 *     \:\/:/  /    /:/\:\ \:\__\ /:/__/ \:|__|  __/:/\/__/
 *      \::/  /     \/__\:\ \/__/ \:\  \ /:/  / /\/:/  /
 *       \/__/           \:\__\    \:\  /:/  /  \::/__/
 *                        \/__/     \:\/:/  /    \:\__\
 *                                   \::/__/      \/__/
 */

// TODO: move these to jshint.rc
/*global process, console*/

'use strict';

var JFDI = require('./lib/JFDI');
var program = require('commander');
var println = console.log;
var info = function() {};

function pad(index) {
    var str = '' + index;

    switch (str.length) {
        case 1:
            return '   ' + str;
        case 2:
            return '  ' + str;
        case 3:
            return ' ' + str;
        case 4:
            return str;
    }
}

function printGoals(goals) {
    goals.forEach(function(goal, index) {
        println(pad(index) + ' ' + goal);
    });
}

function handleCallbackResult(error, goals) {
    println('');

    if (error) {
        println('JFDI failed to add the goal :(');

        return;
    }

    var realm = goals.realm;
    var query = goals.query;

    switch (realm) {
        case 'today':
            if (query) {
                println('   ### "' + query + '" for Today ###');

                break;
            }

            println('   ### JFDI List For Today ###');

            break;

        case 'tomorrow':
            if (query) {
                println('   ### "' + query + '" for Today ###');

                break;
            }

            println('   ### Upcoming JFDI Stuff ###');

            break;

        default:
            println('Unknown realm "' + realm + '". exiting.');

            return;
    }

    goals = goals.goals;

    if (goals.length === 0) {
        switch (realm) {
            case 'today':
                if (query) {
                    println('');
                    println('       There are no matching goals for your query "' + query + '" for today :(');
                    println('');

                    break;
                }

                println('');
                println('       *Zero Inbox* for today! Hooray!');
                println('');
                println('       Sample Usage:');
                println('           Add a Goal       : jfdi [-a] "Save the world; one goal at a time."');
                println('           List Goals       : jfdi -l');
                println('           List All Commands: jfdi -h');
                println('');

                break;
            case 'tomorrow':
                if (query) {
                    println('');
                    println('       There are no matching goals for your query "' + query + '" for the near future :(');
                    println('');

                    break;
                }

                println('');
                println('       Your foreseeable future is pretty blank. Why not add some tasks?');
                println('');
                println('       Sample Usage:');
                println('           Add a Goal       : jfdi -a "Save the world; one goal at a time."');
                println('           List Goals       : jfdi -l');
                println('           List All Commands: jfdi -h');
                println('');

                break;
            default:
                println('Unknown realm "' + realm + '". exiting.');

                break;
        }

        return;
    }

    println('');
    printGoals(goals);
    println('');
}

// If you define a new command or option, make sure you update this, too.
// If a command is NOT a special command, then it means that it will implicitly
// called with add.
// i.e.
//
//      jfdi "Save the cheerleader; save the world!"
//
// will be implicityl converted to
//
//      jfdi --add "Save the cheerleader; save the world!"
//
// If the text is in this list, then this implicit conversion will not be done.
// So
//
//      jfdi today
//
// will be
//
//      jfdi --list today // note that we don't add `--add` now.
var specialCommands = [
    // TODO: be DRY, make them constants!
    'today',
    'tomorrow',
    'all',
    '-t', '--tomorrow',
    '-h', '--help'
];

var knownCommands = [
    // TODO: be DRY, make them constants!
    'today',
    'tomorrow',
    'all',
    '-t', '--tomorrow',
    '-h', '--help',
    '-V', '--version',
    '-a', '--add',
    '-f', '--find',
    '-d', '--defer',
    '-p', '--prioritize',
    '-l', '--list',
    '-t', '--tomorrow',
    '-x', '--do'
];

function isSpecialCommand(initialCommand) {
    return specialCommands.indexOf(initialCommand) > -1;
}

function isKnownCommand(command) {
    return knownCommands.indexOf(command) > -1;
}

function init() {
    var kNoArgs = 2;
    var kSingleCommand = 3;
    var kNotImplemented = 'This functionality has not been implemented yet.';
    var args = process.argv;
    var argLen = args.length;

    var initialCommand = args[2];

    if (args.length === kSingleCommand && !isSpecialCommand(initialCommand)) {
        args[3] = args[2];
        args[2] = '--add';
    } else if (argLen === kNoArgs) {
        args.push('--list');
        args.push('today');
    } else if(args[2] === '-e' || args[2] === '--expedite') {
        if(args[4] === undefined) {
            args[4] = 'tomorrow';
        }
    } else if(args[2] === '-t' || args[2] === '--tomorrow') {
        args[2] = '--list';
        args[3] = 'tomorrow';

        args.length = 4;
    }

    if(args.indexOf('today') === -1 && args.indexOf('tomorrow') === -1) {
        args.push('today');
    }

    if(!isNaN(parseInt(args[2], 10))) {
        args.splice(2, 0, '--do');
    }

    if (!isKnownCommand(args[2])) {
        if (args.length > 4) {
            args.splice(2, 0, '--add');
            args[3] = args.splice(3, args.length - 4).join(' ');
            args[4] = 'today';
        }
    } else if (args[2] === '-a' || args[2] === '--add') {
        if (args.length > 4) {
            args[3] = args.splice(3, args.length - 4).join(' ');
            args[4] = 'today';
        }
    } else if (args[2] === '-f' || args[2] === '--find') {
        if (args.length > 4) {
            args[3] = args.splice(3, args.length - 4).join(' ');
            args[4] = 'today';
        }
    }

    println(process.argv);

    // TODO: auto replace it from package JSON
    program.version('0.0.1');

    program
    .option('-a, --add <goal>', 'Add a goal to the top of the queue.');

    program
    .option('-f, --find <keyword>', 'Search for goals.');

    program
    .option('-d, --defer <id>', 'Move the goal with id <id> **from today\'s queue** to the top of tomorrow\'s queue.', parseInt);

    program
    .option('-e, --expedite <id>', 'Move the goal with id <id> **from tomorrow\'s queue** to the top of today\'s queue.', parseInt);

    program
    .option('-p, --prioritize <id>', 'Move the goal with id <id> to the top of the queue.', parseInt);

    program
    .option('-l, --list', 'List the goals in the queue.', parseInt);

    program
    .option('-t, --tomorrow', 'List tomorrow\'s goals.');

    program
    .option('-x, --do <id>', 'Completes the goal with the given id <id>.', parseInt);

    program
    .command('today')
    .description('If no option given, list the goals for today. Otherwise executes the option within the context of today.')
    .action(function() {
        var goal = program.add;
        var query = program.find;
        var later = program.defer;
        var sooner = program.expedite;
        var upper = program.prioritize;
        var complete = program['do'];

        if (goal) {
            info('add');

            JFDI.add(goal, 'today', handleCallbackResult);

        } else if (query) {
            info('find');

            JFDI.find('today', query, handleCallbackResult);
        } else if (later !== undefined) {
            info('later');

            JFDI.defer(later, handleCallbackResult);
        } else if (sooner !== undefined) {
            println('\n*** You cannot expedite a current goal. Did you mean to --prioritize it, instead?. Type `jfdi -h` for more info. ***\n');

            JFDI.list('today', handleCallbackResult);
        } else if (upper !== undefined) {
            info('upper');

            println(kNotImplemented + ' (prioritize)\n');

            JFDI.list('today', handleCallbackResult);
        } else if (complete !== undefined) {
            info('complete');

            JFDI.complete(complete, handleCallbackResult);
        } else {
            info('default');

            JFDI.list('today', handleCallbackResult);
        }
    });

    program
    .command('tomorrow')
    .description('If no option given, list the goals for tomorrow. Otherwise executes the option within the context of tomorrow.')
    .action(function() {
        var goal = program.add;
        var query = program.find;
        var later = program.defer;
        var sooner = program.expedite;
        var upper = program.prioritize;
        var complete = program['do'];

        if (goal) {
            // TODO: localization:
            println('\n*** You cannot add a goal to tomorrow\'s queue. Add it to today\'s queue, then defer it. Type `jfdi -h` for more info. ***\n');
        } else if (query) {

            JFDI.find('tomorrow', query, handleCallbackResult);
        } else if (later !== undefined) {
            println('\n*** You cannot defer a future goal. Did you mean to --expedite it, instead? Type `jfdi -h` for more info. ***\n');
        } else if (complete !== undefined) {
            println('\n*** You cannot complete a future goal. Add it to today\'s queue, then defer it. Type `jfdi -h` for more info. ***\n');
        } else if (sooner !== undefined) {
            JFDI.expedite(sooner, handleCallbackResult);
        } else if (upper !== undefined) {
           println(kNotImplemented + ' (expedite/tw)\n');
        } else {
           JFDI.list('tomorrow', handleCallbackResult);
        }
    });

    program
    .command('all')
    .description('Lists today\'s and tomorrow\'s goals.')
    .action(function() {
        JFDI.list('today', handleCallbackResult);
        JFDI.list('tomorrow', handleCallbackResult);
    });

    program.parse(process.argv);
}

init();
