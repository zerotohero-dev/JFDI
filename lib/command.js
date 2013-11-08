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

var handleCallbackResult = require('./output').handle,
    JFDI = require('./JFDI'),
    debug = require('./debug'),
    println = debug.log,
    info = debug.info;

var privates = {
    /* #region Pass Cases */

    handleAddition: function(goal) {
        info('add');

        JFDI.add(goal, 'today', handleCallbackResult);
    },

    handleQuery: function(realm, query) {
        info('find');

        JFDI.find(realm, query, handleCallbackResult);
    },

    handleDefer: function(later) {
        info('later');

        JFDI.defer(later, handleCallbackResult);
    },

    handlePrioritize: function(upper) {
        info('upper: "' + upper + '".');

        JFDI.prioritize(upper, handleCallbackResult);
    },

    handleComplete: function(complete) {
        info('complete');

        JFDI.complete(complete, handleCallbackResult);
    },

    handleExpedite: function(sooner) {
        info('expedite');

        JFDI.expedite(sooner, handleCallbackResult);
    },

    handleAppend: function(append, text) {
        info('append');

        JFDI.append(append, text, handleCallbackResult);
    },

    handlePrepend: function(prepend, text) {
        info('prepend');

        JFDI.prepend(prepend, text, handleCallbackResult);
    },

    handleReplace: function(replace, text, replaceWith) {
        info('replace');

        JFDI.replace(replace, text, replaceWith, handleCallbackResult);
    },

    handleDefault: function(realm) {
        info('default');

        JFDI.list(realm, handleCallbackResult);
    },

    /* #region Fail Cases */

    handleExpediteIncorrectRealm: function() {
        println(
            '\n    *********** ERROR ***********\n\n' +
            '    You cannot expedite a current goal.\n\n' +
            '    Did you mean to `--prioritize` it, instead?\n\n' +
            '    Type `jfdi -h` for more info.\n' +
            '\n    *****************************\n'
        );

        JFDI.list('today', handleCallbackResult);
    },

    handleAdditionIncorrectRealm: function() {
        println(
            '\n    *********** ERROR ***********\n\n' +
            '    You cannot add a goal to tomorrow\'s queue.\n\n' +
            '    Add it to today\'s queue, then defer it.\n\n' +
            '    Type `jfdi -h` for more info. ***\n' +
            '\n    *****************************\n'
        );

        JFDI.list('today', handleCallbackResult);
    },

    handleDeferIncorrectRealm: function() {
        println(
            '\n    *********** ERROR ***********\n\n' +
            '    You cannot defer a future goal.\n\n' +
            '    Did you mean to `--expedite` it, instead?\n\n' +
            '    Type `jfdi -h` for more info. ***\n' +
            '\n    *****************************\n'
        );

        JFDI.list('tomorrow', handleCallbackResult);
    },

    handleCompleteIncorrectRealm: function() {
        println(
            '\n    *********** ERROR ***********\n\n' +
            '    You cannot complete a future goal.\n\n' +
            '    Move it to today\'s queue, then complete it.\n\n' +
            '    Type `jfdi -h` for more info. ***\n' +
            '\n    *****************************\n'
        );

        JFDI.list('tomorrow', handleCallbackResult);
    },

    handlePrioritizeIncorrectRealm: function() {
        println(
            '\n    *********** ERROR ***********\n\n' +
            '    You cannot prioritize a future goal.\n\n' +
            '    Did you mean to expedite (`jfdi -e`) instead?\n\n' +
            '    To prioritize a future goal, move it to today\'s queue,\n' +
            '    then prioritize it.\n\n' +
            '    Type `jfdi -h` for more info. ***\n' +
            '\n    *****************************\n'
        );

        JFDI.list('tomorrow', handleCallbackResult);
    },

    handleAppendIncorrectRealm: function() {
        println(
            '\n    *********** ERROR ***********\n\n' +
            '    You cannot append to a future goal.\n\n' +
            '    To append to a future goal, move it to today\'s queue,\n' +
            '    then append to it.\n\n' +
            '    Type `jfdi -h` for more info. ***\n' +
            '\n    *****************************\n'
        );

        JFDI.list('tomorrow', handleCallbackResult);
    },

    handleAppendTextRequired: function() {
        println(
            '\n    *********** ERROR ***********\n\n' +
            '    You need to provide some text to append.\n\n' +
            '    Here is a sample command:\n' +
            '        `jfdi --append 0 --text foo`.\n\n' +
            '    Type `jfdi -h` for more info.\n' +
            '\n    *****************************\n'
        );

        JFDI.list('today', handleCallbackResult);
    },

    handlePrependIncorrectRealm: function() {
        println(
            '\n    *********** ERROR ***********\n\n' +
            '    You cannot prepend to a future goal.\n\n' +
            '    To prepend to a future goal,  move it to today\'s queue,\n' +
            '    then prepend to it.\n\n' +
            '    Type `jfdi -h` for more info.\n' +
            '\n    *****************************\n'
        );

        JFDI.list('tomorrow', handleCallbackResult);
    },

    handlePrependTextRequired: function() {
        println(
            '\n    *********** ERROR ***********\n\n' +
            '    You need to provide some text to prepend.\n\n' +
            '    Here is a sample command:\n' +
            '        `jfdi --prepend 0 --text foo`.\n\n' +
            '    Type `jfdi -h` for more info.\n' +
            '\n    *****************************\n'
        );

        JFDI.list('today', handleCallbackResult);
    },

    handleReplaceIncorrectRealm: function() {
        println(
            '\n    *********** ERROR ***********\n\n' +
            '    You cannot do replacements in a future goal.\n\n' +
            '    To replace parts of a future goal,  move it to today\'s\n' +
            '    queue, then do your replacements.\n\n' +
            '    Type `jfdi -h` for more info.\n' +
            '\n    *****************************\n'
        );

        JFDI.list('tomorrow', handleCallbackResult);
    },

    handleReplaceTextRequired: function() {
        println(
            '\n    *********** ERROR ***********\n\n' +
            '    You need to provide some text to replace.\n\n' +
            '    Here is a sample command:\n' +
            '        `jfdi --replace 0 --text foo --with bar`.\n\n' +
            '    Type `jfdi -h` for more info.\n' +
            '\n    *****************************\n'
        );

        JFDI.list('today', handleCallbackResult);
    },

    handleReplaceAlternateRequired: function() {
        println(
            '\n    *********** ERROR ***********\n\n' +
            '    You need to provide what to replace. ' +
            '    Here is a sample command: ' +
            '        `jfdi --replacce 0 --text foo --with bar`. ' +
            '    Type `jfdi -h` for more info. ***\n' +
            '\n    *****************************\n'
        );

        JFDI.list('today', handleCallbackResult);
    },

    /* #endregion */
};

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
