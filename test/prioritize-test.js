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

vows.describe('jfdi -p 0').addBatch({
    'parsing>>>': {
        'when "jfdi -p 0" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-p' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handlePrioritize');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handlePrioritize.calledOnce;

                helper.teardown(function() {command.privates.handlePrioritize.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-p' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handlePrioritize');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handlePrioritize.calledOnce;

                helper.teardown(function() {command.privates.handlePrioritize.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--prioritize' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handlePrioritize');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handlePrioritize.calledOnce;

                helper.teardown(function() {command.privates.handlePrioritize.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--prioritize' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handlePrioritize');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handlePrioritize.calledOnce;

                helper.teardown(function() {command.privates.handlePrioritize.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--prioritize' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handlePrioritizeIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handlePrioritizeIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handlePrioritizeIncorrectRealm.restore();});

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

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-p' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

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

                helper.setup(function() {sinon.stub(command.privates, 'handlePrioritizeIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handlePrioritizeIncorrectRealm.calledOnce;

                helper.teardown(function() {command.privates.handlePrioritizeIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user.': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);
