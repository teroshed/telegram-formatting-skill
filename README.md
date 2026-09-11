# Telegram formatting skill

An agent skill for Telegram rich text: concrete formatting syntax, copyable examples, correct escaping, and clear distinctions between client shortcuts, Bot API messages, entities, GramIO, and Rich Messages. Includes a small dependency-free escaping helper and practical presentation recipes.

This is a formatting skill, not a Telegram account connector. It does not sign in, scrape chats, store credentials, or send messages by itself.

## Install

Install directly from GitHub using the [skills CLI](https://github.com/vercel-labs/skills):

```sh
npx skills add teroshed/telegram-formatting-skill
```

Or with Bun:

```sh
bunx skills add teroshed/telegram-formatting-skill
```

Add `--agent codex` to target Codex, `--global` for user-wide installation, or `--list` to inspect the skill without installing it. The CLI offers skill and agent selection; this repository does not need a separate npm package.

For manual installation, copy `skills/telegram-formatting` into your agent's skill directory. For Codex, use `$CODEX_HOME/skills/telegram-formatting` (normally `~/.codex/skills/telegram-formatting`). Start a new session if the skill catalog has already loaded.

Try: “Use $telegram-formatting to format this update with bold labels, an underlined deadline, a spoiler, and a code block. Show copyable HTML and MarkdownV2 source.”

## Actual formatting syntax

Telegram Desktop's inspected composer source recognizes:

~~~~text
**Bold**
__Italic__
~~Strikethrough~~
||Spoiler||
`Inline code`
~~~~

For underline, select text and use the native Underline action. Do not assume `___text___` works across clients. Ordinary **Bot API MarkdownV2** uses a different grammar: `*bold*`, `_italic_`, `__underline__`, and `~strike~`. Ordinary HTML uses `<b>`, `<i>`, `<u>`, `<s>`, `<tg-spoiler>`, and `<code>`.

See the [syntax reference](skills/telegram-formatting/references/syntax.md) for complete examples, code blocks, links, quotes, escaping, nesting, and date-time markup. Headings, tables, math, highlighted text, and sub/superscript belong to the separately documented [Rich Message grammar](skills/telegram-formatting/references/rich-messages.md). The [MTProto RichText schema](https://core.telegram.org/type/RichText) is not a list of ordinary composer shortcuts.

Client-source inspection and API documentation establish the syntax documented here; new shortcuts and Rich Messages have not been live-rendered in this repository's tests.

## What is here

- [Skill](skills/telegram-formatting/SKILL.md): routing and presentation guidance.
- [Syntax reference](skills/telegram-formatting/references/syntax.md): concrete composer, HTML, MarkdownV2, code, quotes, and timestamp source.
- [Rich Messages](skills/telegram-formatting/references/rich-messages.md): headings, tables, math, highlighted text, and API boundaries.
- [Transport reference](skills/telegram-formatting/references/transports.md): ordinary Bot API messages, entities, GramIO, Web composition, and newer Rich Messages.
- [Recipes](skills/telegram-formatting/references/recipes.md): copyable HTML/MarkdownV2, restrained emphasis, and optional emoji variants.
- [Client observations](skills/telegram-formatting/references/client-tests.md): what was actually tested and what remains unverified.
- [Helpers](skills/telegram-formatting/scripts/escape.mjs): escaping dynamic text; no network or dependencies.

Run `node --test tests/escape.test.mjs` (or `bun test tests/escape.test.mjs`). Skill frontmatter can also be checked with Codex's `skill-creator/scripts/quick_validate.py`.

Initial client trials: 10.09.2026. Rich-text documentation and client-source review: 11.09.2026. Recheck current platform documentation when adopting new features. The repository contains synthetic examples only; no chat exports, account identifiers, tokens, or private screenshots.

MIT licensed. Independent community project; not affiliated with Telegram.
