import { chromium } from 'playwright'

const url = process.argv[2] || 'http://localhost:5175/mentoria'

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1600, height: 750 },
  deviceScaleFactor: 1,
})
const page = await context.newPage()
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)

// Scroll to the very bottom
await page.evaluate(() => {
  window.scrollTo(0, document.documentElement.scrollHeight)
})
await page.waitForTimeout(800)

// Full-page screenshot of just the footer area (last 600px of doc)
const docH = await page.evaluate(() => document.documentElement.scrollHeight)
await page.screenshot({
  path: 'tmp/footer-only.png',
  fullPage: true,
  clip: { x: 0, y: docH - 600, width: 1600, height: 600 },
})
console.log('Doc height:', docH, '→ saved footer-only.png')
await browser.close()
