const express = require("express");
const {
  scrapeAbbWebsite,
  scrapeShintGlobalWebsite,
  getAllProducts,
} = require("../controllers/scrapingController");
const scrappingRouter = express.Router();

scrappingRouter.post("/chintglobal", scrapeShintGlobalWebsite);
scrappingRouter.post("/abb", scrapeAbbWebsite);

scrappingRouter.get("/all", getAllProducts);

module.exports = scrappingRouter;
