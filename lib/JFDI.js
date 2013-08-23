/*global exports, console*/

'use strict';

exports.help = function() {
    console.log('Usage:');
    console.log('jfdi [help]');
    console.log('jfdi today');
    console.log('jfdi tomorrow');
    console.log('jfdi add {task description}');
    console.log('jfdi find {keyword}');
    console.log('jfdi defer {id}');
    console.log('jfdi expedite {id}');
    console.log('jfdi prio {id}');
    console.log('jfdi [do] {id}');
};

/**
 * Adds a task to the list.
 *
 * @param {String} taskText - What to do.
 */
exports.add = function(task) {
    void task;
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
 * Moves the task to the top of the "tomorrow" queue.
 *
 * @param  {Interger} id - line number as id.
 */
exports.defer = function(id) {
    void id;
};

/**
 * Move the taks from "tomorrow" queue, to the bottom of "today" queue.
 *
 * @param  {Integer} id - line number as id.
 */
exports.expedite = function(id) {
    void id;
};

/**
 * Lists all of current tasks.
 */
exports.today = function() {
};

/**
 * Lists all of the future tasks.
 */
exports.tomorrow = function() {
};

/**
 * Moves the task to the top of the today queue.
 *
 * @param  {Integer} id - line number as id.
 * @return {[type]}    [description]
 */
exports.prio = function(id) {
    void id;
};

/**
 * Moves the task to done.txt (with a timestamp)
 *
 * @param  {Integer} id - line number as id.
 */
function complete(id) {
    void id;
}
