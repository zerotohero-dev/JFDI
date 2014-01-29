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

var println = require('../../debug').log;

/**
 *
 */
exports.pad = function(index) {
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
        default:
            return str;
    }
};

/**
 *
 */
exports.printGoals = function(goals) {
    goals.forEach(function(goal) {
        println(exports.pad(goal.index) + ' ' + goal.item);
    });
};
