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

function resetState() {
    delete program.add;
    delete program.find;
    delete program.defer;
    delete program.expedite;
    delete program.prioritize;
    delete program['do'];
}

var oldArguments;

// TODO: be DRY. those setup/teardown
// directives repeat in all tests, move them to a common module.
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

// vows.describe('jfdi -h').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -h" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-h' &&
//                     args.length === 3;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "jfdi --do 0 today"': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -h" is called': {
//             topic: function() {
//                 var expectation = true;

//                 // setup(function() {sinon.stub(command.privates, 'handleComplete');});

//                 // // Create the command.
//                 // process.argv = getArgv(this);

//                 // runtime.initialize();
//                 // runtime.execute();

//                 // expectation = command.privates.handleComplete.calledOnce;

//                 // teardown(function() {command.privates.handleComplete.restore();});

//                 return expectation;
//             },
//             'it should display help': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// vows.describe('jfdi --help').addBatch(dummyBatch).export(module);
// vows.describe('jfdi -V').addBatch(dummyBatch).export(module);
// vows.describe('jfdi --version').addBatch(dummyBatch).export(module);
