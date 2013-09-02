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

var vows = require('vows'),
    assert = require('assert');

var dummyBatch = {
    'when doing nothing': {
        topic: function() {
            return 42;
        },
        'nothing happens': function(topic) {
            assert.equal(topic, 42);
        }
    }
};

vows.describe('jfdi.sanitize').addBatch(dummyBatch).export(module);
vows.describe('jfdi foo').addBatch(dummyBatch).export(module);
vows.describe('jfdi foo bar').addBatch(dummyBatch).export(module);
vows.describe('jfdi foo bar baz').addBatch(dummyBatch).export(module);
vows.describe('jfdi -a "foo"').addBatch(dummyBatch).export(module);
vows.describe('jfdi -add "foo"').addBatch(dummyBatch).export(module);
vows.describe('jfdi foo today').addBatch(dummyBatch).export(module);
vows.describe('jfdi foo bar today').addBatch(dummyBatch).export(module);
vows.describe('jfdi foo bar baz today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -a "foo" today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -add "foo" today').addBatch(dummyBatch).export(module);
vows.describe('jfdi foo tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi foo bar tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi foo bar baz tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -a "foo" tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -add "foo" tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi 0').addBatch(dummyBatch).export(module);
vows.describe('jfdi 1').addBatch(dummyBatch).export(module);
vows.describe('jfdi 0 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi 1 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi 0 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi 1 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -x 0').addBatch(dummyBatch).export(module);
vows.describe('jfdi -x 1').addBatch(dummyBatch).export(module);
vows.describe('jfdi -x 0 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -x 1 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -x 0 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -x 1 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 1').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 1 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 1 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -d 0').addBatch(dummyBatch).export(module);
vows.describe('jfdi -d 1').addBatch(dummyBatch).export(module);
vows.describe('jfdi -d 0 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -d 1 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -d 0 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -d 1 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --defer 0').addBatch(dummyBatch).export(module);
vows.describe('jfdi --defer 1').addBatch(dummyBatch).export(module);
vows.describe('jfdi --defer 0 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --defer 1 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --defer 0 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --defer 1 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -e 0').addBatch(dummyBatch).export(module);
vows.describe('jfdi -e 1').addBatch(dummyBatch).export(module);
vows.describe('jfdi -e 0 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -e 1 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -e 0 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -e 1 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --expedite 0').addBatch(dummyBatch).export(module);
vows.describe('jfdi --expedite 1').addBatch(dummyBatch).export(module);
vows.describe('jfdi --expedite 0 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --expedite 1 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --expedite 0 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --expedite 1 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f lorem').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f lorem ipsum').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f lorem ipsum dolor').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f "lorem ipsum dolor"').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find lorem').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find lorem ipsum').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find lorem ipsum dolor').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find "lorem ipsum dolor"').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f lorem today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f lorem ipsum today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f lorem ipsum dolor today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f "lorem ipsum dolor" today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find lorem today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find lorem ipsum today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find lorem ipsum dolor today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find "lorem ipsum dolor" today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f lorem tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f lorem ipsum tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f lorem ipsum dolor tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f "lorem ipsum dolor" tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find lorem tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find lorem ipsum tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find lorem ipsum dolor tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find "lorem ipsum dolor" tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -p 0').addBatch(dummyBatch).export(module);
vows.describe('jfdi -p 1').addBatch(dummyBatch).export(module);
vows.describe('jfdi -p 0 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -p 1 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -p 0 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -p 1 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --prioritize 0').addBatch(dummyBatch).export(module);
vows.describe('jfdi --prioritize 1').addBatch(dummyBatch).export(module);
vows.describe('jfdi --prioritize 0 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --prioritize 1 today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --prioritize 0 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --prioritize 1 tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -t').addBatch(dummyBatch).export(module);
vows.describe('jfdi --tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -t today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --tomorrow today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -t tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --tomorrow tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi today').addBatch(dummyBatch).export(module);
vows.describe('jfdi tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -bogus').addBatch(dummyBatch).export(module);
vows.describe('jfdi --bogus').addBatch(dummyBatch).export(module);
vows.describe('jfdi -h').addBatch(dummyBatch).export(module);
vows.describe('jfdi --help').addBatch(dummyBatch).export(module);
vows.describe('jfdi -V').addBatch(dummyBatch).export(module);
vows.describe('jfdi --version').addBatch(dummyBatch).export(module);
vows.describe('jfdi -a').addBatch(dummyBatch).export(module);
vows.describe('jfdi --add').addBatch(dummyBatch).export(module);
vows.describe('jfdi -a today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -a tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --add today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --add tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -f tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --find tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -p').addBatch(dummyBatch).export(module);
vows.describe('jfdi -prioritize').addBatch(dummyBatch).export(module);
vows.describe('jfdi -p today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -prioritize today').addBatch(dummyBatch).export(module);
vows.describe('jfdi -p tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi -prioritize tomorrow').addBatch(dummyBatch).export(module);

