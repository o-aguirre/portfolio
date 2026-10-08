const toHex = (byte) => byte.toString(16).padStart(2, '0')

const toAscii = (byte) =>
  byte >= 0x20 && byte <= 0x7e ? String.fromCharCode(byte) : '.'

export const toHexdump = (text, bytesPerLine = 8) => {
  const bytes = new TextEncoder().encode(text)
  const lines = []
  for (let offset = 0; offset < bytes.length; offset += bytesPerLine) {
    const chunk = Array.from(bytes.slice(offset, offset + bytesPerLine))
    const hex = Array.from({ length: bytesPerLine }, (_, i) =>
      i < chunk.length ? toHex(chunk[i]) : '  ',
    ).join(' ')
    const ascii = chunk.map(toAscii).join('').padEnd(bytesPerLine, ' ')
    lines.push(`${offset.toString(16).padStart(8, '0')}  ${hex}  |${ascii}|`)
  }
  return lines
}
