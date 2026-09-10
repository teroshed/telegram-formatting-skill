# Delivery formats

Checked 10.09.2026. This is a routing guide; linked primary documentation owns exact schemas and eligibility.

## Ordinary Bot API messages

Choose explicit entities, HTML, or MarkdownV2. Basic styles include bold, italic, underline, strike, spoilers, quotes, links and code. Ordinary `sendMessage` accepts 1–4096 characters after parsing. Do not combine an entity pipeline with a parse mode. Keep code styles isolated and quotations unnested. HTML is a supported tag subset, not browser HTML: use newline characters, not layout tags or CSS. MarkdownV2 is not GitHub Markdown. Escape dynamic fragments in their specific text/code/link contexts. See the [official formatting reference](https://core.telegram.org/bots/api#formatting-options).

Original example, for an ordinary HTML bot payload:

```js
import { htmlText } from '../scripts/escape.mjs';
const text = `<b>Review ready</b>\nRequest <code>${htmlText(requestId)}</code>\n\n${htmlText(summary)}\n\n<b>Next:</b> Read the request, then decide.`;
const payload = { chat_id: verifiedDestination, text, parse_mode: 'HTML' };
```

This is a construction example, not an instruction to send it. Prefer an existing project's library abstraction.

## Explicit entities

Offsets and lengths count UTF-16 code units. JavaScript string `.length` matches that unit; spreading a string counts code points instead. Keep text and entities together through concatenation and slicing. Trim whitespace from styled spans while retaining it in later offsets. [Telegram entity encoding](https://core.telegram.org/api/entities).

Example: in `🚀 Ready`, `Ready` starts at offset 3 and has length 5. The emoji occupies two UTF-16 units, followed by one space. A sliced or prefixed message needs adjusted offsets.

## GramIO

Use `format`, `bold`, `code`, and `join` to preserve entities. Interpolating a formatted object into an ordinary string or joining it with native array `.join()` loses formatting. Pass the formatted object directly to send/edit methods, without `parse_mode`. Check installed exports before relying on newer helpers. [GramIO documentation](https://gramio.dev/formatting).

```ts
import { format, bold, code } from 'gramio';
const message = format`${bold('Review ready')} · ${code(requestId)}\n\n${summary}\n\nRead the request, then decide.`;
// Pass message directly to the existing authorized send/edit path.
```

## Telegram Web composer

Use native formatting or clipboard HTML paired with matching plain text. This is not the Bot API parser. In initial Web K trials, block `div` elements preserved spacing, and a monospace font span survived clipboard conversion. Bare `br` HTML via a convenience paste wrapper did not. Inspect the draft before sending; see [observations](client-tests.md). Do not copy these clipboard layout tags into ordinary Bot API HTML.

## Newer features

The current API separately documents `sendRichMessage` with HTML, Markdown or block content, including headings, tables and collapsible sections. Do not claim these exist in ordinary `sendMessage` HTML. Rich Messages, date-time entities and custom emoji require fresh method/client/eligibility checks; they were not tested in this repository's initial trials. [Rich Message documentation](https://core.telegram.org/bots/api#rich-messages), [date-time formatting](https://core.telegram.org/bots/api#date-time-entity-formatting).
