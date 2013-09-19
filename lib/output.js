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

var println = require('./debug').log;

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

    println('');

    if (error) {
        println('JFDI failed to add the goal :(');

        return;
    }

    var realm = goals.realm,
        query = goals.query;

    switch (realm) {
    case 'today':
        if (query) {
            println('   ### "' + query + '" for Today ###');

            break;
        }

        println('   ### JFDI List For Today ###');

        break;

    case 'tomorrow':
        if (query) {
            println('   ### "' + query + '" for Today ###');

            break;
        }

        println('   ### Upcoming JFDI Stuff ###');

        break;

    default:
        println('Unknown realm "' + realm + '". exiting.');

        return;
    }

    goals = goals.goals;

    if (goals.length === 0) {
        switch (realm) {
        case 'today':
            if (query) {
                println('');
                println('       There are no matching goals for your query "' + query + '" for today :(');
                println('');

                break;
            }

            println('');
            println('       *Zero Inbox* for today! Hooray!');
            println('');
            println('       Sample Usage:');
            println('           Add a Goal       : jfdi [-a] "Save the world; one goal at a time."');
            println('           List Goals       : jfdi -l');
            println('           List All Commands: jfdi -h');
            println('');

            break;
        case 'tomorrow':
            if (query) {
                println('');
                println('       There are no matching goals for your query "' + query + '" for the near future :(');
                println('');

                break;
            }

            println('');
            println('       Your foreseeable future is pretty blank. Why not add some tasks?');
            println('');
            println('       Sample Usage:');
            println('           Add a Goal       : jfdi -a "Save the world; one goal at a time."');
            println('           List Goals       : jfdi -l');
            println('           List All Commands: jfdi -h');
            println('');

            break;
        default:
            println('Unknown realm "' + realm + '". exiting.');

            break;
        }

        return;
    }

    println('');
    printGoals(goals);
    println('');
};
