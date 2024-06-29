const express = require("express");
const {
  scrapeChintGloablWebsite,
} = require("../controllers/scrapingController");
const scrappingRouter = express.Router();

scrappingRouter.post("/chintglobal", scrapeChintGloablWebsite);

module.exports = scrappingRouter;
