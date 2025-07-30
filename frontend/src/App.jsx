import React, { useState } from "react";
import ScraperForm from "./components/ScraperForm";
import CompanyList from "./components/CompanyList";
import "./App.css";

function App() {
  const [companies, setCompanies] = useState([]);

  return (
    <div className="App">
      <h1>Company Web Scraper</h1>
      <ScraperForm setCompanies={setCompanies} />
      <CompanyList companies={companies} />
    </div>
  );
}

export default App;
