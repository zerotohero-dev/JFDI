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
    runtime = require('../lib/runtime');//,
    //command = require('../lib/command');

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

// vows.describe('jfdi -M 0').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 -D foo').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 -D foo today').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 -D foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0 -D foo').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0 -D foo today').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// =---------------------------------------------------------------------------

// vows.describe('jfdi --prepend 0 tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0 -D foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 --text foo').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 --text foo today').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 --text foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0 --text foo').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0 --text foo today').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0 --text foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-m' &&
//                     args[3] ==='0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "".': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);
