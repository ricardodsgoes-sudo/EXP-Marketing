import { chromium } from 'playwright'

const url = process.argv[2] || 'http://localhost:5175/soluciones'
const out = process.argv[3] || 'tmp/soluciones-hero.png'

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1,
})
const page = await context.newPage()

page.on('pageerror', (err) => console.error('PAGE ERROR:', err.message))
page.on('console', (msg) => {
  if (msg.type() === 'error') console.error('CONSOLE ERROR:', msg.text())
})

await page.goto(url, { waitUntil: 'networkidle' })
// Give GSAP + ResizeObserver + image-load events a beat to settle.
await page.waitForTimeout(800)
await page.screenshot({ path: out, fullPage: false })
console.log(`Saved ${out}`)
await browser.close()
