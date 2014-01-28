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

var println = require('./debug').log,
    display = require('./display');

/**
 *
 */
function pad(index) {
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
    }
}

/**
 *
 */
function printGoals(goals) {
    goals.forEach(function(goal) {
        println(pad(goal.index) + ' ' + goal.item);
    });
}

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
    printGoals(goals);
    display.printNewLine();
};
