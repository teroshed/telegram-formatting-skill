# Initial client observations

Tested 10.09.2026 in Telegram Web K using Chrome on Windows, in a user-authorized test group. The observations were made before this skill was authored. All submitted examples were synthetic. No private chat exports, IDs or screenshots are included here.

## Sent and visually inspected

Four messages: none / low / high emoji comparisons and a compact review card. The sent messages retained readable paragraph spacing and bold headings. Emoji displayed as icons even though the composer's DOM `innerText` omitted them. The compact card retained an italic excerpt and monospace request ID. A cropped screenshot of the sent samples was inspected during the test, but is not distributed.

Native route: fill the composer with plain text, select the heading and use Ctrl+B, inspect the draft, then send. Formatting selection belongs inside the focused composer.

Clipboard route: provide both `text/html` and matching `text/plain` in the same clipboard item. HTML block `div` elements, `b`, `i` and a `span` with `font-family:monospace` preserved the intended layout in this trial. This is a client clipboard recipe, not ordinary Bot API HTML.

## Draft failures caught before sending

A convenience HTML-paste wrapper with `br` elements collapsed the lines; a later newline variant misplaced breaks inside styled text. Those drafts were replaced before sending. This does not prove all HTML pasting is broken: direct clipboard delivery with matching plain text worked. Validate the route, not just the source markup.

## Verification boundaries

Actual client observations cover these four messages on this one client. They do not establish mobile layout, accessibility quality across screen readers, Bot API delivery, MarkdownV2 parsing, blockquote/spoiler behavior, custom emoji, or Rich Messages. Test those separately when the task needs them. Local helper tests verify escaping and UTF-16 assumptions, not server acceptance.
