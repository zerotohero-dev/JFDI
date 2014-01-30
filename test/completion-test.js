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

vows.describe('jfdi 0').addBatch({
    'Parsing>>>': {
        'when "jfdi 0" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleComplete');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                helper.teardown(function() {command.privates.handleComplete.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleComplete');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                helper.teardown(function() {command.privates.handleComplete.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleCompleteIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleCompleteIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleCompleteIncorrectRealm.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-x' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleComplete');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                helper.teardown(function() {command.privates.handleComplete.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-x' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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
                helper.setup(function() {sinon.stub(command.privates, 'handleComplete');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                helper.teardown(function() {command.privates.handleComplete.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-x' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleCompleteIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleCompleteIncorrectRealm.calledOnce;

                // Teardown.
                helper.teardown(function() {command.privates.handleCompleteIncorrectRealm.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleCompleteIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleCompleteIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handleCompleteIncorrectRealm.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handleComplete');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                helper.teardown(function() {command.privates.handleComplete.restore();});

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

vows.describe('jfdi 0').addBatch({
    'Issue #33': {
        'when "jfdi 0" is called': {
            topic: function() {
                var expectation = false;

                helper.setup(function(){
                    sinon.stub(JFDI.privates, 'getTodayGoals').returns([{item: 'bazinga'}]);
                    sinon.stub(JFDI.privates, 'persistTodayGoals');
                    sinon.stub(JFDI.privates, 'appendDoneGoals', function(item) {
                        expectation = item.indexOf('bazinga') > -1;
                    });
                });

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                helper.teardown(function(){
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
