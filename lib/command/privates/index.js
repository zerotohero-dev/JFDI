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

/* #region Pass Cases */

var handleCallbackResult = require('../../output').handle,
    JFDI = require('../../JFDI'),
    info = require('../../debug').info,
    display = require('../../display');

var program = require('../../config/program'),
    kAdd =  program.ADD,
    kFind = program.FIND,
    kDefer  = program.DEFER,
    kExpedite = program.EXPEDITE,
    kPrioritize = program.PRIORITIZE,
    kAppend = program.APPEND,
    kPrepend = program.PREPEND,
    kReplace = program.REPLACE,
    kText = program.TEXT,
    kWith = program.WITH,
    kDo = program.DO;

var realm = require('../../config/realm'),
    kToday = realm.TODAY,
    kTomorrow = realm.TOMORROW,
    kAll = realm.ALL;

/**
 *
 * @param goal
 */
exports.handleAddition = function(goal) {
    info('privates.handleAddition()');

    JFDI.add(goal, handleCallbackResult);
};

/**
 *
 * @param realm
 * @param query
 */
exports.handleQuery = function(realm, query) {
    info('privates.handleQuery()');

    JFDI.find(realm, query, handleCallbackResult);
};

/**
 *
 * @param later
 */
exports.handleDefer = function(later) {
    info('privates.handleDefer()');

    var text = JFDI.getTodayGoals()[later].item;

    JFDI.defer(later, handleCallbackResult);

    return text;
};

/**
 *
 * @param upper
 */
exports.handlePrioritize = function(upper) {
    info('privates.handlePrioritize("' + upper + '")');

    var text = JFDI.getTodayGoals()[upper].item;

    JFDI.prioritize(upper, handleCallbackResult);

    return text;
};

/**
 *
 * @param complete
 */
exports.handleComplete = function(complete) {
    info('privates.handleComplete()');

    var text = JFDI.getTodayGoals()[complete].item;

    JFDI.complete(complete, handleCallbackResult);

    return text;
};

/**
 *
 * @param sooner
 */
exports.handleExpedite = function(sooner) {
    info('privates.handleExpedite()');

    var text = JFDI.getTomorrowGoals()[sooner].item;

    JFDI.expedite(sooner, handleCallbackResult);

    return text;
};

/**
 *
 * @param append
 * @param text
 */
exports.handleAppend = function(append, text) {
    info('privates.handleAppend("' + append + '","' + text + '")');

    JFDI.append(append, text, handleCallbackResult);
};

/**
 *
 * @param prepend
 * @param text
 */
exports.handlePrepend = function(prepend, text) {
    info('privates.handlePrepend()');

    JFDI.prepend(prepend, text, handleCallbackResult);
};

/**
 *
 * @param replace
 * @param text
 * @param replaceWith
 */
exports.handleReplace = function(replace, text, replaceWith) {
    info('privates.handleReplace()');

    JFDI.replace(replace, text, replaceWith, handleCallbackResult);
};

/**
 *
 * @param realm
 */
exports.handleDefault = function(realm) {
    info('privates.handleDefault()');

    JFDI.list(realm, handleCallbackResult);
};

/* #region Fail Cases */

/**
 *
 */
exports.handleExpediteIncorrectRealm = function() {
    info('privates.handleExpediteIncorrectRealm()');

    display.printExpediteIncorrectRealm();

    JFDI.list('today', handleCallbackResult);
};

/**
 *
 */
exports.handleAdditionIncorrectRealm = function() {
    info('privates.handleAdditionIncorrectRealm()');

    display.printAdditionIncorrectRealm();

    JFDI.list('today', handleCallbackResult);
};

/**
 *
 */
exports.handleDeferIncorrectRealm = function() {
    info('privates.handleDeferIncorrectRealm()');

    display.printDeferIncorrectRealm();

    JFDI.list('tomorrow', handleCallbackResult);
};

/**
 *
 */
exports.handleCompleteIncorrectRealm = function() {
    info('privates.handleCompleteIncorrectRealm()');

    display.printCompleteIncorrectRealm();

    JFDI.list('tomorrow', handleCallbackResult);
};

/**
 *
 */
exports.handleCompleteInvalidArgument = function() {
    //TODO: implement me.
};

/**
 *
 */
exports.handlePrioritizeIncorrectRealm = function() {
    info('privates.handlePrioritizeIncorrectRealm()');

    display.printPrioritizeIncorrectRealm();

    JFDI.list('tomorrow', handleCallbackResult);
};

/**
 *
 */
exports.handleAppendIncorrectRealm = function() {
    info('privates.handleAppendIncorrectRealm()');

    display.printAppendIncorrectRealm();

    JFDI.list('tomorrow', handleCallbackResult);
};

/**
 *
 */
exports.handleAppendInvalidArgument = function() {
    // TODO: implement me.
};

/**
 *
 */
exports.handleAppendTextRequired = function() {
    info('privates.handleAppendTextRequired()');

    display.printAppendTextRequired();

    JFDI.list('today', handleCallbackResult);
};

/**
 *
 */
exports.handlePrependIncorrectRealm = function() {
    info('privates.handlePrependIncorrectRealm()');

    display.printPrependIncorrectRealm();

    JFDI.list('tomorrow', handleCallbackResult);
};

/**
 *
 */
exports.handlePrependInvalidArgument = function() {
    // TODO: implement me.
};

/**
 *
 */
exports.handlePrependTextRequired = function() {
    info('privates.handlePrependTextRequired()');

    display.printPrependTextRequired();

    JFDI.list('today', handleCallbackResult);
};

/**
 *
 */
exports.handleReplaceIncorrectRealm = function() {
    info('privates.handleReplaceIncorrectRealm()');

    display.printReplaceIncorrectRealm();

    JFDI.list('tomorrow', handleCallbackResult);
};

/**
 *
 */
exports.handleReplaceInvalidArgument = function() {
    // TODO: implement me.
};

/**
 *
 */
exports.handleReplaceTextRequired = function() {
    info('privates.handleReplaceTextRequired()');

    display.printReplaceTextRequired();

    JFDI.list('today', handleCallbackResult);
};

/**
 *
 */
exports.handleReplaceAlternateRequired = function() {
    info('privates.handleReplaceAlternateRequired()');

    display.printAlternateRequired();

    JFDI.list('today', handleCallbackResult);
};

/**
 *
 * @param goal
 */
exports.acknowledgeAddition = function(goal) {
    display.printGoalAdded(goal);
};

/**
 *
 * @param later
 * @param text
 */
exports.acknowledgeDefer = function(later, text) {
    display.printGoalDeferred(later, text);
};

/**
 *
 * @param sooner
 * @param text
 */
exports.acknowledgeExpedite = function(sooner, text) {
    display.printGoalExpedited(sooner, text);
};

/**
 *
 * @param upper
 * @param text
 */
exports.acknowledgePrioritize = function(upper, text) {
    display.printGoalPrioritized(upper, text);
};

/**
 *
 * @param complete
 * @param text
 */
exports.acknowledgeComplete = function(complete, text) {
    display.printGoalCompleted(complete, text);
};

/**
 *
 * @param append
 * @param text
 */
exports.acknowledgeAppend = function(append, text) {
    display.printGoalAppended(append, text);
};

/**
 *
 * @param prepend
 * @param text
 */
exports.acknowledgePrepend = function(prepend, text) {
    display.printGoalPrepended(prepend, text);
};

/**
 *
 * @param replace
 * @param text
 * @param replaceWith
 */
exports.acknowledgeReplace = function(replace, text, replaceWith) {
    display.printGoalReplaced(replace, text, replaceWith);
};

/**
 *
 * @param program
 * @param realm
 */
exports.handleCommand = function(program, realm) {
    info('handleCommand');

    var goal = program[kAdd],
        query = program[kFind],
        later = program[kDefer],
        sooner = program[kExpedite],
        upper = program[kPrioritize],
        append = program[kAppend],
        prepend = program[kPrepend],
        replace = program[kReplace],
        text = program[kText],
        replaceWith = program[kWith],
        complete = program[kDo],
        item;

    if (realm === kAll) {
        info('realm:all');

        exports.handleDefault(kToday);
        exports.handleDefault(kTomorrow);

        return;
    }

    if (goal !== undefined) {
        info('goal: "' + goal + '"');

        if (realm === kToday) {
            exports.handleAddition(goal);
            exports.acknowledgeAddition(goal);

            return;
        }

        exports.handleAdditionIncorrectRealm();

        return;
    }

    if (query !== undefined) {
        info('query: "' + query + '"');

        exports.handleQuery(realm, query);

        return;
    }

    if (later !== undefined) {
        info('defer: "' + later + '"');

        if (realm === kToday) {
            item = exports.handleDefer(later);

            exports.acknowledgeDefer(later, item);

            return;
        }

        exports.handleDeferIncorrectRealm();

        return;
    }

    if (sooner !== undefined) {
        info('sooner: "' + sooner + '"');

        if (realm === kTomorrow) {
            item = exports.handleExpedite(sooner);

            exports.acknowledgeExpedite(sooner, item);

            return;
        }

        exports.handleExpediteIncorrectRealm();

        return;
    }

    if (upper !== undefined) {
        info('upper: "' + upper + '"');

        if (realm === kToday) {
            item = exports.handlePrioritize(upper);
            exports.acknowledgePrioritize(upper, item);

            return;
        }

        exports.handlePrioritizeIncorrectRealm();

        return;
    }

    if (complete !== undefined) {
        info('complete: "' + complete + '"');

        if ( isNaN(complete) ) {
            exports.handleCompleteInvalidArgument();

            return;
        }

        if (realm === kToday) {
            item = exports.handleComplete(complete);

            exports.acknowledgeComplete(complete, item);

            return;
        }

        exports.handleCompleteIncorrectRealm();

        return;
    }

    if (append !== undefined) {
        info('append: "' + append + '"');

        if ( isNaN(append) ) {
            exports.handleAppendInvalidArgument();

            return;
        }

        if (realm === kToday) {
            if (!text) {
                exports.handleAppendTextRequired();

                return;
            }

            exports.handleAppend(append, text);
            exports.acknowledgeAppend(append, text);

            return;
        }

        exports.handleAppendIncorrectRealm();

        return;
    }

    if (prepend !== undefined) {
        info('prepend: "' + prepend + '"');

        if ( isNaN(prepend) ) {
            exports.handlePrependInvalidArgument();

            return;
        }

        if (realm === kToday) {
            if (!text) {
                exports.handlePrependTextRequired();

                return;
            }

            exports.handlePrepend(prepend, text);
            exports.acknowledgePrepend(prepend, text);

            return;
        }

        exports.handlePrependIncorrectRealm();

        return;
    }

    if (replace !== undefined) {
        info('replace: "' + replace + '"');

        if ( isNaN(replace) ) {
            exports.handleReplaceInvalidArgument();

            return;
        }

        if (realm === kToday) {
            if (!text) {
                exports.handleReplaceTextRequired();

                return;
            }

            if (!replaceWith) {
                exports.handleReplaceAlternateRequired();

                return;
            }

            exports.handleReplace(replace, text, replaceWith);
            exports.acknowledgeReplace(replace, text, replaceWith);

            return;
        }

        exports.handleReplaceIncorrectRealm();

        return;
    }

    info('default fallback');

    exports.handleDefault(realm);
};
