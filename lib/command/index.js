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

var privates = require('./privates');

exports.privates = privates;

function handleCommand(program, realm) {
    info('handleCommand');

    var goal = program.add,
        query = program.find,
        later = program.defer,
        sooner = program.expedite,
        upper = program.prioritize,
        append = program.append,
        prepend = program.prepend,
        replace = program.replace,
        text = program.text,
        replaceWith = program['with'],
        complete = program['do'];

    if (realm === 'all') {
        info('realm:all');

        privates.handleDefault('today');
        privates.handleDefault('tomorrow');

        return;
    }

    if (goal !== undefined) {
        info('goal: "' + goal + '"');

        if (realm === 'tomorrow') {
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

        // TODO: magic word.
        if (realm === 'tomorrow') {
            privates.handleDeferIncorrectRealm();

            return;
        }

        privates.handleDefer(later);

        return;
    }

    if (sooner !== undefined) {
        info('sooner: "' + sooner + '"');

        // TODO: magic word.
        if (realm === 'tomorrow') {
            privates.handleExpedite(sooner);

            return;
        }

        privates.handleExpediteIncorrectRealm();

        return;
    }

    if (upper !== undefined) {
        info('upper: "' + upper + '"');

        // TODO: magic word.
        if (realm === 'tomorrow') {
            privates.handlePrioritizeIncorrectRealm();

            return;
        }

        privates.handlePrioritize(upper);

        return;
    }

    if (complete !== undefined) {
        info('complete: "' + complete + '"');

        // TODO: magic word.
        if (realm === 'tomorrow') {
            privates.handleCompleteIncorrectRealm();

            return;
        }

        privates.handleComplete(complete);

        return;
    }

    if (append !== undefined) {
        info('append: "' + append + '"');

        if (realm === 'tomorrow') {
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

        if (realm === 'tomorrow') {
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

        if (realm === 'tomorrow') {
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

    handleCommand(this, 'today');
};

exports.handleTomorrow = function() {
    info('command.handleTomorrow');

    handleCommand(this, 'tomorrow');
};

exports.handleAll = function() {
    info('command.handleAll');

    handleCommand(this, 'all');
};
