# Message recipes

These are original editorial examples, written as previews rather than transport markup. Apply the selected transport separately. Use real states and next actions from the application.

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
