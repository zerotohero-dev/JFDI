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

// var vows = require('vows');

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 -D foo').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 -D foo today').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 -D foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0 -D foo').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0 -D foo today').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// ----------------------------------------------------------------------------

// vows.describe('jfdi --prepend 0 tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0 -D foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 --text foo').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 --text foo today').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -M 0 --text foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0 --text foo').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0 --text foo today').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prepend 0 --text foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it should translate to "".': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);
