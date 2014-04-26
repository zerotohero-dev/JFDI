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
    kTomorrow = realm.TOMORROW,

    file = require('../../config/file'),
    kTodayFile = file.TODAY,
    kTomorrowFile = file.TOMORROW,
    kDoneFile = file.DONE,
    kTimestampFile = file.TIMESTAMP,

    kUpToRoot = '../../..',

    kRoot = require('../../config/path').ROOT,
    kPath = require('../../config/prompt').PATH,
    kNoSuchFile = require('../../config/errorCode').NO_SUCH_FILE,

    // TODO: to config.
    kPageSize = 10;

var dataRoot = fs.readFileSync(path.join(__dirname, kUpToRoot, kRoot)).toString().trim(),
    info = require('../../debug').info,
    display = require('../../display');

exports.getDataRoot = function() {
    info('JFDI.privates.getDataRoo()');

    return dataRoot;
};

exports.setDataRoot = function(newRoot) {
    dataRoot = newRoot;
};

exports.getTodayPath = function() {
    info('JFDI.privates.getTodayPath()');

    return path.join(dataRoot, kTodayFile);
};

exports.getTomorrowPath = function() {
    info('JFDI.privates.getTomorrowPath()');

    return path.join(dataRoot, kTomorrowFile);
};

exports.getDonePath = function() {
    return path.join(dataRoot, kDoneFile);
};

exports.appendDoneGoals = function(goal) {
    info('JFDI.privates.appendDoneGoals("' + goal + '")');

    fs.appendFileSync(exports.getDonePath(), '\n' + goal);
};

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
        for (i = 0, len = Math.min(parts.length, kPageSize); i < len; i++) {
            item = parts[i];

            if (reg.test(item)) {
                results.push({index: i, item: item});
            }
        }
    } else {
        for (i = 0, len = Math.min(parts.length, kPageSize); i < len; i++) {
            item = parts[i];

            results.push({index: i, item: item});
        }
    }

    return results;
};

exports.persistGoals = function(path, goals) {
    info('JFDI.privates.persistGoals()');

    if (goals.length === 0) {
        fs.writeFileSync(path, '');

        return;
    }

    fs.writeFileSync(path, goals.join('\n'));
};

exports.getTodayGoals = function(query) {
    info('JFDI.privates.getTodayGoals()');

    return exports.getGoals(exports.getTodayPath(), query);
};

exports.getTomorrowGoals = function(query) {
    info('JFDI.privates.getTomorrowGoals()');

    return exports.getGoals(exports.getTomorrowPath(), query);
};

exports.persistTodayGoals = function(goals) {
    info('JFDI.privates.persistTodayGoals()');

    exports.persistGoals(exports.getTodayPath(), goals);
};

exports.persistTomorrowGoals = function(goals) {
    info('JFDI.privates.persistTomorrowGoals()');

    exports.persistGoals(exports.getTomorrowPath(), goals);
};

exports.handlePromptFailure = function() {
    info('JFDI.privates.handlePromptFailure()');

    display.printSetupError();
};

exports.create = function(path, data) {
    info('JFDI.privates.create()');

    if(fs.existsSync(path)) {
        return;
    }

    fs.writeFileSync(path, data);
};

exports.handleSuccess = function() {
    display.printSetupSuccess();
};

exports.checkPath = function() {
    info('JFDI.privates.checkPath()');

    prompt.get([kPath], function (err, result) {
        if (err) {
            exports.handlePromptFailure();

            return;
        }

        var dir = result.path;

        fs.stat(dir, function(err) {
            if (err) {
                if (err.code === kNoSuchFile) {
                    display.printNoSuchDirectoryError();

                    exports.checkPath();

                    return;
                }

                exports.handlePromptFailure();
            }

            try {
                fs.writeFileSync(
                    path.join(__dirname, kUpToRoot, kRoot), dir
                );

                exports.create(path.join(dir, kTimestampFile), '');
                exports.create(path.join(dir, kDoneFile), '');
                exports.create(path.join(dir, kTodayFile), '');
                exports.create(path.join(dir, kTomorrowFile), '');
            } catch(err2) {
                exports.handlePromptFailure();

                return;
            }

            exports.handleSuccess();
        });
    });
};

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

exports.getDefaultListThunk = function() {
    return exports.listThunk[kToday];
};

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

exports.getDefaultFindThunk = function() {
    return exports.findThunk[kToday];
};

exports.bufferGoals = function(goals, buffer) {
    goals.forEach(function(item) {
        buffer.push(item.item);
    });
};
