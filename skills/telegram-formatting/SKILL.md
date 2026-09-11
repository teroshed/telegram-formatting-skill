---
name: telegram-formatting
description: Write and debug Telegram rich text with concrete syntax for client composers, Bot API HTML or MarkdownV2, entities, GramIO, and Rich Messages. Use for formatting messages, escaping, and rendering checks; not account setup or general bot architecture.
---

# Telegram formatting

Produce usable formatted text, not just layout advice. Preserve the user's wording, tone, locale, and requested emoji level. When showing source syntax, put it in a code fence so the surrounding chat renderer cannot consume the delimiters.

## Everyday syntax at a glance

Identify the destination before choosing a column. Composer shortcuts below are supported by the inspected Telegram Desktop input-field source; they are not a promise about every client, version, paste route, or editor mode. If the client is unknown, name the assumption and provide the native formatting-menu route.

| Style | Desktop composer shortcut | Ordinary Bot API HTML | Ordinary Bot API MarkdownV2 |
| --- | --- | --- | --- |
| Bold | `**ready**` | `<b>ready</b>` | `*ready*` |
| Italic | `__note__` | `<i>note</i>` | `_note_` |
| Underline | Select text → Underline | `<u>deadline</u>` | `__deadline__` |
| Strikethrough | `~~old~~` | `<s>old</s>` | `~old~` |
| Spoiler | `\|\|answer\|\|` | `<tg-spoiler>answer</tg-spoiler>` | `\|\|answer\|\|` |
| Inline code | `` `request_id` `` | `<code>request_id</code>` | `` `request_id` `` |
| Code block | Triple-backtick fence; inspect draft | `<pre>line 1…</pre>` | Triple-backtick fence |
| Named link | Select text → Create Link | `<a href="https://example.com">Open</a>` | `[Open](https://example.com)` |
| Quote | Select text → Quote | `<blockquote>excerpt</blockquote>` | `>excerpt` at the start of each quoted line |

The pipe characters inside code cells are literal delimiters. See [syntax.md](references/syntax.md) for copyable blocks, HTML aliases, escaping, expandable quotes, timestamps, client evidence, and keyboard/menu guidance. Source: [ordinary Bot API formatting](https://core.telegram.org/bots/api#formatting-options) and [Desktop input-field implementation](https://github.com/desktop-app/lib_ui/blob/master/ui/widgets/fields/input_field.cpp).

Do not prescribe `___underline___` as a universal shortcut: the inspected Desktop parser excludes underline delimiters. In MarkdownV2, `__text__` means underline; triple underscores involve italic/underline ambiguity. In **Rich Message Markdown**, `__text__` means bold. These are different grammars.

## Choose the needed detail

- **Typing or pasting into a human client:** use [composer guidance](references/syntax.md#client-composer) and inspect the draft. Use native formatting when a shortcut is uncertain.
- **Ordinary bot text:** use the quick reference above and [syntax.md](references/syntax.md). Prefer the project's existing HTML/entity pipeline; do not silently replace it.
- **Entity offsets or GramIO code:** read [transports.md](references/transports.md). Entity builders preserve formatting through composition; do not add `parse_mode` to their output.
- **Highlight, subscript, superscript, headings, lists, tables, or math:** read [rich-messages.md](references/rich-messages.md). These have documented Rich Message syntax, distinct from ordinary-message entities and from the MTProto `RichText` type.
- **Message presentation:** [recipes.md](references/recipes.md) includes actual HTML/MarkdownV2 source and optional emoji comparisons.
- **Authorized Telegram Web rendering trials:** read [client-tests.md](references/client-tests.md), including the limits of earlier observations.

## Compose and verify

Use a short bold title, readable paragraphs, and specific emphasis. Put copyable IDs or commands in code; use a quote for an excerpt, a link for an action, and spoilers only for optional concealed text. A spoiler does not protect secrets. Emoji are optional; zero to two useful markers per short message is a reasonable default, not a Telegram limit.

Keep dynamic text as data. Use an entity builder or the correct text/code/link escaping context, and preserve the complete content when splitting long messages. The optional [escaping helper](scripts/escape.mjs) escapes fragments; it is not a Markdown parser or URL validator.

Check final text, entity ranges, Unicode, punctuation, and nesting for the chosen route. Report source inspection, local checks, server acceptance, and visual client checks separately. Neither an HTTP success nor this skill's syntax tables proves rendering on every client. Send test messages only to an authorized destination; otherwise prepare the payload and state what remains untested.
