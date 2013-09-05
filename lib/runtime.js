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

var program = require('commander');

var debug = require('./debug');
var parse = require('./parsing').parseArguments;
var command = require('./command');

/**
 * Initializes the runtime by looking at `process.argv`.
 */
exports.initialize = function() {
    debug.info('runtime.initialize');

    // Raw arguments before parsing.
    // TODO: replace with debug.info when tests are done.
    debug.info(process.argv);

    // Note that process.argv is passed by ref.
    parse(process.argv);

    // Arguments after parsing.
    // TODO: replace with debug.info when tests are done.
    debug.info(process.argv);

    // TODO: auto replace it from package JSON
    program.version('0.0.1');

    // Do not bind events more than once.
    if (program.isInitialized) {return;}

    // Below is a brief summary of what the program does.

    program
    .option(
        '-a, --add <goal>',
        'Add a goal to the top of the queue.'
    );

    program
    .option(
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

/**
 * Executes the command associated with `process.argv`.
 */
exports.execute = function() {
    debug.info('runtime.execute');

    program.parse(process.argv);
};
