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

// To prevent overwriting data/.root.
sinon.stub(fs, 'writeFileSync');

// To prevent "resource not found " errors.
sinon.stub(fs, 'readFileSync', function(path) {
    return path;
});

// To prevent corrupting real data.
JFDI.setDataRoot('');

function resetProgramState() {
    delete program.add;
    delete program.find;
    delete program.defer;
    delete program.expedite;
    delete program.prioritize;
    delete program['do'];
}

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -f lorem').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -f lorem today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -f lorem" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -f lorem ipsum').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem ipsum" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -f \'lorem ipsum\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -f lorem ipsum" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -f lorem ipsum dolor').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem ipsum dolor" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum', 'dolor'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -f \'lorem ipsum dolor\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -f lorem ipsum dolor" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum', 'dolor'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --find lorem').addBatch({
    'Parsing>>>': {
        'when "jfdi --find lorem" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --find \'lorem\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --find lorem" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --find lorem ipsum').addBatch({
    'Parsing>>>': {
        'when "jfdi --find lorem ipsum" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --find \'lorem ipsum\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --find lorem ipsum" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --find lorem ipsum dolor').addBatch({
    'Parsing>>>': {
        'when "jfdi --find lorem ipsum" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum', 'dolor'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --find \'lorem ipsum dolor\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --find lorem ipsum dolor" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum', 'dolor'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -f lorem today').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -f \'lorem\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -f lorem today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -f lorem ipsum today').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem ipsum today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -f \'lorem ipsum\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -f lorem ipsum today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -f lorem ipsum dolor today').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum', 'dolor', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -f \'lorem ipsum dolor\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -f lorem today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum', 'dolor', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --find lorem today').addBatch({
    'Parsing>>>': {
        'when "jfdi --find lorem today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --find \'lorem\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --find lorem today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --find lorem ipsum today').addBatch({
    'Parsing>>>': {
        'when "jfdi --find lorem ipsum today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --find \'lorem ipsum\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --find lorem ipsum today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --find lorem ipsum dolor today').addBatch({
    'Parsing>>>': {
        'when "jfdi --find lorem ipsum dolor today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum', 'dolor', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --find \'lorem ipsum dolor\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --find lorem ipsum dolor today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum', 'dolor', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -f lorem tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -f \'lorem\' tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -f lorem tomorrow" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'tomorrow'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -f lorem ipsum tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem ipsum tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -f \'lorem ipsum\' tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -f lorem ipsum tomorrow" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum', 'tomorrow'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -f lorem ipsum dolor tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem ipsum dolor tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum', 'dolor', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -f \'lorem ipsum dolor\' tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -f lorem ipsum dolor tomorrow" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum', 'dolor', 'tomorrow'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --find lorem tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --find lorem tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --find \'lorem\' tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --find lorem tomorrow" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'tomorrow'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --find lorem ipsum tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --find lorem ipsum tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --find \'lorem ipsum\' tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --find lorem ipsum tomorrow" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum', 'tomorrow'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --find lorem ipsum dolor tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --find lorem ipsum dolor tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum', 'dolor', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --find \'lorem ipsum dolor\' tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --find lorem ipsum dolor tomorrow" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum', 'dolor', 'tomorrow'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// Global teardown.
fs.writeFileSync.restore();
fs.readFileSync.restore();
