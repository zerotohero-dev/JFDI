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

var display = require('../display'),
    privates = require('./privates')

/**
 * Handles the current command.
 *
 * @param  {Object} error - Error object if there's a problem.
 * @param  {Array} goals - An object in the form {realm:realm,  query:query}
 */
exports.handle = function(error, goals) {
    /*jshint maxlen:160*/

    display.printNewLine();

    if (error) {
        display.printGoalAddError();

        return;
    }

    var realm = goals.realm,
        query = goals.query;

    switch (realm) {
    case 'today':
        if (query) {
            display.printQueryForToday(query);

            break;
        }

        display.printTodayHeader();

        break;

    case 'tomorrow':
        if (query) {
            display.printQueryForTomorrow(query);

            break;
        }

        display.printTomorrowHeader();

        break;

    default:
        display.printUnknownRealmError(realm);

        return;
    }

    goals = goals.goals;

    if (goals.length === 0) {
        switch (realm) {
            case 'today':
                if (query) {
                    display.printNoMatchingResultsForToday(query);

                    break;
                }

                display.printTabulaRasa();

                break;
            case 'tomorrow':
                if (query) {
                    display.printNoMatchingResultsForTomorrow(query);

                    break;
                }

                display.printTabulaRasaForFuture();

                break;
            default:
                display.printUnknownRealmError(realm);

                break;
        }

        return;
    }

    display.printNewLine();
    privates.printGoals(goals);
    display.printNewLine();
};
