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

var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    fs = require('fs'),
    program = require('commander');

var JFDI = require('../../lib/JFDI'),
    runtime = require('../../lib/runtime'),
    command = require('../../lib/command');

var oldArguments;

/**
 *
 */
exports.resetState = function() {
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
};

/**
 *
 * @param [postSetup]
 */
exports.setup = function(postSetup) {
    oldArguments = process.argv;

    exports.resetState();

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
};

/**
 *
 * @param [preTeardown]
 */
exports.teardown = function(preTeardown) {
    if (preTeardown) {
        preTeardown();
    }

    fs.writeFileSync.restore();
    fs.readFileSync.restore();

    process.argv = oldArguments;

    exports.resetState();
};

/**
 *
 * @param test
 * @returns {Array}
 */
exports.getArgv = function(test) {
    return (
        (typeof test === 'string') ? test : test.suite.subject
        ).replace('jfdi', 'node .').split(/\s+/);
};

/**
 *
 * @param phrase
 * @param parsingExpectation
 * @param executionExpectation
 * @param parsingDelegate
 * @param executionDelegate
 */
exports.createVow = function(phrase, parsingExpectation, executionExpectation, parsingDelegate, executionDelegate) {
    var kParsing = 'Parsing>>>',
        kExecution = 'Execution>>>',
        kPhraseCalled = 'when "' + phrase + '" is called',
        evaluation = {};

    evaluation[kParsing] = {};
    evaluation[kParsing][kPhraseCalled] = {topic: parsingDelegate};
    evaluation[kParsing][kPhraseCalled][parsingExpectation] = function(expectation) {
        assert.equal(expectation, true);
    };

    evaluation[kExecution] = {};
    evaluation[kExecution][kPhraseCalled] = {topic: executionDelegate};
    evaluation[kParsing][kPhraseCalled][executionExpectation] = function(expectation) {
        assert.equal(expectation, true);
    };

    vows.describe(phrase).addBatch(evaluation).export(module);
};

/**
 *
 * @param context
 * @param expect
 * @returns {*}
 */
exports.createParseExpectation = function(context, expect) {
    var args, expectation;

    exports.setup();

    // Create the command.
    process.argv = exports.getArgv(context);

    runtime.initialize();

    args = process.argv;

    expectation = expect(args);

    exports.teardown();

    return expectation;
};

/**
 *
 * @param context
 * @param methodName
 * @returns {boolean}
 */
exports.createExecuteExpectation = function(context, methodName) {
    var expectation;

    setup(function() {sinon.stub(command, methodName);});

    // Create the command.
    process.argv = exports.getArgv(context);

    runtime.initialize();

    runtime.execute();

    expectation = command[methodName].calledOnce;

    exports.teardown(function() {command[methodName].restore();});

    return expectation;
};
