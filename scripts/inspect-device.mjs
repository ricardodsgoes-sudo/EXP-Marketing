import { chromium } from 'playwright'

const url = 'http://localhost:5175/soluciones'

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1,
})
const page = await context.newPage()
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

const info = await page.evaluate(() => {
  const device = document.querySelector('.sol-hero__device')
  if (!device) return { error: 'device not found' }
  const r = device.getBoundingClientRect()
  return {
    device: { x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, bottom: r.bottom },
    style: {
      left: device.style.left, top: device.style.top,
      width: device.style.width, height: device.style.height,
      transform: device.style.transform,
    },
  }
})
console.log(JSON.stringify(info, null, 2))

// 1. Screenshot showing device outlined in magenta
await page.addStyleTag({
  content: `.sol-hero__device { outline: 3px solid magenta !important; }`,
})
await page.screenshot({ path: 'tmp/full-debug.png', fullPage: false })

// 2. Tight crop around the laptop area
const cropX = Math.max(0, info.device.x - 200)
const cropY = Math.max(0, info.device.y - 150)
const cropW = Math.min(1600 - cropX, info.device.w + 400)
const cropH = Math.min(900 - cropY, info.device.h + 300)
await page.screenshot({
  path: 'tmp/laptop-zoom.png',
  clip: { x: cropX, y: cropY, width: cropW, height: cropH },
})

// 3. Hide the device and screenshot to see the bare laptop screen behind it
await page.addStyleTag({
  content: `.sol-hero__device { display: none !important; }`,
})
await page.screenshot({
  path: 'tmp/laptop-bare.png',
  clip: { x: cropX, y: cropY, width: cropW, height: cropH },
})

console.log('Saved tmp/full-debug.png, tmp/laptop-zoom.png, tmp/laptop-bare.png')
await browser.close()
