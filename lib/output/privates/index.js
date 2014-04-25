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

var println = require('../../debug').log,

    display = require('../../display'),

    realm = require('../../config/realm'),
    kToday = realm.TODAY,
    kTomorrow = realm.TOMORROW;

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

exports.printGoals = function(goals) {
    goals.forEach(function(goal) {
        println(exports.pad(goal.index) + ' ' + goal.item);
    });
};

exports.realmHeaderThunk = {};

exports.realmHeaderThunk[kToday] = function(realm, query) {
    if (!query) {
        display.printTodayHeader();

        return;
    }

    display.printQueryForToday(query);
};

exports.realmHeaderThunk[kTomorrow] = function(realm, query) {
    if (!query) {
        display.printTomorrowHeader();

        return;
    }

    display.printQueryForTomorrow(query);
};

exports.getUnknownRealmHeaderThunk = function() {
    return function(realm) {
        display.printUnknownRealmError(realm);
    }
};

exports.realmNoResultThunk = {};

exports.realmNoResultThunk[kToday] = function(realm, query) {
    if (query) {
        display.printNoMatchingResultsForToday(query);

        return;
    }

    display.printTabulaRasa();
};

exports.realmNoResultThunk[kTomorrow] = function(realm, query) {
    if (query) {
        display.printNoMatchingResultsForTomorrow(query);

        return;
    }

    display.printTabulaRasaForFuture();
};

exports.getUnknownRealmNoResultThunk = function() {
    return function(realm) {
        display.printUnknownRealmError(realm);
    };
};
