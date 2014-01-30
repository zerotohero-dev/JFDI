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
    display = require('../lib/display'),
    helper = require('./helper');

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -t').addBatch({
    'Parsing>>>': {
        'when "jfdi -t" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--list' &&
                    args[3] ==='tomorrow' &&
                    args.length === 4;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --list tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -t" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleTomorrow');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleTomorrow.calledOnce;

                helper.teardown(function() {command.handleTomorrow.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--list' &&
                    args[3] === 'tomorrow' &&
                    args.length === 4;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --list tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleTomorrow');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleTomorrow.calledOnce;

                helper.teardown(function() {command.handleTomorrow.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -l').addBatch({
    'Parsing>>>': {
        'when "jfdi -l" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-l' &&
                    args[3] === 'today' &&
                    args.length === 4;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -l today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -l" is called': {
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
            'it should list today\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --list').addBatch({
    'Parsing>>>': {
        'when "jfdi --list" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--list' &&
                    args[3] === 'today' &&
                    args.length === 4;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --list today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --list" is called': {
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
            'it should list today\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -l today').addBatch({
    'Parsing>>>': {
        'when "jfdi -l today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-l' &&
                    args[3] === 'today' &&
                    args.length === 4;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -l today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -l today" is called': {
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
            'it should list today\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --list today').addBatch({
    'Parsing>>>': {
        'when "jfdi --list today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--list' &&
                    args[3] ==='today' &&
                    args.length === 4;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --list today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --list today" is called': {
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
            'it should list today\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -l tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -l tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-l' &&
                    args[3] === 'tomorrow' &&
                    args.length === 4;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -l tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -l tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleTomorrow');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleTomorrow.calledOnce;

                helper.teardown(function() {command.handleTomorrow.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --list tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --list tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--list' &&
                    args[3] ==='tomorrow' &&
                    args.length === 4;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --list tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --list tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleTomorrow');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleTomorrow.calledOnce;

                helper.teardown(function() {command.handleTomorrow.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -t today').addBatch({
    'Parsing>>>': {
        'when "jfdi -t today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--list' &&
                    args[3] ==='tomorrow' &&
                    args.length === 4;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -t today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -t today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleTomorrow');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleTomorrow.calledOnce;

                helper.teardown(function() {command.handleTomorrow.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

// /*----------------------------------------------------------------------------*/

vows.describe('jfdi --tomorrow today').addBatch({
    'Parsing>>>': {
        'when "jfdi --tomorrow today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--list' &&
                    args[3] ==='tomorrow' &&
                    args.length === 4;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --tomorrow today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --tomorrow today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleTomorrow');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleTomorrow.calledOnce;

                helper.teardown(function() {command.handleTomorrow.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -t tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -t tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--list' &&
                    args[3] ==='tomorrow' &&
                    args.length === 4;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -t tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -t tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleTomorrow');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleTomorrow.calledOnce;

                helper.teardown(function() {command.handleTomorrow.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --tomorrow tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --tomorrow tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--list' &&
                    args[3] ==='tomorrow' &&
                    args.length === 4;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --tomorrow tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --tomorrow tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleTomorrow');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleTomorrow.calledOnce;

                helper.teardown(function() {command.handleTomorrow.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi today').addBatch({
    'Parsing>>>': {
        'when "jfdi today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === 'today' &&
                    args.length === 3;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi today" is called': {
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
            'it should list today\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === 'tomorrow' &&
                    args.length === 3;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleTomorrow');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleTomorrow.calledOnce;

                helper.teardown(function() {command.handleTomorrow.restore();});

                return expectation;
            },
            'it should list tomorrow\'s goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi all').addBatch({
    'Parsing>>>': {
        'when "jfdi all" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === 'all' &&
                    args.length === 3;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi all"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi all" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command, 'handleAll');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.handleAll.calledOnce;

                helper.teardown(function() {command.handleAll.restore();});

                return expectation;
            },
            'it should list all goals': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

vows.describe('jfdi -f foo tomorrow').addBatch({
    'Issue #27': {
        'when "jfdi -f foo tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {
                    sinon.stub(JFDI.privates, 'getGoals').returns([{index: 0, item: 'bazinga'}]);
                    sinon.stub(display, 'printQueryForTomorrow');
                });

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = display.printQueryForTomorrow.calledOnce;

                helper.teardown(function() {
                    JFDI.privates.getGoals.restore();
                    display.printQueryForTomorrow.restore();
                });

                return expectation;
            },
            'it should print "tomorrow" in the header': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);
