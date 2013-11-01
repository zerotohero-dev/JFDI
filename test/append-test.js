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

// var vows = require('vows'),
//     assert = require('assert'),
//     sinon = require('sinon'),
//     fs = require('fs'),
//     program = require('commander');

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -m 0').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -m 0" is called': {
//             topic: function() {
//                 var expectation;

//                 return expectation;
//             },
//             'it should translate to "jfdi -m 0 today"': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -m 0" is called': {
//             topic: function() {
//                 var expectation;

//                 return expectation;
//             },
//             'it should add a new task to today': function(expectation) {
//                 assert.equal(expectation, true);
//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -m 0 -D foo').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -m 0 -D foo" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -m 0 -D foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -m 0 -D foo today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -m 0 -D foo today" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -m 0 -D foo today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -m 0 tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -m 0 tomorrow" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -m 0 tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -m 0 -D foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -m 0 -D foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -m 0 -D foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --append 0').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --append 0" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --append 0" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --append 0 -D foo').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --append 0 -D foo" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --append 0 -D foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --append 0 -D foo today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --append 0 -D foo today" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --append 0 -D foo today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --append 0 tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --append 0 tomorrow" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --append 0 tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --append 0 -D foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --append 0 -D foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --append 0 -D foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -m 0 --text foo').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -m 0 --text foo" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -m 0 --text foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -m 0 --text foo today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -m 0 --text foo today" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -m 0 --text foo today" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -m 0 --text foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -m 0 --text foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -m 0 --text foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --append 0 --text foo').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --append 0 --text foo" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --append 0 --text foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --append 0 --text foo today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --append 0 --text foo today" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --append 0 --text foo today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --append 0 --text foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --append 0 --text foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --append 0 --text foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);


