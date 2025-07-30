import React, { useState } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi"; // Importing upload icon
import { motion } from "framer-motion"; // Import Framer Motion for animations

function ScraperForm({ setCompanies }) {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScrape = async () => {
    setError("");

    if (!urls.trim()) {
      setError("Please enter at least one URL.");
      return;
    }

    const urlArray = urls
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    // Validate each URL
    for (let u of urlArray) {
      if (!/^https?:\/\//i.test(u)) {
        setError(`Invalid URL: ${u} (must start with http:// or https://)`);
        return;
      }
    }

    setLoading(true);

    try {
      const res = await axios.post("https://web-scraper-uq2i.onrender.com/api/scrape", { urls: urlArray });
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
      setError("Scraping failed. Please check the console for details.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-4 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200"
    >
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center tracking-tight">
        Website Scraper
      </h2>

      <div className="mb-6">
        <label htmlFor="urls" className="block text-sm font-semibold text-gray-700 mb-2">
          Website URLs
        </label>
        <input
          id="urls"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-vertical shadow-sm"
          rows="6"
          placeholder="Enter one URL per line (e.g., https://example.com)"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
        />
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md"
        >
          <p>{error}</p>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleScrape}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 flex items-center justify-center shadow-lg ${
          loading
            ? "bg-indigo-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl"
        }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            <FiUpload className="mr-2 text-lg" />
            Scrape Websites
          </>
        )}
      </motion.button>

      <p className="mt-4 text-sm text-gray-500 text-center italic">
        Enter valid website URLs starting with http:// or https://
      </p>
    </motion.div>
  );
}

export default ScraperForm;
