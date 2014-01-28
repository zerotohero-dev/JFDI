
var println = require('./debug').log;


exports.printNewLine = function() {
    println('');
};

exports.printGoalAddError = function() {
    println('JFDI failed to add the goal :(');
};

exports.printQueryForToday = function(query) {
    println('   ### "' + query + '" for Today ###');
};

exports.printTodayHeader = function() {
    println('   ### JFDI List For Today ###');
};

exports.printQueryForTomorrow = function(query) {
    println('   ### "' + query + '" for Tomorrow ###');
};

exports.printTomorrowHeader = function() {
    println('   ### Upcoming JFDI Stuff ###');
};

exports.printUnknownRealmError = function(realm) {
    println('Unknown realm "' + realm + '". exiting.');
};

exports.printNoMatchingResultsForToday = function(query) {
    println('');
    println('       There are no matching goals for your query "' + query + '" for today :(');
    println('');
};

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

exports.printNoMatchingResultsForTomorrow = function(query) {
    println('');
    println('       There are no matching goals for your query "' + query + '" for the near future :(');
    println('');
};

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
