# Rich Messages and the RichText distinction

Primary documentation checked 11.09.2026. This reference covers documented syntax, not a live delivery or client-rendering test.

## Choose the correct surface

| Requested feature | Ordinary message | Rich Message |
| --- | --- | --- |
| Bold, italic, underline, strike, spoiler, code, links, quotes | Native message entities | Rich inline/block formatting |
| Highlight / marked text | No native marked entity | `==focus==` or `<mark>focus</mark>` |
| Subscript / superscript | No native sub/sup entities | `H<sub>2</sub>O`, `x<sup>2</sup>` |
| Headings | A bold line can act as a title | `# Title` through `###### Title`, or `<h1>`–`<h6>` |
| Lists | Plain bullet/number characters | `- item`, `1. item`, or `<ul>`/`<ol>` with `<li>` |
| Tables | Plain-text approximation or separate artifact | Markdown pipe table or `<table>` structure |
| LaTeX math | Literal text or rendered attachment | `$a+b$`, `$$a+b$$`, or math tags |
| Calendar timestamps | `date_time` entity, `<tg-time>`, or `tg://time` markup | Corresponding rich date-time formatting |
| Task list display | Plain `☐` / `☑` characters | `- [ ] item` / `- [x] item` or checkbox list HTML |

Ordinary list punctuation is still subject to the selected parser: for example, a literal `-` or `1.` must be escaped in MarkdownV2. Unicode `²` or `₂` are characters, not general-purpose superscript/subscript formatting, and cannot represent arbitrary styled text.

Sources: [ordinary entity types](https://core.telegram.org/bots/api#messageentity), [Rich Message formatting](https://core.telegram.org/bots/api#rich-message-formatting-options).

## Actual Rich Message payload

The Bot API `sendRichMessage` method accepts `rich_message` containing **exactly one** of `html`, `markdown`, or `blocks`. This does not use ordinary `parse_mode`.

~~~~js
const payloadFor = (chatId) => ({
  chat_id: chatId,
  rich_message: {
    html: '<h2>Reading notes</h2><p><mark>Review first</mark>: H<sub>2</sub>O and x<sup>2</sup>.</p>',
  },
});
// Payload for sendRichMessage; constructing it does not send anything.
~~~~

`blocks` uses the documented `InputRichBlock` structures; it is not the ordinary `entities` array. Check the installed bot library and recipient clients when choosing this route. A business-account send also has the method's documented account restrictions.

Sources: [InputRichMessage](https://core.telegram.org/bots/api#inputrichmessage), [sendRichMessage](https://core.telegram.org/bots/api#sendrichmessage).

## Rich Message Markdown

Put the following source in `rich_message.markdown`:

~~~~text
## Reading notes

**Key point**, *emphasis*, ~~old wording~~, and ==highlight==.
<u>Underlined words</u>; H<sub>2</sub>O; x<sup>2</sup>.
||Optional reveal|| and `copyable_value`.

- First topic
- Second topic

1. Read
2. Compare

- [ ] Review draft
- [x] Collect references

| Topic | State |
| --- | --- |
| Syntax | Ready |
| Rendering | Untested |

Inline formula: $a^2+b^2=c^2$

$$S=\pi r^2$$

<details><summary>Additional notes</summary>
These notes can be expanded.
</details>
~~~~

This grammar uses `**text**` or `__text__` for bold, and `*text*` or `_text_` for italic. Underline, subscript, and superscript use the documented inline HTML tags. Do not substitute MarkdownV2 escaping or the Desktop composer shortcut table. Standard Markdown fences, named links, and block quotations are supported here too.

The richer parser permits inline combinations that ordinary code entities do not. Its own HTML/Markdown mixing rules apply: Markdown is parsed inside inline HTML, but generally not inside block HTML except the specifically documented containers such as `details`. Table cells accept inline formatting.

Source: [Rich Message Markdown grammar](https://core.telegram.org/bots/api#rich-message-formatting-options).

## Rich Message HTML

Useful structure in `rich_message.html`:

~~~~html
<h2>Reading notes</h2>
<p><mark>Review first</mark>: H<sub>2</sub>O and x<sup>2</sup>.</p>
<ul><li>First topic</li><li>Second topic</li></ul>
<ol><li>Read</li><li>Compare</li></ol>
<ul>
<li><input type="checkbox">Review draft</li>
<li><input type="checkbox" checked>Collect references</li>
</ul>
<table>
<tr><th>Topic</th><th>State</th></tr>
<tr><td>Syntax</td><td>Ready</td></tr>
<tr><td>Rendering</td><td>Untested</td></tr>
</table>
<p>Inline formula: <tg-math>a^2+b^2=c^2</tg-math></p>
<tg-math-block>S=\pi r^2</tg-math-block>
<details><summary>Additional notes</summary><p>Expanded content.</p></details>
~~~~

Telegram still defines a tag/attribute subset; arbitrary browser HTML, styles, or scripts are not implied. Its Rich Message HTML named-entity list is broader than ordinary HTML's. Use the appropriate grammar and escape text fragments without destroying trusted structural tags.

Source: [Rich Message HTML grammar](https://core.telegram.org/bots/api#rich-message-formatting-options).

## Task lists versus collaborative checklists

A Rich Message task-list marker is a formatting construct. Do not promise that typing `- [ ]` produces a collaborative checklist or that recipients can toggle it. Telegram's separate `sendChecklist` method sends a checklist on behalf of a connected business account, with task IDs and permissions such as allowing others to mark tasks done. An ordinary `☐` character has no completion state.

Sources: [sendChecklist](https://core.telegram.org/bots/api#sendchecklist), [InputChecklist](https://core.telegram.org/bots/api#inputchecklist).

## What the MTProto RichText page proves

The [MTProto RichText type](https://core.telegram.org/type/RichText) defines a recursive structure with constructors such as `textBold`, `textSubscript`, `textSuperscript`, and `textMarked`. It is used by page content, for example [pageBlockParagraph](https://core.telegram.org/constructor/pageBlockParagraph). That page lists a schema, not punctuation a person can type in an ordinary composer.

Keep three distinct structures straight:

- Ordinary `MessageEntity`: a type and UTF-16 range over a plain string.
- MTProto `RichText`: nested `text…` constructors used by rich page structures.
- Bot API Rich Message content: `InputRichMessage`, blocks, and its own `RichText…` schema/HTML/Markdown grammar.

The existence of `textMarked` does not create a Bot API `MessageEntity` type named `marked`, nor enable `<mark>` in ordinary `sendMessage`. Conversely, saying “Telegram has no highlight, tables, or math” is too broad now that Rich Messages document these features.
