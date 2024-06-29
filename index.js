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

// const main = async () => {
//   try {
//     let url =
//       "https://www.se.com/sg/en/product-range/61088-acti-9-c120/?parent-subcategory-id=1605";
//     console.log(url);

//     let browser = await puppeteer.launch({
//       executablePath: executablePath(),
//       // "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
//       headless: true, // Set to false to see the browser interaction
//       args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-http2"],
//       timeout: 300000, // Increase timeout to 5 minutes
//     });

//     const page = await browser.newPage();

//     await page.goto(url, {
//       waitUntil: ["domcontentloaded", "networkidle2"],
//       timeout: 10000000, // Increased timeout
//     });

//     // Optional: Wait for a specific selector if needed
//     await page.waitForSelector("pes-range-main", {
//       timeout: 10000000,
//     });
//     // Scraping Data from the Page
//     let data = await page.evaluate(() => {
//       const mainRoot = document.querySelector("pes-range-main").shadowRoot;
//       let secondRoot = mainRoot.querySelector("pes-range-info").shadowRoot;
//       // Example: Extracting specific values from shadow DOM
//       let name = secondRoot.querySelector("h1").textContent;
//       let description = secondRoot.querySelector(
//         "div.range-info__description"
//       ).textContent;
//       let image = secondRoot.querySelector("img").src;
//       let mainImage = image;
//       let sideImage1 = image;
//       let sideImage2 = image;

//       return { name, description, mainImage, sideImage1, sideImage2 };
//       return { image };
//     });

//     console.log(data);

//     await browser.close();
//   } catch (error) {
//     console.error("Error scraping product:", error.message);
//   }
// };

// main();
