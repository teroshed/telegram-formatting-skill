# Ordinary messages and client syntax

Checked against primary documentation and Desktop source on 11.09.2026. Examples are message source, before any additional JavaScript/JSON string escaping. Local escaping checks do not establish server or client rendering.

Contents: [client composer](#client-composer), [HTML](#bot-api-html), [MarkdownV2](#bot-api-markdownv2), [date and time](#date-and-time), [nesting](#nesting-and-combinations).

## Client composer

For a person typing into Telegram Desktop, these delimiter pairs are present in the inspected input-field implementation:

~~~~text
**Bold title**
__Italic note__
~~Old wording~~
||Optional reveal||
`copyable_value`
```
multiple lines
of code
```
~~~~

The Desktop [tag definitions and parser](https://github.com/desktop-app/lib_ui/blob/master/ui/widgets/fields/input_field.cpp) include these markers and explicitly exclude underline from Markdown parsing. Telegram Desktop references this library in its [.gitmodules](https://github.com/telegramdesktop/tdesktop/blob/dev/.gitmodules). This is source evidence, not a test of an installed release.

**Underline:** select the words and choose Underline in the formatting menu. Do not promise that `___underline___` works. The internal `^^` tag identifier is not an enabled typed shortcut either. A client-specific report can be retained as an observation after testing, without making it universal.

For a named link, quote, or combined styles, select the text and use the relevant formatting-menu action. Desktop exposes keyboard actions for Bold, Italic, Underline, Monospace, Quote, Spoiler, and Create Link. On Windows, the familiar Ctrl+B / Ctrl+I / Ctrl+U apply the first three; use the visible menu's shortcut labels for other actions or platforms. When authoring via browser automation, keep the selection inside the focused composer.

Mobile, Web A, Web K, Desktop, and richer article editors can differ in shortcut parsing and paste behavior. Do not call every composer dialect “MarkdownV2.” If only the words appear, apply native formatting rather than repeatedly sending variations. The [earlier Web K observations](client-tests.md) cover native/clipboard styling, not delimiter parsing.

## Bot API HTML

Set `parse_mode: "HTML"` on an ordinary `sendMessage` payload. Useful literal source:

~~~~html
<b>Weekly notes</b>
<i>A short introduction</i>
<u>Read before Friday</u>
<s>Previous wording</s>
<tg-spoiler>The optional answer</tg-spoiler>
<code>request_a17c</code>
<a href="https://example.com/notes">Open the notes</a>

<blockquote>A quoted observation
with a second line</blockquote>

<blockquote expandable>Additional explanation
with more detail
and a final note</blockquote>

<pre><code class="language-js">const label = "ready";
console.log(label);</code></pre>
~~~~

Aliases: `<strong>` for bold; `<em>` for italic; `<ins>` for underline; `<strike>` or `<del>` for strike; `<span class="tg-spoiler">` for spoiler. For an unlabelled code block, use `<pre>…</pre>`. A language belongs to the nested `<pre><code class="language-…">` form, not a standalone inline code tag.

Ordinary HTML accepts Telegram's listed tags only. Use actual newlines for paragraph spacing. `<br>`, `<p>`, `<div>`, heading/list/table tags, CSS colors, `<mark>`, `<sub>`, and `<sup>` are not ordinary-message formatting tags. See [Rich Messages](rich-messages.md) for the separate richer grammar.

Escape literal `&`, `<`, and `>` as `&amp;`, `&lt;`, and `&gt;`. Escape quotes in quoted attribute values too. Ordinary Bot API HTML supports the named entities `&lt;`, `&gt;`, `&amp;`, `&quot;` and numeric entities; do not assume `&nbsp;` or `&apos;` is accepted here. The local `htmlText()` helper uses `&#39;` for apostrophes.

A URL must also be appropriate for its intended action; HTML escaping does not validate its scheme or destination. Mentions by ID use `<a href="tg://user?id=…">Name</a>` subject to Telegram's mention restrictions. Custom emoji use `<tg-emoji emoji-id="…">🙂</tg-emoji>` with a real eligible ID and fallback emoji; check current eligibility before use.

Source: [Bot API HTML](https://core.telegram.org/bots/api#html-style).

## Bot API MarkdownV2

Set `parse_mode: "MarkdownV2"`. Here is a complete ordinary-message source sample:

~~~~text
*Weekly notes*
_An introductory note_
__Read before Friday__
~Previous wording~
||The optional answer||
`request_a17c`
[Open the notes](https://example.com/notes)

>First quoted line
>Second quoted line

```js
const label = "ready";
console.log(label);
```
~~~~

This uses single stars for bold, single underscores for italic, double underscores for underline, and single tildes for strike. Legacy `parse_mode: "Markdown"` supports fewer styles and does not support underline, strike, spoilers, quotes, custom emoji, or date-time entities.

Expandable quotation source, including separation from an immediately preceding quote:

~~~~text
>Short quotation
**>Additional explanation
>More detail
>Final hidden line||
~~~~

Here `**` is an empty bold separator, and the final `||` marks the expandable quotation. Use ordinary HTML's `<blockquote expandable>` if that is clearer for the existing application.

For **literal data**, escape these characters outside code and link targets:

~~~~text
_ * [ ] ( ) ~ ` > # + - = | { } . ! \
~~~~

Inside inline/fenced code, escape backticks and backslashes. Inside the `(...)` URL target, escape closing parentheses and backslashes. Escape dynamic fragments before inserting them into markup; escaping the completed message would also neutralize its intended formatting.

Example after MarkdownV2 text escaping:

~~~~text
*Build v1\.2*
File: report\_final\.json
Literal: \[draft\] \(A\+B\)\!
~~~~

A JSON/JavaScript string needs a second escaping layer: the runtime text `v1\.2` is written as `"v1\\.2"` in JSON or a normal JavaScript string literal. Text fences show the runtime payload, not JSON.

The parser greedily recognizes `__` as underline. For combined italic + underline, the documented separator pattern is `___both_**__`; do not use `___both___` as a recipe for underline alone.

Source: [Bot API MarkdownV2](https://core.telegram.org/bots/api#markdownv2-style).

## Date and time

Current ordinary messages support `date_time` entities. They are not confined to Rich Messages, and their syntax is not Discord's `<t:…>`.

~~~~html
<tg-time unix="1893456000" format="wDT">1 January 2030, 00:00 UTC</tg-time>
~~~~

Equivalent MarkdownV2:

~~~~text
![1 January 2030, 00:00 UTC](tg://time?unix=1893456000&format=wDT)
~~~~

Use Unix **seconds**. `w` selects weekday; `d`/`D` short/long date; `t`/`T` short/long time. Combine in that order, such as `wDT`. `r` requests relative time and stands alone. An empty format retains the supplied text. Client locale/timezone determine formatted presentation; do not promise an exact spelling or a particular live-refresh cadence without testing.

For a media seek time such as `01:23`, do not use a date-time entity: it represents a calendar instant. Media timestamp linking is a separate client/media behavior and is not verified by this reference.

Source: [date-time formatting](https://core.telegram.org/bots/api#date-time-entity-formatting), [MessageEntity fields](https://core.telegram.org/bots/api#messageentity).

## Nesting and combinations

Ordinary entities may be disjoint or fully nested; crossing ranges are invalid. Bold, italic, underline, strike, and spoiler can nest with each other and applicable entities such as links. Keep `code` and `pre` isolated; quotes cannot nest inside quotes. HTML example: `<b>Read the <i>short</i> version</b>`. MarkdownV2: `*Read the _short_ version*`.

Do not import these restrictions wholesale into Rich Messages: their grammar has its own nesting rules. For generated text, [explicit entities or GramIO](transports.md) can avoid delimiter ambiguity while preserving the same ordinary-message restrictions.

Source: [ordinary entity nesting rules](https://core.telegram.org/bots/api#formatting-options).
