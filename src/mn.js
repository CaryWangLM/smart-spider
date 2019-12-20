const puppeteer = require('puppeteer');
const { mn } = require('./config/default');
const srcToimg = require('./helper/srcToimg');
const { argv } = process;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(argv[2]);

  await page.setViewport({
    width: 1920,
    height: 1080
  });

  await page.focus('#kw');
  await page.keyboard.sendCharacter(argv[3]);
  await page.click('.s_search');

  page.on('load', async () => {

    const srcs = await page.evaluate(() => {
      const images = document.querySelectorAll('img.main_img');
      return Array.prototype.map.call(images, img => img.src);
    })
    srcs.forEach(async src => {
      await srcToimg(src, mn);
    });
    await browser.close();
  });
})()
