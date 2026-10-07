// Decorative obfuscation ONLY: it keeps the plain address out of the HTML
// source so naive scrapers do not harvest it. Base64 is trivially reversible
// and offers NO security or privacy; anyone running the page can decode it.

export function encodeEmail(str) {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

export function decodeEmail(b64) {
  const binary = atob(b64)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}
