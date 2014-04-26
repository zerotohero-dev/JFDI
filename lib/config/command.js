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
 * Commands that do not take an argument.
 *
 * @type {Array}
 */
exports.specialCommands = [
    'today',
    'tomorrow',
    'all',
    '-t', '--tomorrow',
    '-l', '--list',
    '-h', '--help'
];

/**
 *
 * @type {Array}
 */
exports.knownCommands = exports.specialCommands.concat([
    '-V', '--version',
    '-a', '--add',
    '-e', '--expedite',
    '-f', '--find',
    '-d', '--defer',
    '-p', '--prioritize',
    '-x', '--do',
    '-m', '--append',
    '-m', '--mask',
    '-D', '--text',
    '-r', '--replace',
    '-w', '--with',
    '-M', '--prepend',
    '-l', '--limit'
]);
