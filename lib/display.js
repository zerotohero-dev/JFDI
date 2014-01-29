'use strict';

var println = require('./debug').log;

/**
 *
 */
exports.printNewLine = function() {
    println('');
};

/**
 *
 */
exports.printGoalAddError = function() {
    println('JFDI failed to add the goal :(');
};

/**
 *
 * @param query
 */
exports.printQueryForToday = function(query) {
    println('   ### "' + query + '" for Today ###');
};

/**
 *
 */
exports.printTodayHeader = function() {
    println('   ### JFDI List For Today ###');
};

/**
 *
 * @param query
 */
exports.printQueryForTomorrow = function(query) {
    println('   ### "' + query + '" for Tomorrow ###');
};

/**
 *
 */
exports.printTomorrowHeader = function() {
    println('   ### Upcoming JFDI Stuff ###');
};

/**
 *
 * @param realm
 */
exports.printUnknownRealmError = function(realm) {
    println('Unknown realm "' + realm + '". exiting.');
};

/**
 *
 * @param query
 */
exports.printNoMatchingResultsForToday = function(query) {
    println('');
    println('       There are no matching goals for your query "' + query + '" for today :(');
    println('');
};

/**
 *
 */
exports.printTabulaRasa = function() {
    println('');
    println('       *Zero Inbox* for today! Hooray!');
    println('');
    println('       Sample Usage:');
    println('           Add a Goal       : jfdi [-a] "Save the world; one goal at a time."');
    println('           List Goals       : jfdi -l');
    println('           List All Commands: jfdi -h');
    println('');
};

/**
 *
 * @param query
 */
exports.printNoMatchingResultsForTomorrow = function(query) {
    println('');
    println('       There are no matching goals for your query "' + query + '" for the near future :(');
    println('');
};

/**
 *
 */
exports.printTabulaRasaForFuture = function() {
    println('');
    println('       Your foreseeable future is pretty blank. Why not add some tasks?');
    println('');
    println('       Sample Usage:');
    println('           Add a Goal       : jfdi -a "Save the world; one goal at a time."');
    println('           List Goals       : jfdi -l');
    println('           List All Commands: jfdi -h');
    println('');
};

/**
 *
 */
exports.printSetupError = function() {
    println('');
    println('### Bummer! JFDI Path Setup Failed! ###');
    println('');
    println('An error occurred. Retrying with root privileges may help.');
    println('');
};

/**
 *
 */
exports.printNoSuchDirectoryError = function() {
    println('');
    println('No such directory exists.');
    println('Please create the directory first.');
    println('Then re-enter here.');
    println('');
};

/**
 *
 */
exports.printSetupSuccess = function() {
    println('');
    println('### Yay! ####');
    println('');
    println('    Ready to go! You can use JFDI now.');
    println('');
    println('    Visit');
    println('');
    println('    https://github.com/v0lkan/JFDI/blob/master/' +
        'README.md');
    println('');
    println('    for usage examples.');
    println('');
};

/**
 *
 */
exports.printRootPathMissing = function() {
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
};

/**
 *
 */
exports.printExpediteIncorrectRealm = function() {
    println(
        '\n    *********** ERROR ***********\n\n' +
            '    You cannot expedite a current goal.\n\n' +
            '    Did you mean to `--prioritize` it, instead?\n\n' +
            '    Type `jfdi -h` for more info.\n' +
            '\n    *****************************\n'
    );
};

/**
 *
 */
exports.printAdditionIncorrectRealm = function() {
    println(
        '\n    *********** ERROR ***********\n\n' +
            '    You cannot add a goal to tomorrow\'s queue.\n\n' +
            '    Add it to today\'s queue, then defer it.\n\n' +
            '    Type `jfdi -h` for more info. ***\n' +
            '\n    *****************************\n'
    );
};

/**
 *
 */
exports.printDeferIncorrectRealm = function() {
    println(
        '\n    *********** ERROR ***********\n\n' +
            '    You cannot defer a future goal.\n\n' +
            '    Did you mean to `--expedite` it, instead?\n\n' +
            '    Type `jfdi -h` for more info. ***\n' +
            '\n    *****************************\n'
    );
};

/**
 *
 */
exports.printCompleteIncorrectRealm = function() {
    println(
        '\n    *********** ERROR ***********\n\n' +
            '    You cannot complete a future goal.\n\n' +
            '    Move it to today\'s queue, then complete it.\n\n' +
            '    Type `jfdi -h` for more info. ***\n' +
            '\n    *****************************\n'
    );
};

/**
 *
 */
exports.printPrioritizeIncorrectRealm = function() {
    println(
        '\n    *********** ERROR ***********\n\n' +
            '    You cannot prioritize a future goal.\n\n' +
            '    Did you mean to expedite (`jfdi -e`) instead?\n\n' +
            '    To prioritize a future goal, move it to today\'s queue,\n' +
            '    then prioritize it.\n\n' +
            '    Type `jfdi -h` for more info. ***\n' +
            '\n    *****************************\n'
    );
};

/**
 *
 */
exports.printAppendIncorrectRealm = function() {
    println(
        '\n    *********** ERROR ***********\n\n' +
            '    You cannot append to a future goal.\n\n' +
            '    To append to a future goal, move it to today\'s queue,\n' +
            '    then append to it.\n\n' +
            '    Type `jfdi -h` for more info. ***\n' +
            '\n    *****************************\n'
    );
};

/**
 *
 */
exports.printAppendTextRequired = function() {
    println(
        '\n    *********** ERROR ***********\n\n' +
            '    You need to provide some text to append.\n\n' +
            '    Here is a sample command:\n' +
            '        `jfdi --append 0 --text foo`.\n\n' +
            '    Type `jfdi -h` for more info.\n' +
            '\n    *****************************\n'
    );
};

/**
 *
 */
exports.printPrependIncorrectRealm = function() {
    println(
        '\n    *********** ERROR ***********\n\n' +
            '    You cannot prepend to a future goal.\n\n' +
            '    To prepend to a future goal,  move it to today\'s queue,\n' +
            '    then prepend to it.\n\n' +
            '    Type `jfdi -h` for more info.\n' +
            '\n    *****************************\n'
    );
};

/**
 *
 */
exports.printPrependTextRequired = function() {
    println(
        '\n    *********** ERROR ***********\n\n' +
            '    You need to provide some text to prepend.\n\n' +
            '    Here is a sample command:\n' +
            '        `jfdi --prepend 0 --text foo`.\n\n' +
            '    Type `jfdi -h` for more info.\n' +
            '\n    *****************************\n'
    );
};

/**
 *
 */
exports.printReplaceIncorrectRealm = function() {
    println(
        '\n    *********** ERROR ***********\n\n' +
            '    You cannot do replacements in a future goal.\n\n' +
            '    To replace parts of a future goal,  move it to today\'s\n' +
            '    queue, then do your replacements.\n\n' +
            '    Type `jfdi -h` for more info.\n' +
            '\n    *****************************\n'
    );
};

/**
 *
 */
exports.printReplaceTextRequired = function() {
    println(
        '\n    *********** ERROR ***********\n\n' +
            '    You need to provide some text to replace.\n\n' +
            '    Here is a sample command:\n' +
            '        `jfdi --replace 0 --text foo --with bar`.\n\n' +
            '    Type `jfdi -h` for more info.\n' +
            '\n    *****************************\n'
    );
};

/**
 *
 */
exports.printAlternateRequired = function() {
    println(
        '\n    *********** ERROR ***********\n\n' +
            '    You need to provide what to replace.\n\n' +
            '    Here is a sample command:\n' +
            '        `jfdi --replacce 0 --text foo --with bar`.\n\n' +
            '    Type `jfdi -h` for more info. ***\n' +
            '\n    *****************************\n'
    );
};
