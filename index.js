const express = require("express");
const app = express();
const scrapingRouter = require("./routes/scrappingRoutes");
const dbConnect = require("./utils/database");
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

//Middlwares
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/v1/scrapper", scrapingRouter);

//Database Connection
dbConnect();

//Server
app.listen(process.env.PORT, () => {
  console.log(`Server has been Started on port: ${process.env.PORT}`);
});
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

// puppeteer.use(StealthPlugin());

// const main = async () => {
//   try {
//     let url = "https://www.se.com/sg/en/all-products";
//     console.log(url);

//     let browser = await puppeteer.launch({
//       executablePath:
//         "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
//       headless: false, // Set to false to see the browser interaction
//       args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-http2"],
//       timeout: 300000, // Increase timeout to 5 minutes
//     });

//     const page = await browser.newPage();
//     await page.setUserAgent(
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
//     );

//     await page.setRequestInterception(true);
//     page.on("request", (request) => {
//       if (
//         ["image", "stylesheet", "font", "media"].includes(
//           request.resourceType()
//         )
//       ) {
//         request.abort();
//       } else {
//         request.continue();
//       }
//     });

//     await page.evaluateOnNewDocument(() => {
//       Object.defineProperty(navigator, "webdriver", {
//         get: () => false,
//       });
//     });

//     await page.goto(url, {
//       waitUntil: ["domcontentloaded", "networkidle2"],
//       timeout: 10000000, // Increased timeout
//     });

//     // Optional: Wait for a specific selector if needed
//     await page.waitForSelector(".card__title", {
//       timeout: 10000000,
//     });

//     // Scraping Data from the Page
//     let data = await page.evaluate(() => {
//       const data = document.querySelector(".card__title").innerHTML;

//       // Example: Extracting specific values from shadow DOM
//       return data;
//     });

//     console.log("Data from shadow DOM:", data);

//     await browser.close();
//   } catch (error) {
//     console.error("Error scraping product:", error.message);
//   }
// };

// main();
