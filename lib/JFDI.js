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
    println = debug.log;

function getDataRoot() {
    return dataRoot;
}

function getTodayPath() {
    return path.join(dataRoot, 'today.txt');
}

function getTomorrowPath() {
    return path.join(dataRoot, 'tomorrow.txt');
}

function getDonePath() {
    return path.join(dataRoot, 'done.txt');
}

function appendDoneGoals(goal) {
    fs.appendFileSync(getDonePath(), '\n' + goal);
}

function getGoals(path, query) {
    info('getGoals: "' + path + '" "' + query + '"');

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
}

function persistGoals(path, goals) {
    if (goals.length === 0) {
        fs.writeFileSync(path, '');

        return;
    }

    fs.writeFileSync(path, goals.join('\n'));
}

function getTodayGoals(query) {
    return getGoals(getTodayPath(), query);
}

function getTomorrowGoals(query) {
    return getGoals(getTomorrowPath(), query);
}

function persistTodayGoals(goals) {
    persistGoals(getTodayPath(), goals);
}

function persistTomorrowGoals(goals) {
    persistGoals(getTomorrowPath(), goals);
}

function handlePromptFailure() {
    println('');
    println('### Bummer! JFDI Path Setup Failed! ###');
    println('');
    println('An error occured. Retrying with root privileges may help.');
    println('');
}

function createIfNotExists(path, data) {
    if(fs.existsSync(path)) {
        return;
    }

    fs.writeFileSync(path, data);
}

function checkPath() {
    info('will check path...');

    prompt.get(['path'], function (err, result) {
        if (err) {
            return handlePromptFailure(err);
        }

        var dir = result.path;

        fs.stat(dir, function(err) {
            if (err) {
                if (err.code === 'ENOENT') {
                    println('');
                    println('No such directory exists.');
                    println('Please create the directory first.');
                    println('Then re-enter here.');
                    println('');

                    checkPath();

                    return;
                }

                handlePromptFailure();
            }

            try {
                fs.writeFileSync(path.join(__dirname, '../data/.root'), dir);

                createIfNotExists(path.join(dir, '.today.timestamp'), '');
                createIfNotExists(path.join(dir, 'done.txt'), '');
                createIfNotExists(path.join(dir, 'today.txt'), '');
                createIfNotExists(path.join(dir, 'tomorrow.txt'), '');
            } catch(err2) {
                handlePromptFailure();

                return;
            }

            // TODO: move all these println blocks to is own module.
            println('');
            println('### Yay! ####');
            println('');
            println('    Ready to go! You can use JFDI now.');
            println('');
            println('    Visit');
            println('');
            println('    https://github.com/v0lkan/JFDI/blob/master/README.md');
            println('');
            println('    for usage examples.');
            println('');
        });
    });
}

/**
 * Adds a goal to the list.
 *
 * @param {String} goalText - What to do.
 */
exports.add = function(goal, queue, callback) {
    info('JFDI.add');

    var splitted = getTodayGoals(),
        buffer = [];

    splitted.forEach(function(item) {
        buffer.push(item.item);
    });

    buffer.unshift(goal);

    persistTodayGoals(buffer);

    return callback(null, {realm: 'today', goals: getTodayGoals()});
};

/**
 * Returns a textual representation of today's goals.
 *
 * @return {String} the goal lisk
 */
exports.list = function(queue, callback) {
    info('JFDI.list');

    switch(queue) {
    case 'today':
        return callback(null, {realm: 'today', goals: getTodayGoals()});
    case 'tomorrow':
        return callback(null, {realm: 'tomorrow', goals: getTomorrowGoals()});
    default:
        return callback(null, {realm: 'today', goals: getTodayGoals()});
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
    info('JFDI.find');

    switch(queue) {
    case 'today':
        return callback(null, {
            query: query,
            realm: 'today',
            goals: getTodayGoals(query)
        });
    case 'tomorrow':
        return callback(null, {
            query: query,
            realm: 'tomorrow',
            goals: getTomorrowGoals(query)
        });
    default:
        return callback(null, {
            query: query,
            realm: 'today',
            goals: getTodayGoals(query)
        });
    }
};

/**
 * Moves the goal to the top of the "tomorrow" queue.
 *
 * @param  {Interger} id - line number as id.
 */
exports.defer = function(id, callback) {
    info('JFDI.defer');

    var goals = getTodayGoals(),
        goal = goals[id],
        tomorrowGoals = getTomorrowGoals(),
        buffer = [];

    goals.splice(id, 1);

    tomorrowGoals.unshift(goal);

    tomorrowGoals.forEach(function(item) {
        buffer.push(item.item);
    });

    persistTomorrowGoals(buffer);

    buffer.length = 0;

    goals.forEach(function(item) {
        buffer.push(item.item);
    });

    //TODO: document which of these function take [String]
    //and which of them take [{}] as parameters, similarly which of them
    //return [String] and which of them return [{}]
    persistTodayGoals(buffer);

    callback(null, {realm: 'today', goals: getTodayGoals()});
};

/**
 * Moves the goal to the top of the today queue.
 *
 * @param  {Integer} id - line number as id.
 */
exports.prioritize = function(id, callback) {
    info('JFDI.prioritize');

    var goals = getTodayGoals(),
        buffer = [],
        spliced = goals.splice(id, 1);

    goals.unshift(spliced[0]);

    goals.forEach(function(item) {
        buffer.push(item.item);
    });

    persistTodayGoals(buffer);

    callback(null, {realm: 'today', goals: getTodayGoals()});
};

//TODO: add documentation.
//TODO: add sanitization tests, should throw if id is not numeric,
// should throw if text is not String, should throw when argument count
// mismatch -- do similar unit tests to other JFDI core methods, too.
exports.append = function(id, text, callback) {
    info('JFDI.append');

    var goals = getTodayGoals(),
        goal = goals[id],
        buffer = [];

    goal.item += [' ', text].join('');

    // TODO: this is repeated, be DRY.
    goals.forEach(function(item) {
        buffer.push(item.item);
    });

    persistTodayGoals(buffer);

    callback(null, {realm: 'today', goals: getTodayGoals()});
};

//TODO: add documentation.
exports.prepend = function(id, text, callback) {
    info('JFDI.prepend');

    var goals = getTodayGoals(),
        goal = goals[id],
        buffer = [];

    goal.item = [text, ' ', goal.item].join('');

    // TODO: this is repeated, be DRY.
    goals.forEach(function(item) {
        buffer.push(item.item);
    });

    persistTodayGoals(buffer);

    callback(null, {realm: 'today', goals: getTodayGoals()});
};

//TODO: add documentation.
exports.replace = function(id, text, replaceWith, callback) {
    info('JFDI.replace');

    var goals = getTodayGoals(),
        goal = goals[id],
        buffer = [];

    goal.item = goal.item.replace(new RegExp(text, 'ig'), replaceWith);

    // TODO: this is repeated, be DRY.
    goals.forEach(function(item) {
        buffer.push(item.item);
    });

    persistTodayGoals(buffer);

    callback(null, {realm: 'today', goals: getTodayGoals()});
};

/**
 * Moves the goal to done.txt (with a timestamp)
 *
 * @param  {Integer} id - line number as id.
 */
exports.complete = function(id, callback) {
    info('JFDI.complete');

    var goals = getTodayGoals(),
        goal = goals.splice(id, 1),
        item = goal.item,
        buffer = [];

    item += ' /@' + (new Date()).toLocaleString() + '@/';

    appendDoneGoals(item);

    goals.forEach(function(item) {
        buffer.push(item.item);
    });

    persistTodayGoals(buffer);

    callback(null, {realm: 'today', goals: getTodayGoals()});
};

/**
 * Move the taks from "tomorrow" queue, to the bottom of "today" queue.
 *
 * @param  {Integer} id - line number as id.
 */
exports.expedite = function(id, callback) {
    info('JFDI.expedite');

    var tomorrowGoals = getTomorrowGoals(),
        goal = tomorrowGoals.splice(id, 1),
        todayGoals = getTodayGoals(),
        buffer = [];

    todayGoals.unshift(goal);

    todayGoals.forEach(function(item) {
        buffer.push(item.item);
    });

    persistTodayGoals(buffer);

    buffer.length = 0;

    tomorrowGoals.forEach(function(item) {
        buffer.push(item.item);
    });

    persistTomorrowGoals(buffer);

    callback(null, {
        realm: 'today',
        goals: getTodayGoals()
    });
};

//TODO: implement
exports.listContexts = function() {
    throw 'not implemented';
};

//TODO: implement
exports.addContext = function() {
    throw 'not implemented.';
};

//TODO: implement
exports.setContext = function(/*name, dataPath*/) {
    info('JFDI.setContext');

    throw 'not implemented.';

    //TODO: check for the path existence, if exists, initialize it an update
    // data/.root
};

//TODO: implement
exports.switchContext = function(/*name*/) {
    info('JFDI.switchContext');

    throw 'not implemented';

    //TODO: update data/.root
};

/**
 * Checks for the data directory; if missing, prompts user to set one.
 * After data directory is set successfully, initializes the directory contents.
 */
exports.sanitize = function() {
    info('JFDI.sanitize');

    var rootPath = getDataRoot();

    // TODO: displaying text messages should not be the goal of JFDI core,
    // it should return an error status/ or an error object, and the visual
    // represenatation of that error should be handled by a higher-level
    // module.
    if (!rootPath) {
        println('');
        println('### Set Your JFDI for the First Time ###');
        println('');
        println('    It looks like this is the first time you are using JFDI.');
        println('    Dont\'t worry, it\'s easy.');
        println('');
        println('    The only thing you need to configure is a folder to');
        println('    store your JFDI data.');
        println('');
        println('    Where do you want to store your JFDI data?');
        println('    Enter the full path ( like: /home/ninja/Dropbox/JFDI/ ).');
        println('');

        prompt.start();

        checkPath();

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
    info('JFDI.setDataRoot');

    fs.writeFileSync(__dirname + '/../data/.root', newRoot);

    dataRoot = newRoot;
};
