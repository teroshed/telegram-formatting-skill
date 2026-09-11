# Message recipes

These are original examples. Start with actual source for the chosen delivery route; the emoji comparisons below are optional presentation variants.

## A compact message with real rich text

Ordinary Bot API HTML, with `parse_mode: "HTML"`:

~~~~html
<b>Reading notes ready</b>

<i>A short comparison of the two proposals.</i>
<blockquote>Keep the first version easy to inspect.</blockquote>

• <b>Option A:</b> smaller initial scope
• <b>Option B:</b> broader configuration

<u>Next step:</u> Review the notes before Friday.
<a href="https://example.com/notes">Open notes</a>
Reference: <code>review_a17c</code>
<tg-spoiler>Optional detail: the example answer is 42.</tg-spoiler>
~~~~

The same ordinary message in MarkdownV2, with `parse_mode: "MarkdownV2"`:

~~~~text
*Reading notes ready*

_A short comparison of the two proposals\._
>Keep the first version easy to inspect\.

• *Option A:* smaller initial scope
• *Option B:* broader configuration

__Next step:__ Review the notes before Friday\.
[Open notes](https://example.com/notes)
Reference: `review_a17c`
||Optional detail: the example answer is 42\.||
~~~~

Both recipes use real emphasis, a quote, a named link, copyable code, and an optional spoiler. The bullets are ordinary text. Replace example content with the user's text and escape inserted data in its appropriate context; the static markup is not permission to interpret dynamic text as HTML or Markdown.

For a human client's composer, paste the words and apply native Bold, Italic, Quote, Underline, Link, Monospace, and Spoiler to the corresponding spans. Use the [composer shortcuts](syntax.md#client-composer) only for a known compatible editor. For highlights, tables, math, or structured lists, use the [separate Rich Message examples](rich-messages.md).

## Same message, three emoji levels

**None**

```text
Waiting for approval
Request demo-a17c

“Make the navigation easier to use on a phone.”

AI suggestion: Discuss the scope.
Next: Review the request, then approve or reject.
```

**Low**

```text
⏳ Waiting for approval
Request demo-a17c

“Make the navigation easier to use on a phone.”

AI suggestion: Discuss the scope.
Next: Review the request, then approve or reject.
```

**High**

```text
⏳ Waiting for approval
🧾 Request demo-a17c

💬 “Make the navigation easier to use on a phone.”

🤖 AI suggestion: Discuss the scope.
👉 Next: Review the request, then approve or reject.
```

Style the state as bold and the ID as monospace. The excerpt can be italic or a quote entity where supported. Keep spacing and wording consistent when comparing emoji levels. Do not infer approval from a checkmark or hide uncertainty behind decoration.

## Blocked review

```text
Waiting for an AI suggestion
Request demo-b28d

Review blocked: the provider rejected the request.
Next: The owner needs to inspect the error and retry.

No approval has been granted.
```

Show a more specific cause only if the application has evidence for it. “The provider reported a key limit” is more precise than an unsupported claim about the user's entire account.

## Copyable value

```text
Invite created

example_REPLACE_WITH_GENERATED_VALUE

Redeem by: 12.09.2026 18:30:00
Access lasts: 30 days after redemption
```

The dummy value is intentionally not a functioning credential. Put only the copyable value in its code span. Keep expiry outside it; label redemption deadline separately from session duration. Respect the requested date/time format and timezone. Do not promise a continuously updating countdown from ordinary static text.

## Long review

Start with a decision summary and page indicator. Separate the original request from the AI's comments. Keep the full original reachable and label any preview as an excerpt. Put destructive or spending actions after the relevant detail, with explicit confirmation when the product requires it.
