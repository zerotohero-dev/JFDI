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

var oldArguments;

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
    return test.suite.subject.replace('jfdi', 'node .').split(/\s+/);
}

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -m 0').addBatch({
    'Parsing>>>': {
        'when "jfdi -m 0" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-m' &&
                    args[3] ==='0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi -m 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -m 0" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppendTextRequired');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppendTextRequired.calledOnce;

                teardown(function() {command.privates.handleAppendTextRequired.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -m 0 -D foo').addBatch({
    'Parsing>>>': {
        'when "jfdi -m 0 -D foo" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-m' &&
                    args[3] ==='0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === 'today' &&
                    args.length === 7;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi -m 0 -D foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -m 0 -D foo" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppend');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppend.calledOnce;

                teardown(function() {command.privates.handleAppend.restore();});

                return expectation;
            },
            'it should append the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -m 0 -D foo today').addBatch({
    'Parsing>>>': {
        'when "jfdi -m 0 -D foo today" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-m' &&
                    args[3] ==='0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === 'today' &&
                    args.length === 7;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi -m 0 -D foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -m 0 -D foo today" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppend');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppend.calledOnce;

                teardown(function() {command.privates.handleAppend.restore();});

                return expectation;
            },
            'it should append the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -m 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -m 0 tomorrow" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-m' &&
                    args[3] ==='0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi -m 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -m 0 tomorrow" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppendIncorrectRealm');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppendIncorrectRealm.calledOnce;

                teardown(function() {command.privates.handleAppendIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -m 0 -D foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -m 0 -D foo tomorrow" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-m' &&
                    args[3] ==='0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === 'tomorrow' &&
                    args.length === 7;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi -m 0 -D foo tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -m 0 -D foo tomorrow" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppendIncorrectRealm');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppendIncorrectRealm.calledOnce;

                teardown(function() {command.privates.handleAppendIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --append 0').addBatch({
    'Parsing>>>': {
        'when "jfdi --append 0" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--append' &&
                    args[3] ==='0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --append 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --append 0" is called': {
            topic: function() {

                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppendTextRequired');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppendTextRequired.calledOnce;

                teardown(function() {command.privates.handleAppendTextRequired.restore();});



                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --append 0 -D foo').addBatch({
    'Parsing>>>': {
        'when "jfdi --append 0 -D foo" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--append' &&
                    args[3] ==='0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === 'today' &&
                    args.length === 7;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --append 0 -D foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --append 0 -D foo" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppend');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppend.calledOnce;

                teardown(function() {command.privates.handleAppend.restore();});

                return expectation;
            },
            'it should append the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --append 0 -D foo today').addBatch({
    'Parsing>>>': {
        'when "jfdi --append 0 -D foo today" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--append' &&
                    args[3] ==='0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === 'today' &&
                    args.length === 7;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --append 0 -D foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --append 0 -D foo today" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppend');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppend.calledOnce;

                teardown(function() {command.privates.handleAppend.restore();});

                return expectation;
            },
            'it should append the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --append 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --append 0 tomorrow" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--append' &&
                    args[3] ==='0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --append 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --append 0 tomorrow" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppendIncorrectRealm');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppendIncorrectRealm.calledOnce;

                teardown(function() {command.privates.handleAppendIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --append 0 -D foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --append 0 -D foo tomorrow" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--append' &&
                    args[3] ==='0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === 'tomorrow' &&
                    args.length === 7;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --append 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --append 0 -D foo tomorrow" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppendIncorrectRealm');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppendIncorrectRealm.calledOnce;

                teardown(function() {command.privates.handleAppendIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -m 0 --text foo').addBatch({
    'Parsing>>>': {
        'when "jfdi -m 0 --text foo" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-m' &&
                    args[3] ==='0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === 'today' &&
                    args.length === 7;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi -m 0 --text foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -m 0 --text foo" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppend');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppend.calledOnce;

                teardown(function() {command.privates.handleAppend.restore();});

                return expectation;
            },
            'it should append the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -m 0 --text foo today').addBatch({
    'Parsing>>>': {
        'when "jfdi -m 0 --text foo today" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-m' &&
                    args[3] ==='0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === 'today' &&
                    args.length === 7;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi -m 0 --text foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -m 0 --text foo today" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppend');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppend.calledOnce;

                teardown(function() {command.privates.handleAppend.restore();});

                return expectation;
            },
            'it should append the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -m 0 --text foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -m 0 --text foo tomorrow" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-m' &&
                    args[3] ==='0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === 'tomorrow' &&
                    args.length === 7;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi -m 0 --text foo tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -m 0 --text foo tomorrow" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppendIncorrectRealm');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppendIncorrectRealm.calledOnce;

                teardown(function() {command.privates.handleAppendIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --append 0 --text foo').addBatch({
    'Parsing>>>': {
        'when "jfdi --append 0 --text foo" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--append' &&
                    args[3] ==='0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === 'today' &&
                    args.length === 7;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --append 0 --text foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --append 0 --text foo" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppend');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppend.calledOnce;

                teardown(function() {command.privates.handleAppend.restore();});

                return expectation;
            },
            'it should append the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --append 0 --text foo today').addBatch({
    'Parsing>>>': {
        'when "jfdi --append 0 --text foo today" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--append' &&
                    args[3] ==='0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === 'today' &&
                    args.length === 7;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --append 0 --text foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --append 0 --text foo today" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppend');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppend.calledOnce;

                teardown(function() {command.privates.handleAppend.restore();});

                return expectation;
            },
            'it should append the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --append 0 --text foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --append 0 --text foo tomorrow" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--append' &&
                    args[3] ==='0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === 'tomorrow' &&
                    args.length === 7;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --append 0 --text foo tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --append 0 --text foo tomorrow" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleAppendIncorrectRealm');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAppendIncorrectRealm.calledOnce;

                teardown(function() {command.privates.handleAppendIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);
