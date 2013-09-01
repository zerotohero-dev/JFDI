#! /usr/bin/env node

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

var JFDI = require('./lib/JFDI');

var info = function() {};
var command = require('./lib/command');
var parse = require('./lib/parsing').parseArguments;

if (!JFDI.sanitize()) {return;}

function init() {
    info(process.argv);

    parse(process.argv);

    info(process.argv);

    // TODO: auto replace it from package JSON
    program.version('0.0.1');

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
    .action(command.handleToday.bind(program));

    program
    .command('tomorrow')
    .description('If no option given, list the goals for tomorrow.' +
        ' Otherwise executes the option within the context of tomorrow.')
    .action(command.handleTomorrow.bind(program));

    program
    .command('all')
    .description('Lists today\'s and tomorrow\'s goals.')
    .action(command.handleAll.bind(program));

    program.parse(process.argv);
}

init();
