import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, basename, extname } from 'node:path'
import sharp from 'sharp'

const [, , inputPath, outputPath, qualityArg] = process.argv

if (!inputPath || !outputPath) {
  console.error(
    'Usage: node scripts/convert-to-webp.mjs <input> <output.webp> [quality=82]',
  )
  process.exit(1)
}

const quality = qualityArg ? Number(qualityArg) : 82

const input = await readFile(inputPath)
await mkdir(dirname(outputPath), { recursive: true })
const output = await sharp(input).webp({ quality }).toBuffer()
await writeFile(outputPath, output)

const inSize = (input.length / 1024).toFixed(1)
const outSize = (output.length / 1024).toFixed(1)
const saved = (((input.length - output.length) / input.length) * 100).toFixed(1)
console.log(
  `${basename(inputPath)} (${extname(inputPath).slice(1)}, ${inSize} KB) → ` +
    `${basename(outputPath)} (${outSize} KB) — ${saved}% smaller`,
)
