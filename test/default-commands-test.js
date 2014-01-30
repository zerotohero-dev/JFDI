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
    helper = require('./helper');

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -h').addBatch({
    'Parsing>>>': {
        'when "jfdi -h" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-h' &&
                    args.length === 3;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -h"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -h bazinga').addBatch({
    'Parsing>>>': {
        'when "jfdi -h bazinga" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-h' &&
                    args.length === 3;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -h"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --help').addBatch({
    'Parsing>>>': {
        'when "jfdi --help" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--help' &&
                    args.length === 3;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --help"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --help bazinga').addBatch({
    'Parsing>>>': {
        'when "jfdi --help bazinga" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--help' &&
                    args.length === 3;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --help"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -V').addBatch({
    'Parsing>>>': {
        'when "jfdi -V" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-V' &&
                    args.length === 3;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -V"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -V bazinga').addBatch({
    'Parsing>>>': {
        'when "jfdi -V bazinga" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-V' &&
                    args.length === 3;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -V"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --version').addBatch({
    'Parsing>>>': {
        'when "jfdi --version" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--version' &&
                    args.length === 3;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --version"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --version bazinga').addBatch({
    'Parsing>>>': {
        'when "jfdi --version bazinga" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--version' &&
                    args.length === 3;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --version"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);
