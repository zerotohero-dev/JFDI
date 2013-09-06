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

// To prevent overwriting data/.root.
sinon.stub(fs, 'writeFileSync');

// To prevent "resource not found " errors.
sinon.stub(fs, 'readFileSync', function(path) {
    return path;
});

// To prevent corrupting real data.
JFDI.setDataRoot('');

function resetProgramState() {
    delete program.add;
    delete program.find;
    delete program.defer;
    delete program.expedite;
    delete program.prioritize;
    delete program['do'];
}

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -bogus').addBatch(dummyBatch).export(module);
// vows.describe('jfdi --bogus').addBatch(dummyBatch).export(module);
// vows.describe('jfdi -a').addBatch(dummyBatch).export(module);
// vows.describe('jfdi --add').addBatch(dummyBatch).export(module);
// vows.describe('jfdi -a today').addBatch(dummyBatch).export(module);
// vows.describe('jfdi -a tomorrow').addBatch(dummyBatch).export(module);
// vows.describe('jfdi --add today').addBatch(dummyBatch).export(module);
// vows.describe('jfdi --add tomorrow').addBatch(dummyBatch).export(module);
// vows.describe('jfdi -f').addBatch(dummyBatch).export(module);
// vows.describe('jfdi --find').addBatch(dummyBatch).export(module);
// vows.describe('jfdi -f today').addBatch(dummyBatch).export(module);
// vows.describe('jfdi --find today').addBatch(dummyBatch).export(module);
// vows.describe('jfdi -f tomorrow').addBatch(dummyBatch).export(module);
// vows.describe('jfdi --find tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// Global teardown.
fs.writeFileSync.restore();
fs.readFileSync.restore();
