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
    delete program.append;
    delete program.prepend;
    delete program.replace;
    delete program.text;
    delete program['with'];
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

// vows.describe('jfdi -d 0').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -d 0" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-d' &&
//                     args[3] === '0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "jfdi -d 0 today"': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -d 0" is called': {
//             topic: function() {
//                 var expectation;

//                 setup(function() {sinon.stub(command.privates, 'handleDefer');});

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();
//                 runtime.execute();

//                 expectation = command.privates.handleDefer.calledOnce;

//                 teardown(function() {command.privates.handleDefer.restore();});

//                 return expectation;
//             },
//             'it should complete the item': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -d 0 today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -d 0 today" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-d' &&
//                     args[3] === '0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "jfdi -d 0 today"': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -d 0 today" is called': {
//             topic: function() {
//                 var expectation;

//                 setup(function() {sinon.stub(command.privates, 'handleDefer');});

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();
//                 runtime.execute();

//                 expectation = command.privates.handleDefer.calledOnce;

//                 teardown(function() {command.privates.handleDefer.restore();});

//                 return expectation;
//             },
//             'it should complete the item': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -d 0 tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -d 0 tomorrow" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '-d' &&
//                     args[3] === '0' &&
//                     args[4] === 'tomorrow' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "jfdi -d 0 tomorrow"': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -d 0 tomorrow" is called': {
//             topic: function() {
//                 var expectation;

//                 setup(function() {sinon.stub(command.privates, 'handleDeferIncorrectRealm');});

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();
//                 runtime.execute();

//                 expectation = command.privates.handleDeferIncorrectRealm.calledOnce;

//                 teardown(function() {command.privates.handleDeferIncorrectRealm.restore();});

//                 return expectation;
//             },
//             'it should warn the user': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --defer 0 tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --defer 0 tomorrow" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '--defer' &&
//                     args[3] === '0' &&
//                     args[4] === 'tomorrow' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "jfdi --defer 0 tomorrow"': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --defer 0 tomorrow" is called': {
//             topic: function() {
//                 var expectation;

//                 setup(function() {sinon.stub(command.privates, 'handleDeferIncorrectRealm');});

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();
//                 runtime.execute();

//                 expectation = command.privates.handleDeferIncorrectRealm.calledOnce;

//                 teardown(function() {command.privates.handleDeferIncorrectRealm.restore();});

//                 return expectation;
//             },
//             'it should warn the user': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --defer 0').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --defer 0" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '--defer' &&
//                     args[3] === '0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "jfdi --defer 0 today"': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --defer 0" is called': {
//             topic: function() {
//                 var expectation;

//                 setup(function() {sinon.stub(command.privates, 'handleDefer');});

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();
//                 runtime.execute();

//                 expectation = command.privates.handleDefer.calledOnce;

//                 teardown(function() {command.privates.handleDefer.restore();});

//                 return expectation;
//             },
//             'it should complete the item': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --defer 0 today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --defer 0 today" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '--defer' &&
//                     args[3] === '0' &&
//                     args[4] === 'today' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "jfdi --defer 0 today"': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --defer 0 today" is called': {
//             topic: function() {
//                 var expectation;

//                 setup(function() {sinon.stub(command.privates, 'handleDefer');});

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();
//                 runtime.execute();

//                 expectation = command.privates.handleDefer.calledOnce;

//                 teardown(function() {command.privates.handleDefer.restore();});

//                 return expectation;
//             },
//             'it should complete the item': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// // vows.describe('jfdi --defer 0 tomorrow').addBatch(dummyBatch).export(module);
// vows.describe('jfdi --defer 0 tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --defer 0 tomorrow" is called': {
//             topic: function() {
//                 var args, expectation;

//                 setup();

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();

//                 args = process.argv;

//                 expectation = args[2] === '--defer' &&
//                     args[3] === '0' &&
//                     args[4] === 'tomorrow' &&
//                     args.length === 5;

//                 teardown();

//                 return expectation;
//             },
//             'it should translate to "jfdi --defer 0 tomorrow"': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --defer 0 tomorrow" is called': {
//             topic: function() {
//                 var expectation;

//                 setup(function() {sinon.stub(command.privates, 'handleDeferIncorrectRealm');});

//                 // Create the command.
//                 process.argv = getArgv(this);

//                 runtime.initialize();
//                 runtime.execute();

//                 expectation = command.privates.handleDeferIncorrectRealm.calledOnce;

//                 teardown(function() {command.privates.handleDeferIncorrectRealm.restore();});

//                 return expectation;
//             },
//             'it should warn the user': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);
