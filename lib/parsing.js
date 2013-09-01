'use strict';

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

// TODO: write unit tests for this.

// If you define a new command or option, make sure you update this, too.
// If a command is NOT a special command, then it means that it will be
// implicitly called with `--add`.
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
//
var specialCommands = [
    // TODO: be DRY, make them constants!
    'today',
    'tomorrow',
    'all',
    '-t', '--tomorrow',
    '-h', '--help'
];

// TODO: write tests for all of these commmands by mocking argv.
var knownCommands = specialCommands.concat([
    '-V', '--version',
    '-a', '--add',
    '-f', '--find',
    '-d', '--defer',
    '-p', '--prioritize',
    '-l', '--list',
    '-t', '--tomorrow',
    '-x', '--do'
]);

function isSpecialCommand(initialCommand) {
    return specialCommands.indexOf(initialCommand) > -1;
}

function isKnownCommand(command) {
    return knownCommands.indexOf(command) > -1;
}

exports.parseArguments = function(args) {
    var kNoArgs = 2,
        kSingleCommand = 3,
        argLen = args.length,
        initialCommand = args[2];

    if (args.length === kSingleCommand && !isSpecialCommand(initialCommand)) {
        if (!isNaN(parseInt(initialCommand, 10))) {
            args[3] = initialCommand;
            args[2] = '--do';
            args[4] = 'today';
        } else {
            args[3] = args[2];
            args[2] = '--add';
            args[4] = 'today';
        }
    } else if (argLen === kNoArgs) {
        args.push('--list');
        args.push('today');
    } else if(initialCommand === '-e' || initialCommand === '--expedite') {
        if(args[4] === undefined) {
            args[4] = 'tomorrow';
        }
    } else if(initialCommand === '-t' || initialCommand === '--tomorrow') {
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

    initialCommand = args[2];

    // node . -flag "foo" today :. Max allowed arglen is 5.

    if (!isKnownCommand(initialCommand)) {
        //TODO: magic number 5!
        if (args.length > 5) {
            args.splice(2, 0, '--add');
            args[3] = args.splice(3, args.length - 4).join(' ');
            args[4] = 'today';
        }
    } else if (initialCommand === '-a' || initialCommand === '--add') {
        if (args.length > 5) {
            args[3] = args.splice(3, args.length - 4).join(' ');
            args[4] = 'today';
        }
    } else if (initialCommand === '-f' || initialCommand === '--find') {
        if (args.length > 5) {
            args[3] = args.splice(3, args.length - 4).join(' ');
            args[4] = 'today';
        }
    }
};
