'use strict';

/*           ___         ___           ___
 *          /\  \       /\  \         /\  \          ___
 *          \:\  \     /::\  \       /::\  \        /\  \
 *      ___ /::\__\   /:/\:\  \     /:/\:\  \       \:\  \
 *     /\  /:/\/__/  /::\~\:\  \   /:/  \:\__\      /::\__\
 *     \:\/:/  /    /:/\:\ \:\__\ /:/__/ \:|__|  __/:/\/__/
 *      \::/  /     \/__\:\ \/__/ \:\  \ /:/  / /\/:/  /
 *       \/__/           \:\__\    \:\  /:/  /  \::/__/
 *                        \/__/     \:\/:/  /    \:\__\
 *                                   \::/__/      \/__/
 *
 *              https:/github.com/v0lkan/JFDI
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var info = require('../debug').info,
    privates = require('./privates');

/**
 * Parses the command line arguments and updatess it if necessary.
 *
 * @param  {Array} args - The arguments array (`process.argv` generally).
 */
exports.parseArguments = function(args) {
    info('parsing.parseArguments');

    var kNoArgs = 2,
        kSingleCommand = 3,
        argLen = args.length,
        initialCommand = args[2],
        realm;

    if (
        initialCommand === '-h' || initialCommand === '--help' ||
        initialCommand === '-V' || initialCommand === '--version'
    ) {
        args.length = kSingleCommand;

        return;
    }

    if (argLen === kNoArgs) {
        info('No arguments detected, will list today\'s goals.');

        args.push('--list');
        args.push('today');
    } else if (argLen === kSingleCommand &&
                !privates.isSpecialCommand(initialCommand)) {
        info('Single command argument, which is not a special command.');

        if (!isNaN(parseInt(initialCommand, 10))) {
            info('Argument is numeric, will treat as a parameter to "--do".');

            args[3] = initialCommand;
            args[2] = '--do';
            args[4] = 'today';
        } else {
            info('Argument is non-numeric, ' +
                'will treat as a parameter to "--add".');

            args[3] = args[2];
            args[2] = '--add';
            args[4] = 'today';
        }
    } else if(
        (initialCommand === '-e' || initialCommand === '--expedite') &&
        args[4] === undefined
    ) {
        info('Expedite command detected w/o realm, will assume "tomorrow".');

        args[4] = 'tomorrow';
    } else if(
        (initialCommand === '-p' || initialCommand === '--prioritize') &&
        args[4] === undefined
    ) {
        info('Prioritize command detected w/o realm, will assume "today".');

        args[4] = 'today';
    } else if(initialCommand === '-t' || initialCommand === '--tomorrow') {
        info('Initial command wants tomorrow, will give tomorrow.');

        args[2] = '--list';
        args[3] = 'tomorrow';
        args.length = 4;
    }

    if(
        args.indexOf('today') === -1 &&
        args.indexOf('tomorrow') === -1 &&
        args.indexOf('all') === -1
    ) {
        info('Arguments do not contain a realm, will default to "today".');

        args.push('today');
    }

    // Update `initialCommand` since the array structure has changed.
    initialCommand = args[2];

    if(!isNaN(parseInt(initialCommand, 10))) {
        info('Initial command is numeric, ' +
            'will treat it as a parameter to "--do"');

        args.splice(2, 0, '--do');
    }

    // Update `initialCommand` since the array structure has changed.
    initialCommand = args[2];

    if (!privates.isKnownCommand(initialCommand)) {
        info('initial command is unknown, will try "--add".');

        realm = args[args.length - 1];

        args.splice(2, 0, '--add');

        args[3] = args.splice(3, args.length - 4).join(' ');
        args[4] = realm;
    } else if (initialCommand === '-a' || initialCommand === '--add') {
        info('initial command is "add". Will concatanete middle arguments.');

        realm = args[args.length - 1];

        args[3] = args.splice(3, args.length - 4).join(' ');
        args[4] = realm;

    } else if (initialCommand === '-f' || initialCommand === '--find') {
        info('initial command is "find". Will concatanete middle arguments.');

        realm = args[args.length - 1];

        args[3] = args.splice(3, args.length - 4).join(' ');
        args[4] = realm;
    } else {
        info('FALLBACK: initial command is "' + initialCommand + '"');
    }
};
