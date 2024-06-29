const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { executablePath } = require("puppeteer");
puppeteer.use(StealthPlugin());

const scrapeChintGloablWebsite = async (req, res) => {
  res.status(200).json({ message: "hello" });
  // try {
  //   let { url } = req.body;
  //   //Creating A bot browser Instance
  //   let browser = await puppeteer.launch({
  //     executablePath: executablePath(),
  //     headless: true,
  //     args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-http2"],
  //     timeout: 300000, // Increase timeout to 5 minutes
  //   });

  //   //Creating The Page in the browser
  //   const page = await browser.newPage();
  //   await page.setUserAgent(
  //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  //   );

  //   await page.setRequestInterception(true);

  //   page.on("request", (request) => {
  //     if (
  //       ["image", "stylesheet", "font", "media"].includes(
  //         request.resourceType()
  //       )
  //     ) {
  //       request.abort();
  //     } else {
  //       request.continue();
  //     }
  //   });
  //   //Opening the required Product Page on bot browser
  //   await page.goto(url, {
  //     waitUntil: ["domcontentloaded", "networkidle2"],
  //     timeout: 100000,
  //   });

  //   //Waiting For the Required Details to Appear
  //   await page.waitForSelector(".product-preview-image", { timeout: 100000 });

  //   await page.waitForSelector(".product-detail-name", { timeout: 100000 });
  //   await page.waitForSelector(".chint-product-detail-info", {
  //     timeout: 100000,
  //   });
  //   // Scrape data
  //   const data = await page.evaluate(() => {
  //     let images = [];
  //     let name =
  //       document.querySelector(".product-detail-name")?.textContent ||
  //       "No Title Found!";
  //     let imgs = document.querySelectorAll(".product-preview-image");
  //     imgs.forEach((img) => {
  //       images.push(img.src);
  //     });
  //     let description =
  //       document.querySelector(".chint-product-detail-info > p").textContent ||
  //       "Thist Product Has No Title!";
  //     let mainImage = images[0];
  //     let sideImage1 = images[1] || images[0];
  //     let sideImage2 = images[2] || images[0];

  //     return { name, mainImage, sideImage1, sideImage2, description };
  //   });
  //   console.log(data);
  //   await browser.close();

  //   return res
  //     .status(200)
  //     .json({ message: "Product Scraped Successfully!", data });
  // } catch (error) {
  //   return res.status(200).json({ message: error.message });
  // }
};
module.exports = { scrapeChintGloablWebsite };
