


const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    // Basic Details
    name: { type: String },
    website: { type: String },
    email: { type: String },
    phone: { type: String },

    // Medium Data Extraction (Level 2)
    socialMedia: { type: [String] },  // LinkedIn, Twitter, etc.
    address: { type: String },
    description: { type: String },
    yearFounded: { type: String },
    productsServices: { type: String },
    industry: { type: String },

    // Advanced Data Extraction (Level 3)
    techStack: { type: [String] },
    projects: { type: [String] },
    competitors: { type: [String] },
    marketPosition: { type: String },

    // Error Handling
    error: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);


