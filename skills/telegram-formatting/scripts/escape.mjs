/** Escape dynamic text fragments, never an entire already-formatted message. */
export function htmlText(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
export function markdownV2Text(value) {
  return String(value).replace(/[_*\[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}
export function markdownV2Code(value) {
  return String(value).replace(/[`\\]/g, '\\$&');
}
/** Only escaping; validate URL scheme/destination separately before use. */
export function markdownV2LinkTarget(value) {
  return String(value).replace(/[)\\]/g, '\\$&');
}
