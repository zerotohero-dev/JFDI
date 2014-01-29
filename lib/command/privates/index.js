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

    JFDI.defer(later, handleCallbackResult);
};

/**
 *
 * @param upper
 */
exports.handlePrioritize = function(upper) {
    info('privates.handlePrioritize("' + upper + '")');

    JFDI.prioritize(upper, handleCallbackResult);
};

exports.handleComplete = function(complete) {
    info('privates.handleComplete()');

    JFDI.complete(complete, handleCallbackResult);
};

exports.handleExpedite = function(sooner) {
    info('privates.handleExpedite()');

    JFDI.expedite(sooner, handleCallbackResult);
};

exports.handleAppend = function(append, text) {
    info('privates.handleAppend("' + append + '","' + text + '")');

    JFDI.append(append, text, handleCallbackResult);
};

exports.handlePrepend = function(prepend, text) {
    info('privates.handlePrepend()');

    JFDI.prepend(prepend, text, handleCallbackResult);
};

exports.handleReplace = function(replace, text, replaceWith) {
    info('privates.handleReplace()');

    JFDI.replace(replace, text, replaceWith, handleCallbackResult);
};

exports.handleDefault = function(realm) {
    info('privates.handleDefault()');

    JFDI.list(realm, handleCallbackResult);
};

/* #region Fail Cases */

exports.handleExpediteIncorrectRealm = function() {
    info('privates.handleExpediteIncorrectRealm()');

    display.printExpediteIncorrectRealm();

    JFDI.list('today', handleCallbackResult);
};

exports.handleAdditionIncorrectRealm = function() {
    info('privates.handleAdditionIncorrectRealm()');

    display.printAdditionIncorrectRealm();

    JFDI.list('today', handleCallbackResult);
};

exports.handleDeferIncorrectRealm = function() {
    info('privates.handleDeferIncorrectRealm()');

    display.printDeferIncorrectRealm();

    JFDI.list('tomorrow', handleCallbackResult);
};

exports.handleCompleteIncorrectRealm = function() {
    info('privates.handleCompleteIncorrectRealm()');

    display.printCompleteIncorrectRealm();

    JFDI.list('tomorrow', handleCallbackResult);
};

exports.handlePrioritizeIncorrectRealm = function() {
    info('privates.handlePrioritizeIncorrectRealm()');

    display.printPrioritizeIncorrectRealm();

    JFDI.list('tomorrow', handleCallbackResult);
};

exports.handleAppendIncorrectRealm = function() {
    info('privates.handleAppendIncorrectRealm()');

    display.printAppendIncorrectRealm();

    JFDI.list('tomorrow', handleCallbackResult);
};

exports.handleAppendTextRequired = function() {
    info('privates.handleAppendTextRequired()');

    display.printAppendTextRequired();

    JFDI.list('today', handleCallbackResult);
};

exports.handlePrependIncorrectRealm = function() {
    info('privates.handlePrependIncorrectRealm()');

    display.printPrependIncorrectRealm();

    JFDI.list('tomorrow', handleCallbackResult);
};

exports.handlePrependTextRequired = function() {
    info('privates.handlePrependTextRequired()');

    display.printPrependTextRequired();

    JFDI.list('today', handleCallbackResult);
};

exports.handleReplaceIncorrectRealm = function() {
    info('privates.handleReplaceIncorrectRealm()');

    display.printReplaceIncorrectRealm();

    JFDI.list('tomorrow', handleCallbackResult);
};

exports.handleReplaceTextRequired = function() {
    info('privates.handleReplaceTextRequired()');

    display.printReplaceTextRequired();

    JFDI.list('today', handleCallbackResult);
};

exports.handleReplaceAlternateRequired = function() {
    info('privates.handleReplaceAlternateRequired()');

    display.printAlternateRequired();

    JFDI.list('today', handleCallbackResult);
};
