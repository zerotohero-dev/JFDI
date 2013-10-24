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

vows.describe('jfdi -f lorem').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                teardown(function() {command.privates.handleQuery.restore();});

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
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

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
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                teardown(function() {command.privates.handleQuery.restore();});

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);
