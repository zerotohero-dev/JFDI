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
    command = require('../lib/command'),
    helper = require('./helper');

/*----------------------------------------------------------------------------*/

//TODO: convert all tests to this format.
//TODO: the above functions are commonly shared; move them to a utility module.
helper.createVow(
    'jfdi foo',
    'it should translate to "jfdi --add foo today"',
    'it should add a new task to today',
    function() {
        return helper.createParseExpectation(this, function(args) {
            return args[2] === '--add' &&
                args[3] === 'foo' &&
                args[4] === 'today' &&
                args.length === 5;
        });
    },
    function() {
        return helper.createExecuteExpectation(this, 'handleToday');
    }
);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo bar').addBatch({
    'Parsing>>>': {
        'when "jfdi foo bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi foo bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleToday');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                helper.teardown(function() {command.handleToday.restore();});

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
    'Parsing>>>': {
        'when "jfdi foo bar baz" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar baz' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar baz\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi foo bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleToday');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                helper.teardown(function() {command.handleToday.restore();});

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
    'Parsing>>>': {
        'when "jfdi -a foo" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-a' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -a \'foo\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -a foo" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleToday');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                helper.teardown(function() {command.handleToday.restore();});

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
    'Parsing>>>': {
        'when "jfdi --add foo" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -add foo" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleToday');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                helper.teardown(function() {command.handleToday.restore();});

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
    'Parsing>>>': {
        'when "jfdi foo today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi foo today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleToday');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                helper.teardown(function() {command.handleToday.restore();});

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
    'Parsing>>>': {
        'when "jfdi foo bar today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi foo today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleToday');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                helper.teardown(function() {command.handleToday.restore();});

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
    'Parsing>>>': {
        'when "jfdi foo bar baz today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar baz' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar baz\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi foo today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleToday');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                helper.teardown(function() {command.handleToday.restore();});

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -a foo today').addBatch({
    'Parsing>>>': {
        'when "jfdi -a foo today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-a' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -a \'foo\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -a foo today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleToday');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                helper.teardown(function() {command.handleToday.restore();});

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -a foo bar today').addBatch({
    'Parsing>>>': {
        'when "jfdi -a foo bar today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-a' &&
                    args[3] === 'foo bar' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -a \'foo bar\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -a foo bar today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleToday');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                helper.teardown(function() {command.handleToday.restore();});

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -a foo bar baz today').addBatch({
    'Parsing>>>': {
        'when "jfdi -a foo bar baz today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-a' &&
                    args[3] === 'foo bar baz' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -a \'foo bar baz\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -a foo bar baz today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleToday');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                helper.teardown(function() {command.handleToday.restore();});

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --add foo today').addBatch({
    'Parsing>>>': {
        'when "jfdi --add foo today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --add foo today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleToday');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                helper.teardown(function() {command.handleToday.restore();});

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --add foo bar today').addBatch({
    'Parsing>>>': {
        'when "jfdi --add foo bar today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --add foo bar today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleToday');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                helper.teardown(function() {command.handleToday.restore();});

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --add foo bar baz today').addBatch({
    'Parsing>>>': {
        'when "jfdi --add foo bar baz today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar baz' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar baz\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --add foo bar baz today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleToday');});

                // Create the command.
                process.argv = ['node', '.', '--add', 'foo', 'bar', 'baz', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                helper.teardown(function() {command.handleToday.restore();});

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi foo tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo\' tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi foo tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleAdditionIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAdditionIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleAdditionIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn user about the incorrect behavior': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -a foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -a foo tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-a' &&
                    args[3] === 'foo' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -a \'foo\' tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -a foo tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleAdditionIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAdditionIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleAdditionIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn user about the incorrect behavior': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --add foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --add foo tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo\' tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --add foo tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleAdditionIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAdditionIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleAdditionIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn user about the incorrect behavior': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);
