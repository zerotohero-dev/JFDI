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

// jfdi -M 0
// jfdi -M 0 -D foo
// jfdi -M 0 -D foo today
// jfdi -M 0 tomorrow
// jfdi -M 0 -D foo tomorrow

// jfdi --prepend 0
// jfdi --prepend 0 -D foo
// jfdi --prepend 0 -D foo today
// jfdi --prepend 0 tomorrow
// jfdi --prepend 0 -D foo tomorrow

// jfdi -M 0 --text foo
// jfdi -M 0 --text foo today
// jfdi -M 0 --text foo tomorrow

// jfdi --prepend 0 --text foo
// jfdi --prepend 0 --text foo today
// jfdi --prepend 0 --text foo tomorrow
