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

vows.describe('jfdi -f lorem').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                helper.teardown(function() {command.privates.handleQuery.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleQuery');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                helper.teardown(function() {command.privates.handleQuery.restore();});

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);
