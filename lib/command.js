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

exports.handleToday = function() {
    info('command.handleToday');

    var program = this,
        goal = program.add,
        query = program.find,
        later = program.defer,
        sooner = program.expedite,
        upper = program.prioritize,
        complete = program['do'];

    if (goal) {
        info('add');

        JFDI.add(goal, 'today', handleCallbackResult);

    } else if (query) {
        info('find');

        JFDI.find('today', query, handleCallbackResult);
    } else if (later !== undefined) {
        info('later');

        JFDI.defer(later, handleCallbackResult);
    } else if (sooner !== undefined) {
        println('\n*** You cannot expedite a current goal. ' +
            'Did you mean to --prioritize it, instead?.' +
            ' Type `jfdi -h` for more info. ***\n'
        );

        JFDI.list('today', handleCallbackResult);
    } else if (upper !== undefined) {
        info('upper');

        println(kNotImplemented + ' (prioritize)\n');

        JFDI.list('today', handleCallbackResult);
    } else if (complete !== undefined) {
        info('complete');

        JFDI.complete(complete, handleCallbackResult);
    } else {
        info('default');

        JFDI.list('today', handleCallbackResult);
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
        complete = program['do'];

    if (goal) {
        // TODO: localization:
        println('\n*** You cannot add a goal to tomorrow\'s queue. ' +
            'Add it to today\'s queue, then defer it. Type `jfdi -h` ' +
            'for more info. ***\n'
        );
    } else if (query) {

        JFDI.find('tomorrow', query, handleCallbackResult);
    } else if (later !== undefined) {
        println('\n*** You cannot defer a future goal. ' +
            'Did you mean to --expedite it, instead? Type `jfdi -h` ' +
            'for more info. ***\n'
        );
    } else if (complete !== undefined) {
        println('\n*** You cannot complete a future goal. ' +
            'Add it to today\'s queue, then defer it. ' +
            'Type `jfdi -h` for more info. ***\n'
        );
    } else if (sooner !== undefined) {
        JFDI.expedite(sooner, handleCallbackResult);
    } else if (upper !== undefined) {
        println(kNotImplemented + ' (expedite/tw)\n');
    } else {
        JFDI.list('tomorrow', handleCallbackResult);
    }
};

exports.handleAll = function() {
    info('command.handleAll');

    JFDI.list('today', handleCallbackResult);
    JFDI.list('tomorrow', handleCallbackResult);
};
