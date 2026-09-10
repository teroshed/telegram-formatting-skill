---
name: telegram-formatting
description: Compose and debug readable Telegram messages, choosing Bot API HTML, MarkdownV2, entities, or Telegram Web rich text. Use for message layout, escaping, emoji density, and rendering checks; not for account setup, chat scraping, or general bot architecture.
---

# Telegram formatting

Make the message easy to scan without losing its meaning. Preserve the user's tone, locale, content, and requested emoji level.

## Choose the delivery surface first

Distinguish an ordinary bot message, a newer Rich Message, and text typed into a human client's composer. They do not share a universal Markdown dialect. Read [transports.md](references/transports.md) for the selected route. Inspect an existing bot's installed framework before changing its formatting pipeline.

Keep dynamic user text as data. Use an entity builder or context-specific escaping. Do not parse untrusted prompts as formatting, concatenate unescaped markup, or silently discard content to fit a limit. For long messages, paginate at meaningful boundaries and preserve access to the full original.

## Give the eye a clear order

Lead with the state or outcome. Use a short bold heading, a separate excerpt or body, then a concrete next step. Put IDs and commands in monospace. Reserve emphasis for what changes the reader's decision; avoid whole paragraphs in bold and decorative separators on every line.

For workflow messages, separate state, evidence and action. A recommendation is not approval; approval is not execution. A blocked review needs both a visible blocker and an honest next step. Do not hide failures behind a cheerful pending label.

Use emoji according to the requested level:

- **None:** no emoji; words carry every distinction.
- **Low:** zero to two useful markers per short message.
- **High:** a meaningful marker per section, with text labels retained. Avoid repeated emoji strings and unrelated decoration.

These counts are design defaults, not Telegram limits. Prefer low when unspecified. See [recipes.md](references/recipes.md) for examples to adapt, not rigid templates. Spoilers are visual concealment, not protection for secrets; don't use them for essential warnings or actions.

## Verify the actual route

Validate serialized text and entity ranges for bot code, including emoji, non-Latin text, punctuation, line breaks, and long inputs. The optional [escaping helper](scripts/escape.mjs) handles text contexts only; it is not a Markdown parser or URL validator.

When the user authorizes client testing, confirm the destination from visible UI, send a small set of synthetic samples, and inspect the sent messages. A draft preview or successful HTTP response alone is not visual verification. Test ordinary text as well as the requested emoji density. Check wrapping, spacing, monospace, and the discoverability of the action.

Read [client-tests.md](references/client-tests.md) before Telegram Web trials. If authentication or sending authorization is missing, prepare drafts and report the specific untested boundary. Do not scrape session tokens or send to an arbitrary chat.

Report implementation checks separately from client observations. Include the tested client and date, and label untested newer features. Refresh official references when behavior, limits or API versions matter; do not claim every Telegram client renders identically.
