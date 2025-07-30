const express = require("express");
const router = express.Router();
const { handleScrape } = require("../controllers/scrapeController");

router.post("/scrape", handleScrape);

module.exports = router;
