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

var realm = require('./realm'),
    kToday = realm.TODAY,
    kTomorrow = realm.TOMORROW,
    kAll = realm.ALL,

    cache = {};

// The code below is both a brief summary of what the program does,
// and also actually declares the program behavior.
// Modify it at your own risk.

/**
 *
 * @type {string}
 */
exports.ADD = 'add';

/**
 *
 * @type {string}
 */
exports.FIND = 'find';

/**
 *
 * @type {string}
 */
exports.DEFER = 'defer';

/**
 *
 * @type {string}
 */
exports.EXPEDITE = 'expedite';

/**
 *
 * @type {string}
 */
exports.PRIORITIZE = 'prioritize';

/**
 *
 * @type {string}
 */
exports.APPEND = 'append';

/**
 *
 * @type {string}
 */
exports.PREPEND = 'prepend';

/**
 *
 * @type {string}
 */
exports.REPLACE = 'replace';

/**
 *
 * @type {string}
 */
exports.TEXT = 'text';

/**
 *
 * @type {string}
 */
exports.WITH = 'with';

/**
 *
 * @type {string}
 */
exports.DO = 'do';

/**
 *
 * @type {*[]}
 */
exports.options = [[
    '-a, --add <goal>',
    'Add a goal to the top of the queue.'
], [
    '-f, --find <keyword>',
    'Search for goals.'
], [
    '-d, --defer <id>',
    'Move the goal with id <id> **from today\'s queue** ' +
        'to the top of tomorrow\'s queue.',
    parseInt
], [
    '-e, --expedite <id>',
    'Move the goal with id <id> **from tomorrow\'s queue** ' +
        'to the top of today\'s queue.',
    parseInt
], [
    '-p, --prioritize <id>',
    'Move the goal with id <id> to the top of the queue.',
    parseInt
], [
    '-l, --list',
    'List the goals in the queue.',
    parseInt
], [
    '-t, --tomorrow',
    'List tomorrow\'s goals.'
], [
    '-x, --do <id>',
    'Completes the goal with the given id <id>.',
    parseInt
], [
    '-m --append <id>',
    'Appends a piece of text to the given goal with id <id>.',
    parseInt
], [
    '-M --prepend <id>',
    'Appends a piece of text to the given with id <id>.',
    parseInt
], [
    '-r --replace <id>',
    'Appends a piece of text to the given goal with id <id>.',
    parseInt
], [
    '-D, --text <text>',
    'The text to use for appending, prepending, or replacement.'
], [
    '-w, --with <text>',
    'The text to replace with.'
]];

/**
 *
 */
exports.commands = [[
    kToday,
    'If no option given, list the goals for today.' +
        ' Otherwise executes the option within the context of today.',
    'handleToday'
    //command.handleToday
], [
    kTomorrow,
    'If no option given, list the goals for tomorrow.' +
        ' Otherwise executes the option within the context of tomorrow.',
    'handleTomorrow'
    //command.handleTomorrow
], [
    kAll,
    'Lists today\'s and tomorrow\'s goals.',
    'handleAll'
    //command.handleAll
]];

exports.options.forEach(function(option) {
    var items = option[0].split(/, | .+>/);

    items.forEach(function(item) {
        if (item) {
            if (cache[item]) {
                throw 'JFDI configuration error! You cannot have ' +
                    'two identical command options. ' +
                    'Please check your configuration';
            }

            cache[item] = true;
        }
    });
});

exports.commands.forEach(function(command) {
    if (cache[command[0]]) {
        throw 'JFDI configuration error! You cannot have ' +
            'two identical commands.';
    }

    cache[command[0]] = true;
});

cache = {};
