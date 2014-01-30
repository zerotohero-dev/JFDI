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
    kAll = realm.ALL,

    program = require('../config/program'),
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

exports.privates = privates;

function handleCommand(program, realm) {
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
        complete = program[kDo];

    if (realm === kAll) {
        info('realm:all');

        privates.handleDefault(kToday);
        privates.handleDefault(kTomorrow);

        return;
    }

    if (goal !== undefined) {
        info('goal: "' + goal + '"');

        if (realm === kTomorrow) {
            privates.handleAdditionIncorrectRealm();

            return;
        }

        privates.handleAddition(goal);

        return;
    }

    if (query !== undefined) {
        info('query: "' + query + '"');

        privates.handleQuery(realm, query);

        return;
    }

    if (later !== undefined) {
        info('defer: "' + later + '"');

        if (realm === kTomorrow) {
            privates.handleDeferIncorrectRealm();

            return;
        }

        privates.handleDefer(later);

        return;
    }

    if (sooner !== undefined) {
        info('sooner: "' + sooner + '"');

        if (realm === kTomorrow) {
            privates.handleExpedite(sooner);

            return;
        }

        privates.handleExpediteIncorrectRealm();

        return;
    }

    if (upper !== undefined) {
        info('upper: "' + upper + '"');

        if (realm === kTomorrow) {
            privates.handlePrioritizeIncorrectRealm();

            return;
        }

        privates.handlePrioritize(upper);

        return;
    }

    if (complete !== undefined) {
        info('complete: "' + complete + '"');

        if (realm === kTomorrow) {
            privates.handleCompleteIncorrectRealm();

            return;
        }

        privates.handleComplete(complete);

        return;
    }

    if (append !== undefined) {
        info('append: "' + append + '"');

        if (realm === kTomorrow) {
            privates.handleAppendIncorrectRealm();

            return;
        }

        if (!text) {
            privates.handleAppendTextRequired();

            return;
        }

        privates.handleAppend(append, text);

        return;
    }

    if (prepend !== undefined) {
        info('prepend: "' + prepend + '"');

        if (realm === kTomorrow) {
            privates.handlePrependIncorrectRealm();

            return;
        }

        if (!text) {
            privates.handlePrependTextRequired();

            return;
        }

        privates.handlePrepend(prepend, text);

        return;
    }

    if (replace !== undefined) {
        info('replace: "' + replace + '"');

        if (realm === kTomorrow) {
            privates.handleReplaceIncorrectRealm();

            return;
        }

        if (!text) {
            privates.handleReplaceTextRequired();

            return;
        }

        if (!replaceWith) {
            privates.handleReplaceAlternateRequired();

            return;
        }

        privates.handleReplace(replace, text, replaceWith);

        return;
    }

    info('default fallback');

    privates.handleDefault(realm);
}

exports.handleToday = function() {
    info('command.handleToday');

    handleCommand(this, kToday);
};

exports.handleTomorrow = function() {
    info('command.handleTomorrow');

    handleCommand(this, kTomorrow);
};

exports.handleAll = function() {
    info('command.handleAll');

    handleCommand(this, kAll);
};
