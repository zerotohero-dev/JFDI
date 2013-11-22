'use strict';

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

/**
 * Logs the parameter to the console.
 * @param  {Object} stuff - item to be logged.
 */
exports.log = function(stuff) {
    console.log(stuff);
};

/**
 * Does nothing in production mode.
 * In development mode works identical to `exports.log`.
 */
exports.info = function(stuff) {
    void stuff;
    //console.info(stuff);
};
