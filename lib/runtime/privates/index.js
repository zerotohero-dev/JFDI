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

/**
 * CLI behavior is initialized here.
 *
 * @param program
 * @param command
 */
exports.initializeProgramWithCommand = function(program, command) {
    if (program.isInitialized) {return;}

    // The code below is both a brief summary of what the program does,
    // and also actually declares the program behavior.

    program
        .option(
            '-a, --add <goal>',
            'Add a goal to the top of the queue.'
        );

    program.
        option(
            '-f, --find <keyword>',
            'Search for goals.'
        );

    program
        .option(
            '-d, --defer <id>',
            'Move the goal with id <id> **from today\'s queue** ' +
                'to the top of tomorrow\'s queue.',
            parseInt
        );

    program
        .option(
            '-e, --expedite <id>',
            'Move the goal with id <id> **from tomorrow\'s queue** ' +
                'to the top of today\'s queue.',
            parseInt
        );

    program
        .option(
            '-p, --prioritize <id>',
            'Move the goal with id <id> to the top of the queue.',
            parseInt
        );

    program
        .option(
            '-l, --list',
            'List the goals in the queue.',
            parseInt
        );

    program
        .option(
            '-t, --tomorrow',
            'List tomorrow\'s goals.'
        );

    program
        .option(
            '-x, --do <id>',
            'Completes the goal with the given id <id>.',
            parseInt
        );

    program
        .option(
            '-m --append <id>',
            'Appends a piece of text to the given goal with id <id>.',
            parseInt
        );

    program
        .option(
            '-M --prepend <id>',
            'Appends a piece of text to the given with id <id>.',
            parseInt
        );

    program
        .option(
            '-r --replace <id>',
            'Appends a piece of text to the given goal with id <id>.',
            parseInt
        );

    program
        .option(
            '-D, --text <text>',
            'The text to use for appending, prepending, or replacement.'
        );

    program
        .option(
            '-w, --with <text>',
            'The text to replace with.'
        );

    program
        .command('today')
        .description('If no option given, list the goals for today.' +
            ' Otherwise executes the option within the context of today.')
        .action(function() {
            command.handleToday.call(program);
        });

    program
        .command('tomorrow')
        .description('If no option given, list the goals for tomorrow.' +
            ' Otherwise executes the option within the context of tomorrow.')
        .action(function() {
            command.handleTomorrow.call(program);
        });

    program
        .command('all')
        .description('Lists today\'s and tomorrow\'s goals.')
        .action(function() {
            command.handleAll.call(program);
        });

    program.isInitialized = true;
};
