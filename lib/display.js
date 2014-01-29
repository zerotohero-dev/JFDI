
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

exports.printSetupError = function() {
    println('');
    println('### Bummer! JFDI Path Setup Failed! ###');
    println('');
    println('An error occurred. Retrying with root privileges may help.');
    println('');
};

exports.printNoSuchDirectoryError = function() {
    println('');
    println('No such directory exists.');
    println('Please create the directory first.');
    println('Then re-enter here.');
    println('');
};

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
