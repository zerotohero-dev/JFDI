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

var handleCallbackResult = require('./output').handle;
var JFDI = require('./JFDI');

var debug = require('./debug');
var println = debug.log;
var info = debug.info;

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

        JFDI.append(append, text);
    },

    handlePrepend: function(prepend, text) {
        info('prepend');

        JFDI.prepend(prepend, text);
    },

    handleReplace: function(replace, text, replaceWith) {
        info('replace');

        JFDI.replace(replace, text, replaceWith);
    },

    handleDefault: function(realm) {
        info('default');

        JFDI.list(realm, handleCallbackResult);
    },

    /* #region Fail Cases */

    handleExpediteIncorrectRealm: function() {
        println('\n*** You cannot expedite a current goal. ' +
            'Did you mean to --prioritize it, instead?.' +
            ' Type `jfdi -h` for more info. ***\n'
        );

        JFDI.list('today', handleCallbackResult);
    },

    handleAdditionIncorrectRealm: function() {
        println('\n*** You cannot add a goal to tomorrow\'s queue. ' +
            'Add it to today\'s queue, then defer it. Type `jfdi -h` ' +
            'for more info. ***\n'
        );

        JFDI.list('today', handleCallbackResult);
    },

    handleDeferIncorrectRealm: function() {
        println('\n*** You cannot defer a future goal. ' +
            'Did you mean to --expedite it, instead? Type `jfdi -h` ' +
            'for more info. ***\n'
        );

        JFDI.list('tomorrow', handleCallbackResult);
    },

    handleCompleteIncorrectRealm: function() {
        println('\n*** You cannot complete a future goal. ' +
            'Move it to today\'s queue, then complete it. ' +
            'Type `jfdi -h` for more info. ***\n'
        );

        JFDI.list('tomorrow', handleCallbackResult);
    },

    handlePrioritizeIncorrectRealm: function() {
        println('\n*** You cannot prioritize a future goal. ' +
            'Did you mean to expedite (jfdi -e) instead?\n' +
            'To prioritize a future goal, ' +
            'move it to today\'s queue, then prioritize it. ' +
            'Type `jfdi -h` for more info. ***\n'
        );

        JFDI.list('tomorrow', handleCallbackResult);
    },

    handleAppendIncorrectRealm: function() {
        //TODO: implement me
        console.log('implement me!');
        throw 'implement me!';
    },

    handlePrependIncorrectRealm: function() {
        //TODO: implement me
        console.log('implement me!');
        throw 'implement me!';
    },

    handleReplaceIncorrectRealm: function() {
        //TODO: implement me
        console.log('implement me!');
        throw 'implement me!';
    }

    /* #endregion */
};

exports.privates = privates;

function handleCommand(program, realm) {
    var goal = program.add,
        query = program.find,
        later = program.defer,
        sooner = program.expedite,
        upper = program.prioritize,
        append = program.apppend,
        prepend = program.prepend,
        replace = program.replace,
        text = program.text,
        replaceWith = program['with'],
        complete = program['do'];

    if (realm === 'all') {
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
        info('append');

        if (realm === 'tomorrow') {
            privates.handleAppendIncorrectRealm();
        }

        privates.handleAppend(append, text);

        return;
    }

    if (prepend !== undefined) {
        info('prepend');

        if (realm === 'tomorrow') {
            privates.handlePrependIncorrectRealm();
        }

        privates.handlePrepend(prepend, text);

        return;
    }

    if (replace !== undefined) {
        info('replace');

        if(realm === 'tomorrow') {
            privates.handleReplaceIncorrectRealm();
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
