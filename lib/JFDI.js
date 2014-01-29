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

// TODO: use something to create documentation.

var fs = require('fs'),
    path = require('path'),
    prompt = require('prompt');

var dataRoot = fs.readFileSync(__dirname + '/../data/.root').toString().trim(),
    debug = require('./debug'),
    info = debug.info,
    display = require('./display');

var privates = {
    getDataRoot: function() {
        info('JFDI.privates.getDataRoo()');

        return dataRoot;
    },
    getTodayPath: function() {
        info('JFDI.privates.getTodayPath()');

        return path.join(dataRoot, 'today.txt');
    },

    getTomorrowPath: function() {
        info('JFDI.privates.getTomorrowPath()');

        return path.join(dataRoot, 'tomorrow.txt');
    },

    getDonePath: function() {
        return path.join(dataRoot, 'done.txt');
    },

    appendDoneGoals: function(goal) {
        info('JFDI.privates.appendDoneGoals("' + goal + '")');

        fs.appendFileSync(privates.getDonePath(), '\n' + goal);
    },

    getGoals: function(path, query) {
        info('jfdi.privates.getGoals("' + path + '", "' + query + '")');

        var contents = fs.readFileSync(path).toString(),
            results = [],
            i, len, item,
            splitted, reg;

        if (contents === '') {
            return [];
        }

        // Using regular expressions will enable the filters run cross-platform.
        // Do not use OS-dependent commands like `grep` for instance.

        splitted = contents.split(/\n/);
        reg = new RegExp(query, 'i');

        if (query) {
            for (i = 0, len = splitted.length; i < len; i++) {
                item = splitted[i];

                if (reg.test(item)) {
                    results.push({index: i, item: item});
                }
            }
        } else {
            for (i = 0, len = splitted.length; i < len; i++) {
                item = splitted[i];

                results.push({index: i, item: item});
            }
        }

        return results;
    },

    persistGoals: function(path, goals) {
        info('JFDI.privates.persistGoals()');

        if (goals.length === 0) {
            fs.writeFileSync(path, '');

            return;
        }

        fs.writeFileSync(path, goals.join('\n'));
    },

    getTodayGoals: function(query) {
        info('JFDI.privates.getTodayGoals()');

        return privates.getGoals(privates.getTodayPath(), query);
    },

    getTomorrowGoals: function(query) {
        info('JFDI.privates.getTomorrowGoals()');

        return privates.getGoals(privates.getTomorrowPath(), query);
    },

    persistTodayGoals: function(goals) {
        info('JFDI.privates.persistTodayGoals()');

        privates.persistGoals(privates.getTodayPath(), goals);
    },

    persistTomorrowGoals: function(goals) {
        info('JFDI.privates.persistTomorrowGoals()');

        privates.persistGoals(privates.getTomorrowPath(), goals);
    },

    handlePromptFailure: function() {
        info('JFDI.privates.handlePromptFailure()');

        display.printSetupError();
    },

    create: function(path, data) {
        info('JFDI.privates.create()');

        if(fs.existsSync(path)) {
            return;
        }

        fs.writeFileSync(path, data);
    },

    checkPath: function() {
        info('JFDI.privates.checkPath()');

        info('will check path...');

        prompt.get(['path'], function (err, result) {
            if (err) {
                return privates.handlePromptFailure(err);
            }

            var dir = result.path;

            fs.stat(dir, function(err) {
                if (err) {
                    if (err.code === 'ENOENT') {
                        display.printNoSuchDirectoryError();

                        privates.checkPath();

                        return;
                    }

                    privates.handlePromptFailure();
                }

                try {

                    fs.writeFileSync(
                        // TODO: goes to some config class/file.
                        path.join(__dirname, '../data/.root'), dir
                    );

                    privates.create(
                        path.join(dir, '.today.timestamp'), ''
                    );
                    privates.create(path.join(
                        dir, 'done.txt'), ''
                    );
                    privates.create(path.join(
                        dir, 'today.txt'), ''
                    );
                    privates.create(path.join(
                        dir, 'tomorrow.txt'), ''
                    );
                } catch(err2) {
                    privates.handlePromptFailure();

                    return;
                }

                display.printSetupSuccess();
            });
        });
    }
};

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

    switch(queue) {
    case 'today':
        return callback(
            null, {realm: 'today', goals: privates.getTodayGoals()}
        );
    case 'tomorrow':
        return callback(
            null, {realm: 'tomorrow', goals: privates.getTomorrowGoals()}
        );
    default:
        return callback(
            null, {realm: 'today', goals: privates.getTodayGoals()}
        );
    }
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

    switch(queue) {
    case 'today':
        return callback(null, {
            query: query,
            realm: 'today',
            goals: privates.getTodayGoals(query)
        });
    case 'tomorrow':
        return callback(null, {
            query: query,
            realm: 'tomorrow',
            goals: privates.getTomorrowGoals(query)
        });
    default:
        return callback(null, {
            query: query,
            realm: 'today',
            goals: privates.getTodayGoals(query)
        });
    }
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

    //TODO: document which of these function take [String]
    //and which of them take [{}] as parameters, similarly which of them
    //return [String] and which of them return [{}]
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

    // TODO: displaying text messages should not be the goal of JFDI core,
    // it should return an error status/ or an error object, and the visual
    // representation of that error should be handled by a higher-level
    // module.
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

    fs.writeFileSync(__dirname + '/../data/.root', newRoot);

    dataRoot = newRoot;
};
