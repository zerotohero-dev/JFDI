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

var cProgram = require('../../config/program');

/**
 * CLI behavior is initialized here.
 */
exports.initializeProgramWithCommand = function(program, command) {
    if (program.isInitialized) {return;}

    var options = cProgram.options;

    options.forEach(function(option) {
        program.option.apply(program, option);
    });

    var commands = cProgram.commands;

    commands.forEach(function(cmd) {
        program
            .command(cmd[0])
            .description(cmd[1])
            .action(function() {
                command[cmd[2]].call(program, program);
            });
    });

    program.isInitialized = true;
};
