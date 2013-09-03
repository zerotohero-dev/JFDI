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

var kNotImplemented = 'This functionality has not been implemented yet.';

var handleCallbackResult = require('./output').handle;
var JFDI = require('./JFDI');

var debug = require('./debug');
var println = debug.log;
var info = debug.info;

var privates = {
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

    handlePrioritize: function() {
        info('upper');

        println(kNotImplemented + ' (prioritize)\n');

        JFDI.list('today', handleCallbackResult);
    },

    handleComplete: function(complete) {
        info('complete');

        JFDI.complete(complete, handleCallbackResult);
    },

    handleExpedite: function(sooner) {
        JFDI.expedite(sooner, handleCallbackResult);
    },

    handleDefault: function(realm) {
        info('default');

        JFDI.list(realm, handleCallbackResult);
    },

    // Fail cases below.

    handleSoonerIncorrectRealm: function() {
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
    }
};

exports.privates = privates;

exports.handleToday = function() {
    info('command.handleToday');

    var program = this,
        goal = program.add,
        query = program.find,
        later = program.defer,
        sooner = program.expedite,
        upper = program.prioritize,
        complete = program['do'],
        realm = 'today';

    if (goal) {
        privates.handeAddition(goal);
    } else if (query) {
        privates.handleQuery(realm, query);
    } else if (later !== undefined) {
        privates.handledDefer(later);
    } else if (sooner !== undefined) {
        privates.handleSoonerIncorrectRealm();
    } else if (upper !== undefined) {
        privates.handlePrioritize();
    } else if (complete !== undefined) {
        privates.handleComplete(complete);
    } else {
        privates.handleDefault(realm);
    }
};

exports.handleTomorrow = function() {
    info('command.handleTomorrow');

    var program = this,
        goal = program.add,
        query = program.find,
        later = program.defer,
        sooner = program.expedite,
        upper = program.prioritize,
        complete = program['do'],
        realm = 'tomorrow';

    if (goal) {
        privates.handleAdditionIncorrectRealm();
    } else if (query) {
        privates.handleQuery(realm, query);
    } else if (later !== undefined) {
        privates.handleDeferIncorrectRealm();
    } else if (complete !== undefined) {
        privates.handleCompleteIncorrectRealm();
    } else if (sooner !== undefined) {
        privates.handleExpedite(sooner);
    } else if (upper !== undefined) {
        privates.handlePrioritizeIncorrectRealm();
    } else {
        privates.handleDefault(realm);
    }
};

exports.handleAll = function() {
    info('command.handleAll');

    privates.handleDefault('today');
    privates.handleDefault('tomorrow');
};
