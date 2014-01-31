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

var fs = require('fs'),
    path = require('path'),
    prompt = require('prompt'),
    realm = require('../../config/realm'),
    kToday = realm.TODAY,
    kTomorrow = realm.TOMORROW;

var dataRoot = fs.readFileSync(path.join(__dirname, '/../../../data/.root')).toString().trim(),
    info = require('../../debug').info,
    display = require('../../display');

/**
 *
 * @returns {string}
 */
exports.getDataRoot = function() {
    info('JFDI.privates.getDataRoo()');

    return dataRoot;
};

/**
 *
 * @param newRoot
 */
exports.setDataRoot = function(newRoot) {
    dataRoot = newRoot;
};

/**
 *
 * @returns {*|string}
 */
exports.getTodayPath = function() {
    info('JFDI.privates.getTodayPath()');

    return path.join(dataRoot, 'today.txt');
};

/**
 *
 * @returns {*|string}
 */
exports.getTomorrowPath = function() {
    info('JFDI.privates.getTomorrowPath()');

    return path.join(dataRoot, 'tomorrow.txt');
};

/**
 *
 * @returns {*|string}
 */
exports.getDonePath = function() {
    return path.join(dataRoot, 'done.txt');
};

/**
 *
 * @param goal
 */
exports.appendDoneGoals = function(goal) {
    info('JFDI.privates.appendDoneGoals("' + goal + '")');

    fs.appendFileSync(exports.getDonePath(), '\n' + goal);
};

/**
 *
 * @param path
 * @param query
 * @returns {Array}
 */
exports.getGoals = function(path, query) {
    info('jfdi.privates.getGoals("' + path + '", "' + query + '")');

    var contents = fs.readFileSync(path).toString(),
        results = [],
        i, len, item,
        parts, reg;

    if (contents === '') {
        return [];
    }

    // Using regular expressions will enable the filters run cross-platform.
    // Do not use OS-dependent commands like `grep` for instance.

    parts = contents.split(/\n/);
    reg = new RegExp(query, 'i');

    if (query) {
        for (i = 0, len = parts.length; i < len; i++) {
            item = parts[i];

            if (reg.test(item)) {
                results.push({index: i, item: item});
            }
        }
    } else {
        for (i = 0, len = parts.length; i < len; i++) {
            item = parts[i];

            results.push({index: i, item: item});
        }
    }

    return results;
};

/**
 *
 * @param path
 * @param goals
 */
exports.persistGoals = function(path, goals) {
    info('JFDI.privates.persistGoals()');

    if (goals.length === 0) {
        fs.writeFileSync(path, '');

        return;
    }

    fs.writeFileSync(path, goals.join('\n'));
};

/**
 *
 * @param [query]
 *
 * @returns {Array}
 */
exports.getTodayGoals = function(query) {
    info('JFDI.privates.getTodayGoals()');

    return exports.getGoals(exports.getTodayPath(), query);
};

/**
 *
 * @param [query]
 *
 * @returns {Array}
 */
exports.getTomorrowGoals = function(query) {
    info('JFDI.privates.getTomorrowGoals()');

    return exports.getGoals(exports.getTomorrowPath(), query);
};

/**
 *
 * @param goals
 */
exports.persistTodayGoals = function(goals) {
    info('JFDI.privates.persistTodayGoals()');

    exports.persistGoals(exports.getTodayPath(), goals);
};

/**
 *
 * @param goals
 */
exports.persistTomorrowGoals = function(goals) {
    info('JFDI.privates.persistTomorrowGoals()');

    exports.persistGoals(exports.getTomorrowPath(), goals);
};

/**
 *
 */
exports.handlePromptFailure = function() {
    info('JFDI.privates.handlePromptFailure()');

    display.printSetupError();
};

/**
 *
 * @param path
 * @param data
 */
exports.create = function(path, data) {
    info('JFDI.privates.create()');

    if(fs.existsSync(path)) {
        return;
    }

    fs.writeFileSync(path, data);
};

/**
 *
 */
exports.handleSuccess = function() {
    display.printSetupSuccess();
};

/**
 *
 */
exports.checkPath = function() {
    info('JFDI.privates.checkPath()');

    prompt.get(['path'], function (err, result) {
        if (err) {
            exports.handlePromptFailure();

            return;
        }

        var dir = result.path;

        fs.stat(dir, function(err) {
            if (err) {
                if (err.code === 'ENOENT') {
                    display.printNoSuchDirectoryError();

                    exports.checkPath();

                    return;
                }

                exports.handlePromptFailure();
            }

            try {
                fs.writeFileSync(
                    // TODO: goes to some config class/file.
                    path.join(__dirname, '../../../data/.root'), dir
                );

                exports.create(path.join(dir, '.today.timestamp'), '');
                exports.create(path.join(dir, 'done.txt'), '');
                exports.create(path.join(dir, 'today.txt'), '');
                exports.create(path.join(dir, 'tomorrow.txt'), '');
            } catch(err2) {
                exports.handlePromptFailure();

                return;
            }

            exports.handleSuccess();
        });
    });
};

/**
 *
 * @type {{}}
 */
exports.listThunk = {};

exports.listThunk[kToday] = function(callback) {
    return callback(
        null, {realm: kToday, goals: exports.getTodayGoals()}
    );
};

exports.listThunk[kTomorrow] = function(callback) {
    return callback(
        null, {realm: kTomorrow, goals: exports.getTomorrowGoals()}
    );
};

/**
 *
 */
exports.getDefaultListThunk = function() {
    return exports.listThunk[kToday];
};

/**
 *
 */
exports.findThunk = {};

exports.findThunk[kToday] = function(callback, query) {
    return callback(null, {
        query: query,
        realm: kToday,
        goals: exports.getTodayGoals(query)
    });
};

exports.findThunk[kTomorrow] = function(callback, query) {
    return callback(null, {
        query: query,
        realm: kTomorrow,
        goals: exports.getTomorrowGoals(query)
    });
};

/**
 *
 */
exports.getDefaultFindThunk = function() {
    return exports.findThunk[kToday];
};

/**
 *
 * @param goals
 * @param buffer
 */
exports.bufferGoals = function(goals, buffer) {
    goals.forEach(function(item) {
        buffer.push(item.item);
    });
};
