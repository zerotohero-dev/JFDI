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

// vows.describe('jfdi -t').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -t" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -t" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -l').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -l" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -l" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --list').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --list" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --list" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -l today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -l today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -l today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --list today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --list today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --list today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -l tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -l tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -l tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// ----------------------------------------------------------------------------

// vows.describe('jfdi --list tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --list tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --list tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -t today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -t today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -t today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --tomorrow today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --tomorrow today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --tomorrow today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -t tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -t tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -t tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --tomorrow tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --tomorrow tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --tomorrow tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);
