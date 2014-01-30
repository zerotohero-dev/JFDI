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

vows.describe('jfdi -r 0').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceTextRequired');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceTextRequired.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceTextRequired.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -D foo').addBatch({
    'Parsing>>>': {
        'when "jfdi -D foo" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-D' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -D foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -D foo" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it should execute the default fallback and list today\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -w bar').addBatch({
    'Parsing>>>': {
        'when "jfdi -w bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-w' &&
                    args[3] === 'bar' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -w bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it should execute the default callback': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -D foo -w bar').addBatch({
    'Parsing>>>': {
        'when "jfdi -D foo -w bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-D' &&
                    args[3] === 'foo' &&
                    args[4] === '-w' &&
                    args[5] === 'bar' &&
                    args[6] === 'today' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -D foo -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -D foo -w bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it should execute the default callback': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 -D foo').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 -D foo" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === 'today' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 -D foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 -D foo" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceAlternateRequired');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceAlternateRequired.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceAlternateRequired.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// TODO: add to documentation, the first command is important, other paramaters
// are applied by looking at the first command.

vows.describe('jfdi -r 0 -w bar').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 -w bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '-w' &&
                    args[5] === 'bar' &&
                    args[6] === 'today' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 -w bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceTextRequired');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceTextRequired.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceTextRequired.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 -D foo -w bar').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 -D foo -w bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 -D foo -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 -D foo -w bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 -D foo -w bar tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 -D foo -w bar tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'tomorrow' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 -D foo -w bar tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 -D foo -w bar tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                     args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -D foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -D foo tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-D' &&
                    args[3] === 'foo' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -D foo tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -D foo tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -w bar tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -w bar tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-w' &&
                    args[3] === 'bar' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -w bar tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -w bar tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -D foo -w bar tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -D foo -w bar tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-D' &&
                    args[3] === 'foo' &&
                    args[4] === '-w' &&
                    args[5] === 'bar' &&
                    args[6] === 'tomorrow' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -D foo -w bar tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -D foo -w bar tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 -D foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 -D foo tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === 'tomorrow' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 -D foo tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 -D foo tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 -w bar tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 -w bar tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '-w' &&
                    args[5] === 'bar' &&
                    args[6] === 'tomorrow' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 -w bar tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 -w bar tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceTextRequired');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceTextRequired.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceTextRequired.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 -D foo').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 -D foo" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === 'today' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 -D foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 -D foo" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceAlternateRequired');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceAlternateRequired.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceAlternateRequired.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 -w bar').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 -w bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '-w' &&
                    args[5] === 'bar' &&
                    args[6] === 'today' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 -w bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceTextRequired');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceTextRequired.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceTextRequired.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 -D foo -w bar').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 -D foo -w bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 -D foo -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 -D foo -w bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 -D foo -w bar tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 -D foo -w bar tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'tomorrow' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 -D foo -w bar tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 -D foo -w bar tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 -D foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 -D foo tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === 'tomorrow' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 -D foo tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 -D foo tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 -w bar tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 -w bar tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '-w' &&
                    args[5] === 'bar' &&
                    args[6] === 'tomorrow' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 -w bar tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 -w bar tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --text foo').addBatch({
    'Parsing>>>': {
        'when "jfdi --text foo" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--text' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --text foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --text foo" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it should list today\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --text foo -w bar').addBatch({
    'Parsing>>>': {
        'when "jfdi --text foo -w bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--text' &&
                    args[3] === 'foo' &&
                    args[4] === '-w' &&
                    args[5] === 'bar' &&
                    args[6] === 'today' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --text foo -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --text foo -w bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it should list today\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 --text foo').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 --text foo" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === 'today' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 --text foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 --text foo" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceAlternateRequired');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceAlternateRequired.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceAlternateRequired.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 -w bar').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 -w bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '-w' &&
                    args[5] === 'bar' &&
                    args[6] === 'today' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 -w bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceTextRequired');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceTextRequired.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceTextRequired.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 --text foo -w bar').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 --text foo -w bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 --text foo -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 --text foo -w bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 --text foo -w bar tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 --text foo -w bar tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'tomorrow' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 --text foo -w bar tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 --text foo -w bar tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --text foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --text foo tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--text' &&
                    args[3] === 'foo' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --text foo tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --text foo tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --text foo -w bar tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --text foo -w bar tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--text' &&
                    args[3] === 'foo' &&
                    args[4] === '-w' &&
                    args[5] === 'bar' &&
                    args[6] === 'tomorrow' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --text foo -w bar tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --text foo -w bar tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 --text foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 --text foo tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === 'tomorrow' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 --text foo tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 --text foo tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --with bar').addBatch({
    'Parsing>>>': {
        'when "" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--with' &&
                    args[3] === 'bar' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --with bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --with bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it should list today\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -D foo --with bar').addBatch({
    'Parsing>>>': {
        'when "jfdi -D foo --with bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-D' &&
                    args[3] === 'foo' &&
                    args[4] === '--with' &&
                    args[5] === 'bar' &&
                    args[6] === 'today' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -D foo --with bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -D foo --with bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it should list today\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 --with bar').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 --with bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '--with' &&
                    args[5] === 'bar' &&
                    args[6] === 'today' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 --with bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 --with bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceTextRequired');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceTextRequired.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceTextRequired.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 -D foo --with bar').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 -D foo --with bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '--with' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 -D foo --with bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 -D foo --with bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 -D foo --with bar tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 -D foo --with bar tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '--with' &&
                    args[7] === 'bar' &&
                    args[8] === 'tomorrow' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 -D foo --with bar tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 -D foo --with bar tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --with bar tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --with bar tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--with' &&
                    args[3] === 'bar' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --with bar tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --with bar tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -D foo --with bar tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -D foo --with bar tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-D' &&
                    args[3] === 'foo' &&
                    args[4] === '--with' &&
                    args[5] === 'bar' &&
                    args[6] === 'tomorrow' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -D foo --with bar tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -D foo --with bar tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleDefault');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefault.calledOnce;

                helper.teardown(function() {command.privates.handleDefault.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 --with bar tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 --with bar tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '--with' &&
                    args[5] === 'bar' &&
                    args[6] === 'tomorrow' &&
                    args.length === 7;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 --with bar tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 --with bar tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplaceIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplaceIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleReplaceIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 -D foo -w bar').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 -D foo -w bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 -D foo -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 -D foo -w bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 -D foo -w bar today').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 -D foo -w bar today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 -D foo -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 -D foo -w bar today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 -D foo -w bar').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 -D foo -w bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 -D foo -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 -D foo -w bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 -D foo -w bar today').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 -D foo -w bar today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 -D foo -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 -D foo -w bar today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 --text foo -w bar').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 --text foo -w bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 --text foo -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 --text foo -w bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 --text foo -w bar today').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 --text foo -w bar today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 --text foo -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 --text foo -w bar today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 -D foo --with bar').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 -D foo --with bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '--with' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 -D foo --with bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 -D foo --with bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 -D foo --with bar today').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 -D foo --with bar today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '--with' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 -D foo --with bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 -D foo --with bar today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 --text foo -w bar').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 --text foo -w bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 --text foo -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 --text foo -w bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 --text foo -w bar today').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 --text foo -w bar today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === '-w' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 --text foo -w bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 --text foo -w bar today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 -D foo --with bar').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 -D foo --with bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '--with' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 -D foo --with bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 -D foo --with bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 -D foo --with bar today').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 -D foo --with bar today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '-D' &&
                    args[5] === 'foo' &&
                    args[6] === '--with' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 -D foo --with bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 -D foo --with bar today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 --text foo --with bar').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 --text foo --with bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === '--with' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 --text foo --with bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 --text foo --with bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -r 0 --text foo --with bar today').addBatch({
    'Parsing>>>': {
        'when "jfdi -r 0 --text foo --with bar today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-r' &&
                    args[3] === '0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === '--with' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -r 0 --text foo --with bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -r 0 --text foo --with bar today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 --text foo --with bar').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 --text foo --with bar" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === '--with' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 --text foo --with bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 --text foo --with bar" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --replace 0 --text foo --with bar today').addBatch({
    'Parsing>>>': {
        'when "jfdi --replace 0 --text foo --with bar today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--replace' &&
                    args[3] === '0' &&
                    args[4] === '--text' &&
                    args[5] === 'foo' &&
                    args[6] === '--with' &&
                    args[7] === 'bar' &&
                    args[8] === 'today' &&
                    args.length === 9;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --replace 0 --text foo --with bar today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --replace 0 --text foo --with bar today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleReplace');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleReplace.calledOnce;

                helper.teardown(function() {command.privates.handleReplace.restore();});

                return expectation;
            },
            'it should replace the text': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);
