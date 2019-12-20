const puppeteer = require('puppeteer');
const { screenshot } = require('./config/default');
const { argv } = process;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(argv[2]);
  await page.screenshot({
    path: `${screenshot}/${Date.now()}.png`
  })
  await browser.close();
})()
