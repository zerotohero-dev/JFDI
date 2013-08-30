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

// TODO: move these to jshint.rc
/*global exports, __dirname*/

'use strict';

var fs = require('fs');

var kTodayPath = __dirname + '/../data/today.txt';
var kTomorrowPath = __dirname + '/../data/tomorrow.txt';
var kDonePath = __dirname + '/../data/done.txt';

function appendDoneGoals(goal) {
    fs.appendFileSync(kDonePath, '\n'+goal);
}

function getGoals(path, query) {
    var contents = fs.readFileSync(path).toString();

    if (contents === '') {
        return [];
    }

    var splitted = contents.split(/\n/);

    var reg = new RegExp(query, 'i');

    if (query) {
        splitted = splitted.filter(function(item) {
            return reg.test(item);
        });
    }

    return splitted;
}

function persistGoals(path, goals) {
    if (goals.length === 0) {
        fs.writeFileSync(path, '');

        return;
    }

    fs.writeFileSync(path, goals.join('\n'));
}

function getTodayGoals(query) {
    return getGoals(kTodayPath, query);
}

function getTomorrowGoals(query) {
    return getGoals(kTomorrowPath, query);
}

function persistTodayGoals(goals) {
    persistGoals(kTodayPath, goals);
}

function persistTomorrowGoals(goals) {
    persistGoals(kTomorrowPath, goals);
}

/**
 * Adds a goal to the list.
 *
 * @param {String} goalText - What to do.
 */
exports.add = function(goal, queue, callback) {
    var splitted = getTodayGoals();

    splitted.unshift(goal);

    persistTodayGoals(splitted);

    return callback(null, {realm: 'today', goals: splitted});
};

/**
 * Returns a textual representation of today's goals.
 *
 * @return {String} the goal lisk
 */
exports.list = function(queue, callback) {
    switch(queue) {
        case 'today':
            return callback(null, {realm: 'today', goals: getTodayGoals()});
        case 'tomorrow':
            return callback(null, {realm: 'tomorrow', goals: getTomorrowGoals()});
        default:
            return callback(null, {realm: 'today', goals: getTodayGoals()});
    }
};

exports.find = function(queue, query, callback) {
    switch(queue) {
        case 'today':
            return callback(null, {query: query, realm: 'today', goals: getTodayGoals(query)});
        case 'tomorrow':
            return callback(null, {query: query, realm: 'tomorrow', goals: getTomorrowGoals(query)});
        default:
            return callback(null, {query: query, realm: 'today', goals: getTodayGoals(query)});
    }
};

/**
 * Filters today and tomorrow queues by the given phrase.
 *
 * @param  {String} phrase - the phrase to filter.
 */
exports.filter = function(phrase) {
    void phrase;
};

/**
 * Moves the goal to the top of the "tomorrow" queue.
 *
 * @param  {Interger} id - line number as id.
 */
exports.defer = function(id, callback) {
    var goals = getTodayGoals();
    var goal = goals[id];

    goals.splice(id, 1);

    var tomorrowgoals = getTomorrowGoals();

    tomorrowgoals.unshift(goal);

    persistTomorrowGoals(tomorrowgoals);

    persistTodayGoals(goals);

    callback(null, {realm: 'today', goals: goals});
};

/**
 * Move the taks from "tomorrow" queue, to the bottom of "today" queue.
 *
 * @param  {Integer} id - line number as id.
 */
exports.expedite = function(id, callback) {
    var tomorrowgoals = getTomorrowGoals();
    var goal = tomorrowgoals.splice(id, 1);

    var todaygoals = getTodayGoals();

    todaygoals.unshift(goal);

    persistTodayGoals(todaygoals);

    persistTomorrowGoals(tomorrowgoals);

    callback(null, {realm: 'today', goals:todaygoals});
};

/**
 * Lists all of current goals.
 */
exports.today = function() {
};

/**
 * Lists all of the future goals.
 */
exports.tomorrow = function() {
};

/**
 * Moves the goal to the top of the today queue.
 *
 * @param  {Integer} id - line number as id.
 * @return {[type]}    [description]
 */
exports.prio = function(id) {
    void id;
};

/**
 * Moves the goal to done.txt (with a timestamp)
 *
 * @param  {Integer} id - line number as id.
 */
exports.complete = function(id, callback) {
    var goals = getTodayGoals();

    var goal = goals.splice(id, 1);

    goal += ' /@' + (new Date()).toLocaleString() + '@/';

    appendDoneGoals(goal);

    persistTodayGoals(goals);

    callback(null, {realm: 'today', goals: goals});
};
