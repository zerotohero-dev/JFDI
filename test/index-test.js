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
var prompt = require('prompt');

var JFDI = require('../lib/JFDI');
var runtime = require('../lib/runtime');
var command = require('../lib/command');

var dummyBatch = {
    'when doing nothing': {
        topic: function() {
            return 42;
        },
        'nothing happens': function(topic) {
            assert.equal(topic, 42);
        }
    }
};

// To prevent corrupting real data.
JFDI.setDataRoot('');
// To prevent overriting data/.root
sinon.stub(fs, 'writeFileSync');

vows.describe('jfdi.sanitize').addBatch({
    'when ./data/.root is empty': {
        topic: function() {
            var sandbox, result, expectation;

            sandbox = sinon.sandbox.create();

            // So that we won't update the real .root file.
            sinon.stub(prompt, 'start');
            sinon.stub(prompt, 'get');

            result = JFDI.sanitize();

            expectation = !result && prompt.start.calledOnce;

            sandbox.restore();

            return expectation;
        },
        'user should be prompted': function(expectation) {
            assert.equal(expectation, true);
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo').addBatch({
    'Parsing': {
        'when "jfdi foo" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', 'foo'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;

                return expectation;
            },
            'it should translate to "jfdi --add foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution': {
        'when "jfdi foo" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                oldArgs = process.argv;

                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', 'foo'];

                runtime.initialize();

                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo bar').addBatch({
    'Parsing': {
        'when "jfdi foo bar" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution': {
        'when "jfdi foo bar" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo bar baz').addBatch({
    'Parsing': {
        'when "jfdi foo bar baz" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar', 'baz'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar baz' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar baz\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution': {
        'when "jfdi foo bar" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar', 'baz'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -a foo').addBatch({
    'Parsing': {
        'when "jfdi -a foo" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-a', 'foo'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-a' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;

                return expectation;
            },
            'it should translate to "jfdi -a \'foo\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution': {
        'when "jfdi -a foo" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', '-a', 'foo'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --add foo').addBatch({
    'Parsing': {
        'when "jfdi --add foo" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--add', 'foo'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;

                return expectation;
            },
            'it should translate to "jfdi --add \'foo\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution': {
        'when "jfdi -add foo" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', '--add', 'foo'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo today').addBatch({
    'Parsing': {
        'when "jfdi foo today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', 'foo', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;

                return expectation;
            },
            'it should translate to "jfdi --add \'foo\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution': {
        'when "jfdi foo today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', 'foo', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo bar today').addBatch({
    'Parsing': {
        'when "jfdi foo bar today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution': {
        'when "jfdi foo today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo bar baz today').addBatch({
    'Parsing': {
        'when "jfdi foo bar baz today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar', 'baz', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar baz' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar baz\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution': {
        'when "jfdi foo today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar', 'baz', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// -a foo today

/*----------------------------------------------------------------------------*/

// -a foo bar today

/*----------------------------------------------------------------------------*/

// -a foo bar baz today

/*----------------------------------------------------------------------------*/

// -add foo today

/*----------------------------------------------------------------------------*/

// --add foo bar today

/*----------------------------------------------------------------------------*/

// --add foo bar baz today

/*----------------------------------------------------------------------------*/

// foo tomorrow

/*----------------------------------------------------------------------------*/

// -a foo tomorrow

/*----------------------------------------------------------------------------*/

// -add foo tomorrow

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi 0').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi 0 tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -x 0').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -x 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -x 0 tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --do 0').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --do 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --do 0 tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -d 0').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -d 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -d 0 tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --defer 0').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --defer 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --defer 0 tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -e 0').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -e 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -e 0 tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --expedite 0').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --expedite 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --expedite 0 tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem ipsum').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem ipsum dolor').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem ipsum').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem ipsum dolor').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem ipsum today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem ipsum dolor today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem ipsum today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem ipsum dolor today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem ipsum tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem ipsum dolor tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem ipsum tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem ipsum dolor tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -p 0').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -p 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -p 0 tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prioritize 0').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prioritize 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prioritize 0 tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -t').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -t today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --tomorrow today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -t tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --tomorrow tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// jfdi -l

/*----------------------------------------------------------------------------*/

// jfdi --list

/*----------------------------------------------------------------------------*/

// jfdi -l today

/*----------------------------------------------------------------------------*/

// jfdi --list today

/*----------------------------------------------------------------------------*/

// jfdi -l tomorrow

/*----------------------------------------------------------------------------*/

// jfdi --list tomorrow

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -bogus').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --bogus').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -h').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --help').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -V').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --version').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -a').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --add').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -a today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -a tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --add today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --add tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -p').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -prioritize').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -p today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -prioritize today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -p tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -prioritize tomorrow').addBatch(dummyBatch).export(module);



