/**
 * Generates placeholder assets so the CV button and social previews work out of the box:
 *   public/cv.pdf      – a tiny valid PDF saying "replace me"
 *   public/og-image.png – a 1200x630 navy PNG (replace with a real share image)
 *
 * Run with: node scripts/make-placeholder-assets.cjs
 */
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const publicDir = path.join(__dirname, '..', 'public')
fs.mkdirSync(publicDir, { recursive: true })

/* ---------------- cv.pdf ---------------- */
const stream = (objNum, gen, body) =>
  Buffer.from(`${objNum} 0 obj\n${body}\nendobj\n`)
const objects = [
  stream(1, '<< /Type /Catalog /Pages 2 0 R >>'),
  stream(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>'),
  stream(3, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>'),
  (() => {
    const text = 'BT /F1 20 Tf 60 760 Td (Placeholder CV - replace public/cv.pdf with your real CV.) Tj ET'
    return stream(4, `<< /Length ${text.length} >>\nstream\n${text}\nendstream`)
  })(),
  stream(5, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'),
]
let pdf = Buffer.from('%PDF-1.4\n')
const offsets = []
objects.forEach((obj, i) => {
  offsets.push(pdf.length)
  pdf = Buffer.concat([pdf, obj])
})
const xrefStart = pdf.length
pdf = Buffer.concat([
  pdf,
  Buffer.from(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`),
  Buffer.from(offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('')),
  Buffer.from(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`),
])
fs.writeFileSync(path.join(publicDir, 'cv.pdf'), pdf)

/* ---------------- og-image.png ---------------- */
const W = 1200
const H = 630
const raw = Buffer.alloc(H * (W * 4 + 1))
for (let y = 0; y < H; y++) {
  const row = y * (W * 4 + 1)
  raw[row] = 0 // no filter
  for (let x = 0; x < W; x++) {
    // Simple diagonal gradient from navy to teal-ish navy
    const t = (x / W + y / H) / 2
    const r = Math.round(7 + t * 10)
    const g = Math.round(13 + t * 40)
    const b = Math.round(26 + t * 55)
    const i = row + 1 + x * 4
    raw[i] = r
    raw[i + 1] = g
    raw[i + 2] = b
    raw[i + 3] = 255
  }
}

const chunk = (type, data) => {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const typeBuf = Buffer.from(type)
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])) >>> 0)
  return Buffer.concat([len, typeBuf, data, crcBuf])
}
let crcTable
function crc32(buf) {
  if (!crcTable) {
    crcTable = []
    for (let n = 0; n < 256; n++) {
      let c = n
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      crcTable[n] = c
    }
  }
  let crc = -1
  for (const byte of buf) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return crc ^ -1
}

const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(W, 0)
ihdr.writeUInt32BE(H, 4)
ihdr[8] = 8 // bit depth
ihdr[9] = 6 // colour type RGBA
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw)),
  chunk('IEND', Buffer.alloc(0)),
])
fs.writeFileSync(path.join(publicDir, 'og-image.png'), png)

console.log('Wrote public/cv.pdf and public/og-image.png')
