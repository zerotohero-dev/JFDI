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
        query = goals.query,
        goalCollection = goals.goals;

    (privates.realmHeaderThunk[realm] ||
        privates.getUnknownRealmHeaderThunk()
    )(realm, query);

    if (goalCollection.length === 0) {
        (privates.realmNoResultThunk[realm] ||
            privates.getUnknownRealmNoResultThunk()
        )(realm, query);

        return;
    }

    display.printNewLine();
    privates.printGoals(goalCollection);
    display.printNewLine();
};
