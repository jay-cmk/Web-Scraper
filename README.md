# Company Scraping Tool (MERN Stack)

## 📌 Overview
This is a **MERN stack-based web scraping tool** that, given a list of URLs or search queries, automatically extracts detailed company information such as:
- Company Name
- Website
- Contact Information (Email, Phone)
- Social Media Links
- Address
- Description
- Products & Services
- Industry
- Tech Stack
- Projects
- Competitors
- Market Position
- Status (Success/Error)

The frontend displays results in a **dynamic, interactive table** with:
- Expand/Collapse details per row
- Column visibility control
- Search & filtering
- Success/Error status badges

---

## 🚀 Features Implemented
- **Advanced Scraping**
  - Extracts structured company data from websites
  - Detects & extracts multiple social media links
  - Identifies company’s tech stack
- **Interactive Frontend**
  - Expandable rows for detailed view
  - Toggleable columns
  - Badges for success/error
- **Data Cleaning**
  - Removes duplicates in social media links
  - Normalizes extracted data formats
- **Backend API**
  - Modular MVC structure (Models, Controllers, Routes)
  - Endpoint to scrape and return JSON data
- **Error Handling**
  - Handles websites with missing or partial data
  - Displays error reason in the UI

---

## 📊 Data Extraction Level
We implemented **Advanced Level** extraction:
- **Basic**: Name, website, contact info ✅
- **Medium**: Products, industry, description ✅
- **Advanced**: Tech stack, competitors, market position, projects ✅

---

## 📂 Output Sample
### JSON Output (`sample-output.json`)
```json
[
  {
    "name": "TechHelper Technologies",
    "website": "https://techhelper.in",
    "email": "info@techhelper.in",
    "phone": "+91 7223061806",
    "socialMedia": [
      "https://facebook.com/techhelper",
      "https://instagram.com/techhelper",
      "https://linkedin.com/company/techhelper"
    ],
    "address": "44, Near BHEL Gate 1, Indrapuri, Bhopal, MP, India-462022",
    "description": "TechHelper Technologies is rated as the best software company in Bhopal...",
    "productsServices": "Custom software development, Web solutions, Cloud services",
    "industry": "IT & Software",
    "techStack": ["AWS", "React", "Node.js"],
    "projects": ["ERP Software", "E-commerce Platform"],
    "competitors": ["Company A", "Company B"],
    "marketPosition": "Leading software solutions provider in central India",
    "status": "Success"
  }
]
