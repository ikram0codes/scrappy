const puppeteer = require("puppeteer");
const Product = require("../models/product");

async function scrapeShintGlobalWebsite(req, res) {
  try {
    const { url } = req.body;
    console.log(url);
    const browser = await puppeteer.launch({
      headless: false,
      executablePath:
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      defaultViewport: null,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-http2"],
      timeout: 30000,
      slowMo: 250,
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );
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
      waitUntil: ["domcontentloaded", "networkidle2"],
      timeout: 100000,
    });

    await page.waitForSelector(".product-preview-image", { timeout: 100000 });

    await page.waitForSelector(".product-detail-name", { timeout: 100000 });

    // Scrape data
    const data = await page.evaluate(() => {
      let images = [];
      let title =
        document.querySelector(".product-detail-name")?.textContent ||
        "No Title Found!";
      let imgs = document.querySelectorAll(".product-preview-image");
      imgs.forEach((img) => {
        images.push(img.src);
      });
      let description = "No Description Found";
      return { title, images, description };
    });

    await browser.close();
    let product = await Product.create({
      title: data.title,
      images: data.images,
      description: data.description,
      url: url,
    });
    console.log("Data", data);
    console.log(product);
    return res.status(200).json({ message: "Product Scraped Successfully!" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
async function scrapeAbbWebsite(req, res) {
  try {
    const { url } = req.body;

    let browser = await puppeteer.launch({
      executablePath:
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      headless: false, // Set to false to see the browser interaction
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-http2"],
      timeout: 300000, // Increase timeout to 5 minutes
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

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
      waitUntil: ["domcontentloaded", "networkidle2"],
      timeout: 10000000, // Increased timeout
    });

    await page.waitForSelector(`pis-products-details-gallery`, {
      timeout: 10000000,
    });

    await page.waitForSelector(`pis-products-details-general-information`, {
      timeout: 10000000,
    });

    //Scraping Data from the Page
    let data = await page.evaluate(() => {
      let images = [];
      const imageGallery = document.querySelector(
        "pis-products-details-gallery"
      );
      let imageShadow = imageGallery.shadowRoot;
      let imgs = imageShadow.querySelectorAll("img");
      imgs.forEach((img) => {
        images.push(img.src);
      });
      let infoContainer = document.querySelector(
        "pis-products-details-general-information"
      );
      let infoShadow = infoContainer.shadowRoot;
      let infos = infoShadow.querySelectorAll(".pis-print-only > div");
      let title = infos[0].innerHTML;
      let description = infos[infos.length - 1].innerHTML;
      return { images, title, description };
    });
    await browser.close();
    console.log("data", data);
    let product = await Product.create({
      title: data.title,
      images: data.images,
      description: data.description,
      url: url,
    });

    return res
      .status(200)
      .json({ message: "Product Scraped Successfully!", product });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
async function getAllProducts(req, res) {
  try {
    const products = await Product.find({});
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
module.exports = { scrapeAbbWebsite, scrapeShintGlobalWebsite, getAllProducts };
