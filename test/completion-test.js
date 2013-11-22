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

'use strict';

/*jshint maxlen:180*/

var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    fs = require('fs'),
    program = require('commander');

var JFDI = require('../lib/JFDI'),
    runtime = require('../lib/runtime'),
    command = require('../lib/command');

function resetState() {
    delete program.add;
    delete program.find;
    delete program.defer;
    delete program.expedite;
    delete program.prioritize;
    delete program.append;
    delete program.prepend;
    delete program.replace;
    delete program.text;
    delete program['with'];
    delete program['do'];
}

var oldArguments;

function setup(postSetup) {
    oldArguments = process.argv;

    resetState();

    // To prevent overwriting data/.root.
    sinon.stub(fs, 'writeFileSync');

    // To prevent "resource not found " errors.
    sinon.stub(fs, 'readFileSync', function(path) {
        return path;
    });

    // To prevent corrupting real data.
    JFDI.setDataRoot('');

    if (postSetup) {
        postSetup();
    }
}

function teardown(preTeardown) {
    if (preTeardown) {
        preTeardown();
    }

    fs.writeFileSync.restore();
    fs.readFileSync.restore();

    process.argv = oldArguments;

    resetState();
}

function getArgv(test) {
    return (
        (typeof test === 'string') ? test : test.suite.subject
    ).replace('jfdi', 'node .').split(/\s+/);
}

/*----------------------------------------------------------------------------*/

vows.describe('jfdi 0').addBatch({
    'Parsing>>>': {
        'when "jfdi 0" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi 0" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleComplete');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                teardown(function() {command.privates.handleComplete.restore();});

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi 0 today" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi 0 today" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleComplete');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                teardown(function() {command.privates.handleComplete.restore();});

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi 0 tomorrow" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --do 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi 0 tomorrow" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleCompleteIncorrectRealm');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleCompleteIncorrectRealm.calledOnce;

                teardown(function() {command.privates.handleCompleteIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -x 0').addBatch({
    'Parsing>>>': {
        'when "jfdi -x 0" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-x' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi -x 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -x 0" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleComplete');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                teardown(function() {command.privates.handleComplete.restore();});

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -x 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi -x 0 today" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-x' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi -x 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -x 0 today" is called': {
            topic: function() {
                var expectation;

                // Setup.
                setup(function() {sinon.stub(command.privates, 'handleComplete');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                teardown(function() {command.privates.handleComplete.restore();});

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -x 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -x 0 tomorrow" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-x' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi -x 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -x 0 tomorrow" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleCompleteIncorrectRealm');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleCompleteIncorrectRealm.calledOnce;

                // Teardown.
                teardown(function() {command.privates.handleCompleteIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --do 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 tomorrow" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --do 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 tomorrow" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleCompleteIncorrectRealm');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleCompleteIncorrectRealm.calledOnce;

                teardown(function() {command.privates.handleCompleteIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleComplete');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                teardown(function() {command.privates.handleComplete.restore();});

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);


/*----------------------------------------------------------------------------*/
/* Bug-related tests below                                                    */
/*----------------------------------------------------------------------------*/

vows.describe('#33 - done.txt should not log "undefined"').addBatch({
    '#33': {
        'when "jfdi 0" is called': {
            topic: function() {
                var expectation;

                setup(function(){
                    sinon.stub(JFDI.privates, 'getTodayGoals').returns([{item: 'bazinga'}]);
                    sinon.stub(JFDI.privates, 'persistTodayGoals');
                    sinon.stub(JFDI.privates, 'appendDoneGoals', function(item) {
                        expectation = item.indexOf('bazinga') > -1;
                    });
                });

                // Create the command.
                process.argv = getArgv('jfdi 0');

                runtime.initialize();
                runtime.execute();

                teardown(function(){
                    JFDI.privates.getTodayGoals.restore();
                    JFDI.privates.persistTodayGoals.restore();
                    JFDI.privates.appendDoneGoals.restore();
                });

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);
