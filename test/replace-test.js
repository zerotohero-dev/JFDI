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

// vows.describe('jfdi -r 0').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -D foo').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -D foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -D foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -w bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -D foo -w bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -D foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -D foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 -D foo').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 -D foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 -D foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 -w bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 -D foo -w bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 -D foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 -D foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 -D foo -w bar tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 -D foo -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 -D foo -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -D foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -D foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -D foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -w bar tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -D foo -w bar tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -D foo -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -D foo -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 -D foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 -D foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 -D foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 -w bar tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 -D foo').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 -D foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 -D foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 -w bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 -D foo -w bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 -D foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 -D foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 -D foo -w bar tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 -D foo -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 -D foo -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 -D foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 -D foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 -D foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 -w bar tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --text foo').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --text foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --text foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --text foo -w bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --text foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --text foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 --text foo').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 --text foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 --text foo" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 -w bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 --text foo -w bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 --text foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 --text foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 --text foo -w bar tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 --text foo -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 --text foo -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// ----------------------------------------------------------------------------

// vows.describe('jfdi --text foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --text foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --text foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --text foo -w bar tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --text foo -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --text foo -w bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 --text foo tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 --text foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 --text foo tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --with bar').addBatch({
//     'Parsing>>>': {
//         'when "" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -D foo --with bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -D foo --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -D foo --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 --with bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 -D foo --with bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 -D foo --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 -D foo --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 -D foo --with bar tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 -D foo --with bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 -D foo --with bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --with bar tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --with bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --with bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -D foo --with bar tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -D foo --with bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -D foo --with bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 --with bar tomorrow').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 --with bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 --with bar tomorrow" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 -D foo -w bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 -D foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 -D foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 -D foo -w bar today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 -D foo -w bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 -D foo -w bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 -D foo -w bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 -D foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 -D foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 -D foo -w bar today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 -D foo -w bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 -D foo -w bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 --text foo -w bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 --text foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 --text foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 --text foo -w bar today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 --text foo -w bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 --text foo -w bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 -D foo --with bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 -D foo --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 -D foo --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 -D foo --with bar today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 -D foo --with bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 -D foo --with bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 --text foo -w bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 --text foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 --text foo -w bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 --text foo -w bar today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 --text foo -w bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 --text foo -w bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 -D foo --with bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 -D foo --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 -D foo --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 -D foo --with bar today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 -D foo --with bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 -D foo --with bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 --text foo --with bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 --text foo --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 --text foo --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi -r 0 --text foo --with bar today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi -r 0 --text foo --with bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi -r 0 --text foo --with bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 --text foo --with bar').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 --text foo --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 --text foo --with bar" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);

// /*----------------------------------------------------------------------------*/

// vows.describe('jfdi --replace 0 --text foo --with bar today').addBatch({
//     'Parsing>>>': {
//         'when "jfdi --replace 0 --text foo --with bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     },
//     'Execution>>>': {
//         'when "jfdi --replace 0 --text foo --with bar today" is called': {
//             topic: function() {

//             },
//             'it': function(expectation) {

//             }
//         }
//     }
// }).export(module);
