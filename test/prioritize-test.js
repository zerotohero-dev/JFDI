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

var vows = require('vows');
var assert = require('assert');
var sinon = require('sinon');
var fs = require('fs');
var program = require('commander');

var JFDI = require('../lib/JFDI');
var runtime = require('../lib/runtime');
var command = require('../lib/command');

var oldArguments;

function resetState() {
    delete program.add;
    delete program.find;
    delete program.defer;
    delete program.expedite;
    delete program.prioritize;
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

vows.describe('jfdi -p 0').addBatch({
    'parsing>>>': {
        'when "jfdi -p 0" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-p' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi -p 0 today".': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'execution>>>': {
        'when "jfdi -p 0" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handlePrioritize');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handlePrioritize.calledOnce;

                teardown(function() {command.privates.handlePrioritize.restore();});

                return expectation;
            },
            'it should prioritize the given task': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -p 0 today').addBatch({
    'parsing>>>': {
        'when "jfdi -p 0 today" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-p' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi -p 0 today".': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'execution>>>': {
        'when "jfdi -p 0 today" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handlePrioritize');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handlePrioritize.calledOnce;

                teardown(function() {command.privates.handlePrioritize.restore();});

                return expectation;
            },
            'it should prioritize the given task.': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --prioritize 0').addBatch({
    'parsing>>>': {
        'when "jfdi --prioritize 0" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--prioritize' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --prioritize 0 today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'execution>>>': {
        'when "jfdi --prioritize 0" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handlePrioritize');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handlePrioritize.calledOnce;

                teardown(function() {command.privates.handlePrioritize.restore();});

                return expectation;
            },
            'it should prioritize the given task.': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --prioritize 0 today').addBatch({
    'parsing>>>': {
        'when "jfdi --prioritize 0 today" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--prioritize' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translat to "jfdi --prioritize 0 today."': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'execution>>>': {
        'when "jfdi --prioritize 0 today" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handlePrioritize');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handlePrioritize.calledOnce;

                teardown(function() {command.privates.handlePrioritize.restore();});

                return expectation;
            },
            'it should prioritize the given task.': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --prioritize 0 tomorrow').addBatch({
    'parsing>>>': {
        'when "jfdi --prioritize 0 tomorrow" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--prioritize' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --prioritize 0 tomorrow".': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'execution>>>': {
        'when "jfdi --prioritize 0 tomorrow" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handlePrioritizeIncorrectRealm');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handlePrioritizeIncorrectRealm.calledOnce;

                teardown(function() {command.privates.handlePrioritizeIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user.': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -p 0 tomorrow').addBatch({
    'parsing>>>': {
        'when "jfdi -p 0 tomorrow" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-p' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should trasnlate to "jfdi -p tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'execution>>>': {
        'when "jfdi -p tomorrow" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handlePrioritizeIncorrectRealm');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handlePrioritizeIncorrectRealm.calledOnce;

                teardown(function() {command.privates.handlePrioritizeIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user.': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);
