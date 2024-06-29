const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  console.log(url);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (
        ["image", "stylesheet", "font", "media"].includes(
          request.resourceType()
        )
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });
    await page.goto(url, {
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
      timeout: 60000, // Increased timeout to 60 seconds
    });
    // await page.waitForSelector(".product-detail-name", { timeout: 30000 });
    // await page.waitForSelector(".longDescription p", { timeout: 30000 });

    const title = await page.evaluate(() => {
      return document.querySelector(".range-info__title")?.textContent;
    });
    console.log(title);
  } catch (error) {
    console.error("Timeout or other error:", error);
  } finally {
    await browser.close();
  }
}

module.exports = { scrapeProduct };
