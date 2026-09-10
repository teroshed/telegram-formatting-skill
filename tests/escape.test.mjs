import {test} from 'node:test';
import assert from 'node:assert/strict';
import {htmlText,markdownV2Text,markdownV2Code,markdownV2LinkTarget} from '../skills/telegram-formatting/scripts/escape.mjs';
test('HTML user text cannot introduce tags or quote-delimited attributes',()=>{
  assert.equal(htmlText('<b title="x">&\' 🚀</b>'),'&lt;b title=&quot;x&quot;&gt;&amp;&#39; 🚀&lt;/b&gt;');
});
test('MarkdownV2 text escapes all reserved symbols including backslash',()=>{
  for(const character of '_*[]()~`>#+-=|{}.!\\')assert.equal(markdownV2Text(character),'\\'+character);
  assert.equal(markdownV2Text('hello עולם 🚀\nnext'),'hello עולם 🚀\nnext');
});
test('code and URL contexts only escape their own reserved characters',()=>{
  assert.equal(markdownV2Code('a_b ` c\\d'),'a_b \\` c\\\\d');
  assert.equal(markdownV2LinkTarget('https://example.com/a_(b)\\c'),'https://example.com/a_(b\\)\\\\c');
});
test('UTF-16 entity offsets include both halves of an astral emoji',()=>{
  const prefix='🚀 ';const text=prefix+'Ready';
  assert.equal(prefix.length,3);assert.equal(text.slice(prefix.length,prefix.length+5),'Ready');
});
