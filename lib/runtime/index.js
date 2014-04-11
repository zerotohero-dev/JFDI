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

/**
 * @module runtime
 */

/**
 * @class runtime
 * @static
 */

var program = require('commander'),
    fs = require('fs');

var debug = require('../debug'),
    parse = require('../parsing').parseArguments,
    command = require('../command'),
    privates = require('./privates');


// #regioin PATCH https://github.com/visionmedia/commander.js/pull/209

/**
 * Output help information if necessary
 *
 * @param {Command} command to output help for
 * @param {Array} array of options to search for -h or --help
 * @api private
 */

function outputHelpIfNecessary(cmd, options) {
    options = options || [];
    for (var i = 0; i < options.length; i++) {
        if (options[i] == '--help' || options[i] == '-h') {
            cmd.outputHelp();
            process.exit(0);
        }
    }
}

program.constructor.prototype.action = function(fn){
    var self = this;
    this.parent.on(this._name, function(args, unknown){
        // Parse any so-far unknown options
        unknown = unknown || [],
        args = args || [];

        var parsed = self.parseOptions(unknown);

        // Output help if necessary
        outputHelpIfNecessary(self, parsed.unknown);

        // If there are still any unknown options, then we simply
        // die, unless someone asked for help, in which case we give it
        // to them, and then we die.
        if (parsed.unknown.length > 0) {
            self.unknownOption(parsed.unknown[0]);
        }

        // Leftover arguments need to be pushed back. Fixes issue #56
        if (parsed.args.length) args = parsed.args.concat(args);

        self._args.forEach(function(arg, i){
            if (arg.required && null == args[i]) {
                self.missingArgument(arg.name);
            }
        });

        // Always append ourselves to the end of the arguments,
        // to make sure we match the number of arguments the user
        // expects
        if (self._args.length) {
            args[self._args.length] = self;
        } else {
            args.push(self);
        }

        fn.apply(this, args);
    });
    return this;
};

// #endregion

/**
 * Initializes the runtime by looking at `process.argv`.
 *
 * @method initialize
 * @static
 * @final
 */
exports.initialize = function() {
    debug.info('runtime.initialize');

    // Raw arguments before parsing.
    debug.info(process.argv);

    // Note that `process.argv` is passed by ref.
    parse(process.argv);

    // Arguments after parsing.
    debug.info(process.argv);

    var packageJson = JSON.stringify({version: 'unknown'});

    if (fs.existsSync('package.json')) {
        packageJson = fs.readFileSync('package.json', 'utf8');

        // Unit tests.
        if (packageJson !== 'package.json') {
            program.version(JSON.parse(packageJson).version);
        }
    }

    privates.initializeProgramWithCommand(program, command);
};

/**
 * Executes the command associated with `process.argv`.
 */
exports.execute = function() {
    debug.info('runtime.execute');

    program.parse(process.argv);
};
