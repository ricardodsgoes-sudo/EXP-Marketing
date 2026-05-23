import { chromium } from 'playwright'

const url = 'http://localhost:5175/soluciones'

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 2, // hi-DPI for clearer detail
})
const page = await context.newPage()
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

// Crop a tight area around the laptop
await page.screenshot({
  path: 'tmp/laptop-tight.png',
  clip: { x: 820, y: 230, width: 540, height: 560 },
})
console.log('Saved tmp/laptop-tight.png')
await browser.close()
