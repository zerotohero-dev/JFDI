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

var JFDI = require('./../JFDI'),
    debug = require('./../debug'),
    info = debug.info;

var privates = require('./privates'),

    realm = require('../config/realm'),
    kToday = realm.TODAY,
    kTomorrow = realm.TOMORROW,
    kAll = realm.ALL;

exports.privates = privates;

exports.handleToday = function() {
    info('command.handleToday');

    privates.handleCommand(this, kToday);
};

exports.handleTomorrow = function() {
    info('command.handleTomorrow');

    privates.handleCommand(this, kTomorrow);
};

exports.handleAll = function() {
    info('command.handleAll');

    privates.handleCommand(this, kAll);
};
