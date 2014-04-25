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

var program = require('commander'),
    fs = require('fs');

var debug = require('../debug'),
    parse = require('../parsing').parseArguments,
    command = require('../command'),
    privates = require('./privates');

/**
 * Initializes the runtime by looking at `process.argv`.
 */
exports.initialize = function() {
    debug.info('runtime.initialize');

    // Raw arguments before parsing.
    debug.info(process.argv);

    // Note that `process.argv` is passed by ref.
    parse(process.argv);

    // Arguments after parsing.
    debug.info(process.argv);

    var packageJson = JSON.stringify({version: 'unknown'});

    if (fs.existsSync('package.json')) {
        packageJson = fs.readFileSync('package.json', 'utf8');

        // Unit tests.
        if (packageJson !== 'package.json') {
            program.version(JSON.parse(packageJson).version);
        }
    }

    privates.initializeProgramWithCommand(program, command);
};

/**
 * Executes the command associated with `process.argv`.
 */
exports.execute = function() {
    debug.info('runtime.execute');

    program.parse(process.argv);
};
