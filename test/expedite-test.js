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

function resetProgramState() {
    delete program.add;
    delete program.find;
    delete program.defer;
    delete program.expedite;
    delete program.prioritize;
    delete program['do'];
}

var oldArguments;

function setup(postSetup) {
    oldArguments = process.argv;

    resetProgramState();

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

    resetProgramState();
}

function getArgv(test) {
    return test.suite.subject.replace('jfdi', 'node .').split(/\s+/);
}

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -e 0').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -e 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -e 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -e 0 tomorrow" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-e' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                teardown();

                return expectation;
            },
            'it should translate to "jfdi -e 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -e 0 tomorrow" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleExpedite');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                runtime.execute();

                expectation = command.privates.handleExpedite.calledOnce;

                // Teardown.
                teardown(function() {command.privates.handleExpedite.restore();});

                return expectation;
            },
            'it should expedite the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --expedite 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --expedite 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --expedite 0 tomorrow" is called': {
            topic: function() {
                var args, expectation;

                setup();

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--expedite' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                teardown();

                return expectation;
            },
            'it should translate to "jfdi --expedite 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --expedite 0 tomorrow" is called': {
            topic: function() {
                var expectation;

                setup(function() {sinon.stub(command.privates, 'handleExpedite');});

                // Create the command.
                process.argv = getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleExpedite.calledOnce;

                teardown(function() {command.privates.handleExpedite.restore();});

                return expectation;
            },
            'it should expedite the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);
