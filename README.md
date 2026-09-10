# Telegram formatting skill

An agent skill for readable Telegram messages: correct delivery format, restrained visual hierarchy, and explicit emoji levels. Includes practical Telegram Web observations, a small dependency-free escaping helper, and original message recipes.

This is a formatting skill, not a Telegram account connector. It does not sign in, scrape chats, store credentials, or send messages by itself.

## Install

Copy `skills/telegram-formatting` into your agent's skill directory. For Codex, use `$CODEX_HOME/skills/telegram-formatting` (normally `~/.codex/skills/telegram-formatting`). Start a new session if the skill catalog has already loaded.

Try: “Use $telegram-formatting to redesign this bot status message, with low emoji usage. Show the payload and a plain-text preview.”

## What is here

- [Skill](skills/telegram-formatting/SKILL.md): routing and presentation guidance.
- [Transport reference](skills/telegram-formatting/references/transports.md): ordinary Bot API messages, entities, GramIO, Web composition, and newer Rich Messages.
- [Recipes](skills/telegram-formatting/references/recipes.md): no / low / high emoji, blocked reviews, copyable credentials.
- [Client observations](skills/telegram-formatting/references/client-tests.md): what was actually tested and what remains unverified.
- [Helpers](skills/telegram-formatting/scripts/escape.mjs): escaping dynamic text; no network or dependencies.

Run `node --test tests/escape.test.mjs` (or `bun test tests/escape.test.mjs`). Skill frontmatter can also be checked with Codex's `skill-creator/scripts/quick_validate.py`.

Research and initial client trials: 10.09.2026. Recheck current platform documentation when adopting new features. The repository contains synthetic examples only; no chat exports, account identifiers, tokens, or private screenshots.

MIT licensed. Independent community project; not affiliated with Telegram.
