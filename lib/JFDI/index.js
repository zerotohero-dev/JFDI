'use strict';

/*
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

var fs = require('fs'),
    path = require('path'),
    prompt = require('prompt');

// TOOD: to config.
var
    debug = require('../debug'),
    info = debug.info,
    display = require('../display'),
    privates = require('./privates');

exports.privates = privates;

/**
 * @param {String} goal - What to do.
 * @param {Function} callback
 * @returns {*}
 */
exports.add = function(goal, callback) {
    info('JFDI.add()');

    var split = privates.getTodayGoals(),
        buffer = [];

    split.forEach(function(item) {
        buffer.push(item.item);
    });

    buffer.unshift(goal);

    privates.persistTodayGoals(buffer);

    return callback(null, {realm: 'today', goals: privates.getTodayGoals()});
};

/**
 * Returns a textual representation of today's goals.
 *
 * @return {String} the goal list
 */
exports.list = function(queue, callback) {
    info('JFDI.list()');

    (privates.listThunk[queue] || privates.getDefaultListThunk())(callback);
};

/**
 * Filters the goal list, and returns a subset of goals.
 *
 * @param  {String} queue - 'today'|'tomorrow'
 * @param  {String} query - the string to filter.
 * @param  {Function} callback A function with a signature
 *     fn(err, {query:query, realm:realm, goals:[list]})
 */
exports.find = function(queue, query, callback) {
    info('JFDI.find()');

    (privates.findThunk[queue] || privates.getDefaultFindThunk())(
        callback, query
    );
};

/**
 * Moves the goal to the top of the "tomorrow" queue.
 *
 * @param  {Interger} id - line number as id.
 */
exports.defer = function(id, callback) {
    info('JFDI.defer()');

    var goals = privates.getTodayGoals(),
        goal = goals[id],
        tomorrowGoals = privates.getTomorrowGoals(),
        buffer = [];

    goals.splice(id, 1);

    tomorrowGoals.unshift(goal);

    tomorrowGoals.forEach(function(item) {
        buffer.push(item.item);
    });

    privates.persistTomorrowGoals(buffer);

    buffer.length = 0;

    goals.forEach(function(item) {
        buffer.push(item.item);
    });

    privates.persistTodayGoals(buffer);

    callback(null, {realm: 'today', goals: privates.getTodayGoals()});
};

/**
 * Moves the goal to the top of the today queue.
 *
 * @param  {Integer} id - line number as id.
 */
exports.prioritize = function(id, callback) {
    info('JFDI.prioritize()');

    var goals = privates.getTodayGoals(),
        buffer = [],
        spliced = goals.splice(id, 1);

    goals.unshift(spliced[0]);

    goals.forEach(function(item) {
        buffer.push(item.item);
    });

    privates.persistTodayGoals(buffer);

    callback(null, {realm: 'today', goals: privates.getTodayGoals()});
};

//TODO: add documentation.
//TODO: add sanitization tests, should throw if id is not numeric,
// should throw if text is not String, should throw when argument count
// mismatch -- do similar unit tests to other JFDI core methods, too.
exports.append = function(id, text, callback) {
    info('JFDI.append()');

    var goals = privates.getTodayGoals(),
        goal = goals[id],
        buffer = [];

    goal.item += [' ', text].join('');

    // TODO: this is repeated, be DRY.
    goals.forEach(function(item) {
        buffer.push(item.item);
    });

    privates.persistTodayGoals(buffer);

    callback(null, {realm: 'today', goals: privates.getTodayGoals()});
};

//TODO: add documentation.
exports.prepend = function(id, text, callback) {
    info('JFDI.prepend()');

    var goals = privates.getTodayGoals(),
        goal = goals[id],
        buffer = [];

    goal.item = [text, ' ', goal.item].join('');

    // TODO: this is repeated, be DRY.
    goals.forEach(function(item) {
        buffer.push(item.item);
    });

    privates.persistTodayGoals(buffer);

    callback(null, {realm: 'today', goals: privates.getTodayGoals()});
};

//TODO: add documentation.
exports.replace = function(id, text, replaceWith, callback) {
    info('JFDI.replace()');

    var goals = privates.getTodayGoals(),
        goal = goals[id],
        buffer = [];

    goal.item = goal.item.replace(new RegExp(text, 'ig'), replaceWith);

    // TODO: this is repeated, be DRY.
    goals.forEach(function(item) {
        buffer.push(item.item);
    });

    privates.persistTodayGoals(buffer);

    callback(null, {realm: 'today', goals: privates.getTodayGoals()});
};

/**
 * Moves the goal to done.txt (with a timestamp)
 *
 * @param  {Integer} id - line number as id.
 */
exports.complete = function(id, callback) {
    info('JFDI.complete()');

    var goals = privates.getTodayGoals(),
        goal = goals.splice(id, 1)[0],
        item = goal.item,
        buffer = [];

    item += ' /@' + (new Date()).toLocaleString() + '@/';

    privates.appendDoneGoals(item);

    goals.forEach(function(item) {
        buffer.push(item.item);
    });

    privates.persistTodayGoals(buffer);

    callback(null, {realm: 'today', goals: privates.getTodayGoals()});
};

/**
 * Move the taks from "tomorrow" queue, to the bottom of "today" queue.
 *
 * @param  {Integer} id - line number as id.
 */
exports.expedite = function(id, callback) {
    info('JFDI.expedite()');

    var tomorrowGoals = privates.getTomorrowGoals(),
        goal = tomorrowGoals.splice(id, 1),
        todayGoals = privates.getTodayGoals(),
        buffer = [];

    todayGoals.unshift(goal);

    todayGoals.forEach(function(item) {
        buffer.push(item.item);
    });

    privates.persistTodayGoals(buffer);

    buffer.length = 0;

    tomorrowGoals.forEach(function(item) {
        buffer.push(item.item);
    });

    privates.persistTomorrowGoals(buffer);

    callback(null, {
        realm: 'today',
        goals: privates.getTodayGoals()
    });
};

//TODO: implement
exports.listContexts = function() {
    info('JFDI.listContexts()');

    throw 'not implemented';
};

//TODO: implement
exports.addContext = function() {
    info('JFDI.addContext()');

    throw 'not implemented.';
};

//TODO: implement
exports.setContext = function(/*name, dataPath*/) {
    info('JFDI.setContext()');

    throw 'not implemented.';

    //TODO: check for the path existence, if exists, initialize it an update
    // data/.root
};

//TODO: implement
exports.switchContext = function(/*name*/) {
    info('JFDI.switchContext()');

    throw 'not implemented';

    //TODO: update data/.root
};

/**
 * Checks for the data directory; if missing, prompts user to set one.
 * After data directory is set successfully, initializes the directory contents.
 */
exports.sanitize = function() {
    info('JFDI.sanitize()');

    var rootPath = privates.getDataRoot();

    if (!rootPath) {
        display.printRootPathMissing();

        prompt.start();

        privates.checkPath();

        return false;
    }

    return true;
};

/**
 * Updates the working directory.
 *
 * @param  {String} newRoot - a full path to an existing folder.
 */
exports.setDataRoot = function(newRoot) {
    info('JFDI.setDataRoot()');

    // TODO: use path.join
    fs.writeFileSync(__dirname + '/../data/.root', newRoot);

    privates.setDataRoot(newRoot);
};
