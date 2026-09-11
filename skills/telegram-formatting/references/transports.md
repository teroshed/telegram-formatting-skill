# Entity and framework delivery

Checked 11.09.2026. Use [syntax.md](syntax.md) for ordinary HTML/MarkdownV2 and client shortcuts; use [rich-messages.md](rich-messages.md) for the separate structured-message grammar.

## Ordinary bot payloads

Choose `entities` or `parse_mode`, keeping it consistent with the existing application. Ordinary `sendMessage` text is limited to 1–4096 characters after parsing; captions and other fields have their own limits. Split at meaningful boundaries and rebuild valid styles/entities for each part. Do not split already escaped markup by raw string length.

An HTML payload construction example, with local helper path relative to this reference:

~~~~js
import { htmlText } from '../scripts/escape.mjs';

const requestId = 'demo_a17c';
const summary = 'Compare A&B before choosing.';
const text = `<b>Review ready</b>\nRequest <code>${htmlText(requestId)}</code>\n\n${htmlText(summary)}`;
const payloadFor = (chatId) => ({ chat_id: chatId, text, parse_mode: 'HTML' });
// Construction only: pass a confirmed destination to the existing authorized send path.
~~~~

Source: [sendMessage](https://core.telegram.org/bots/api#sendmessage).

## Explicit entities and UTF-16

Entities annotate plain text. Do not include markup delimiters or also set `parse_mode`:

~~~~js
const text = '🚀 Ready';
const entities = [{ type: 'bold', offset: 3, length: 5 }];
const payloadFor = (chatId) => ({ chat_id: chatId, text, entities });
~~~~

The rocket occupies two UTF-16 code units and the space one, so bold starts at 3. JavaScript `.length` and `.slice()` use these units; `[...text]` counts code points instead. In Python, `len(text.encode("utf-16-le")) // 2` gives UTF-16 units.

Keep text and entities together through concatenation, prefixing, and slicing. Compute spans against the final plain string; trim trailing whitespace from a styled span while including intervening whitespace in later offsets. Avoid cutting a surrogate pair. Multiple code points can form one visible emoji, so neither glyph count nor UTF-8 byte count is an entity offset.

Check `offset >= 0`, `length > 0`, range within text, valid character boundaries, and [ordinary nesting rules](syntax.md#nesting-and-combinations). The unit is shared by MTProto and Bot API; their entity object schemas are not interchangeable.

Sources: [Telegram entity encoding](https://core.telegram.org/api/entities), [Bot API MessageEntity](https://core.telegram.org/bots/api#messageentity).

## GramIO helpers

When the project uses GramIO, keep formatted values as structured objects:

~~~~ts
import {
  format, bold, italic, underline, strikethrough, spoiler,
  code, pre, link, blockquote, expandableBlockquote, join,
} from 'gramio';

const items = ['First option', 'Second option'];
const message = format`${bold('Review ready')}
${italic('Read the short version')} — ${underline('before Friday')}
${strikethrough('Previous wording')}
${blockquote('A quoted observation')}
${expandableBlockquote('Extra explanation\nMore detail')}
${spoiler('Optional answer')}
${code('request_a17c')}
${pre('const ready = true;', 'js')}
${link('Open the notes', 'https://example.com/notes')}

${join(items, (item) => format`• ${bold(item)}`, '\n')}`;
// Pass message directly to the project's authorized GramIO send/edit path.
// Do not set parse_mode.
~~~~

`format` builds text plus entities and removes leading indentation. Use `formatSaveIndents` when indentation is intentional. `pre(text, language)` supplies the code-block language. `mention(label, user)` and `customEmoji(fallback, id)` cover their corresponding entities when needed.

Formatting is lost when a Formattable is interpolated into an ordinary template string, converted to a string, or combined with native array `.join()`. Embed it in another `format` template or use GramIO's `join` helper.

`htmlToFormattable` (`@gramio/format/html`) and `markdownToFormattable` (`@gramio/format/markdown`) are local converters, with `node-html-parser` and `marked` peer dependencies respectively. They do not activate Telegram Rich Messages: their documented heading conversion becomes bold, and lists become text prefixes. Standard Markdown input accepted by a converter does not become valid MarkdownV2 sent directly to Telegram. Malformed-input fallback to plain text can hide lost formatting; inspect the conversion when presentation matters.

Reuse installed helpers; check available exports before adopting newer ones. This skill does not require installing GramIO. Sources: [GramIO formatting](https://gramio.dev/formatting), [GramIO Rich Messages](https://gramio.dev/guides/rich-messages).

## Human-client clipboard route

Native client formatting and clipboard HTML conversion are separate from Bot API parsing. In the [initial Web K trials](client-tests.md), block `div` elements preserved spacing and a monospace font span survived clipboard conversion; a convenience paste wrapper using bare `br` elements did not. Provide matching plain text with clipboard HTML and inspect the resulting draft.

These are dated observations about one route. They do not permit `div`, arbitrary spans, or CSS in ordinary Bot API HTML, nor prove equivalent behavior in another Telegram client.
