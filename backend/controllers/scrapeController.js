// const scrapeWebsite = require("../scraper/scraper");

// const handleScrape = async (req, res) => {
//   const { urls } = req.body;

//   // ✅ Validation
//   if (!urls || !Array.isArray(urls) || urls.length === 0) {
//     return res.status(400).json({ error: "URLs must be a non-empty array" });
//   }

//   try {
//     const results = [];

//     for (const url of urls) {
//       const result = await scrapeWebsite(url);
//       results.push(result);
//     }

//     res.json(results);
//   } catch (err) {
//     console.error("Controller Error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = { handleScrape };


const scrapeWebsite = require("../scraper/scraper");
const Company = require("../models/company");

const handleScrape = async (req, res) => {
  const { urls } = req.body;

  // ✅ Validate input
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: "URLs must be a non-empty array" });
  }

  try {
    const results = [];

    for (const url of urls) {
      const result = await scrapeWebsite(url);

      // ✅ Save to MongoDB only if no scraping error
      if (!result.error) {
        await Company.create(result);
      }

      results.push(result);
    }

    // ✅ Return all results (both saved + failed ones)
    res.json(results);

  } catch (err) {
    console.error("Controller Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { handleScrape };
