import React, { useState } from "react";
import {
  FiExternalLink,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiXCircle,
  FiColumns,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function CompanyList({ companies }) {
  const [expandedRows, setExpandedRows] = useState({});
  const [visibleColumns, setVisibleColumns] = useState({
    company: true,
    website: true,
    email: true,
    phone: true,
    socialMedia: false,
    address: false,
    description: false,
    yearFounded: false,
    productsServices: true,
    industry: true,
    techStack: true,
    projects: false,
    competitors: false,
    marketPosition: false,
    status: true,
  });

  if (!companies.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200"
      >
        <p className="text-gray-600 text-lg font-medium">
          No results yet. Enter URLs to scrape company data.
        </p>
      </motion.div>
    );
  }

  const toggleRowExpand = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const columnConfig = [
    { key: "company", name: "Company", width: "w-48" },
    { key: "website", name: "Website", width: "w-48" },
    { key: "email", name: "Email", width: "w-48" },
    { key: "phone", name: "Phone", width: "w-32" },
    { key: "socialMedia", name: "Social", width: "w-64" },
    { key: "address", name: "Address", width: "w-64" },
    { key: "description", name: "Description", width: "w-64" },
    { key: "yearFounded", name: "Founded", width: "w-24" },
    { key: "productsServices", name: "Products", width: "w-64" },
    { key: "industry", name: "Industry", width: "w-48" },
    { key: "techStack", name: "Tech Stack", width: "w-64" },
    { key: "projects", name: "Projects", width: "w-64" },
    { key: "competitors", name: "Competitors", width: "w-64" },
    { key: "marketPosition", name: "Position", width: "w-48" },
    { key: "status", name: "Status", width: "w-32" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-200"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Scraped Results
        </h2>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 shadow-sm"
            onClick={() =>
              document.getElementById("column-menu").classList.toggle("hidden")
            }
          >
            <FiColumns className="mr-2" size={16} />
            <span>Columns</span>
          </motion.button>
          <div
            id="column-menu"
            className="hidden absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl z-10 p-3 border border-gray-200"
          >
            {columnConfig.map((col) => (
              <label
                key={col.key}
                className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-150"
              >
                <input
                  type="checkbox"
                  checked={visibleColumns[col.key]}
                  onChange={() => toggleColumnVisibility(col.key)}
                  className="mr-3 rounded text-indigo-600 focus:ring-indigo-500"
                />
                {col.name}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 w-10"></th>
              {columnConfig.map(
                (col) =>
                  visibleColumns[col.key] && (
                    <th
                      key={col.key}
                      className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${col.width}`}
                    >
                      {col.name}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {companies.map((company, index) => {
              const uniqueSocialLinks = [...new Set(company.socialMedia || [])];
              return (
                <React.Fragment key={index}>
                  {/* Row */}
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => toggleRowExpand(index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {expandedRows[index] ? (
                          <FiChevronUp size={20} />
                        ) : (
                          <FiChevronDown size={20} />
                        )}
                      </motion.button>
                    </td>

                    {visibleColumns.company && (
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {company.name || "—"}
                      </td>
                    )}

                    {visibleColumns.website && (
                      <td className="px-6 py-4 text-indigo-600">
                        {company.website ? (
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center hover:underline"
                          >
                            {new URL(company.website).hostname.replace(
                              "www.",
                              ""
                            )}
                            <FiExternalLink className="ml-1" size={14} />
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                    )}

                    {visibleColumns.email && (
                      <td className="px-6 py-4 text-gray-500">
                        {company.email ? (
                          <a
                            href={`mailto:${company.email}`}
                            className="hover:underline"
                          >
                            {company.email}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                    )}

                    {visibleColumns.phone && (
                      <td className="px-6 py-4 text-gray-500">
                        {company.phone || "—"}
                      </td>
                    )}

                    {visibleColumns.productsServices && (
                      <td className="px-6 py-4 text-gray-500 max-w-xs">
                        {company.productsServices || "—"}
                      </td>
                    )}

                    {visibleColumns.industry && (
                      <td className="px-6 py-4 text-gray-500">
                        {company.industry || "—"}
                      </td>
                    )}

                    {visibleColumns.techStack && (
                      <td className="px-6 py-4 text-gray-500">
                        {Array.isArray(company.techStack) &&
                        company.techStack.length ? (
                          <div className="flex flex-wrap gap-2">
                            {company.techStack
                              .slice(0, 3)
                              .map((tech, i) => (
                                <span
                                  key={i}
                                  className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full shadow-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            {company.techStack.length > 3 && (
                              <span className="text-xs text-gray-400">
                                +{company.techStack.length - 3}
                              </span>
                            )}
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                    )}

                    {visibleColumns.status && (
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                            company.error
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {company.error ? (
                            <>
                              <FiXCircle className="mr-1" size={14} /> Error
                            </>
                          ) : (
                            <>
                              <FiCheckCircle className="mr-1" size={14} />{" "}
                              Success
                            </>
                          )}
                        </span>
                      </td>
                    )}
                  </motion.tr>

                  {/* Expanded Row */}
                  <AnimatePresence>
                    {expandedRows[index] && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-50"
                      >
                        <td
                          colSpan={
                            Object.values(visibleColumns).filter(Boolean)
                              .length + 1
                          }
                          className="px-6 py-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {!visibleColumns.socialMedia &&
                              uniqueSocialLinks.length > 0 && (
                                <div>
                                  <h3 className="text-xs font-semibold text-gray-600 uppercase mb-2">
                                    Social Media
                                  </h3>
                                  <div className="flex flex-wrap gap-3">
                                    {uniqueSocialLinks.map((sm, i) => (
                                      <a
                                        key={i}
                                        href={sm}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-indigo-600 hover:underline text-sm flex items-center"
                                      >
                                        {new URL(sm).hostname.replace(
                                          "www.",
                                          ""
                                        )}
                                        <FiExternalLink
                                          className="ml-1"
                                          size={12}
                                        />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}

                            {!visibleColumns.address && company.address && (
                              <div>
                                <h3 className="text-xs font-semibold text-gray-600 uppercase mb-2">
                                  Address
                                </h3>
                                <p className="text-sm text-gray-700">
                                  {company.address}
                                </p>
                              </div>
                            )}

                            {!visibleColumns.description &&
                              company.description && (
                                <div>
                                  <h3 className="text-xs font-semibold text-gray-600 uppercase mb-2">
                                    Description
                                  </h3>
                                  <p className="text-sm text-gray-700">
                                    {company.description}
                                  </p>
                                </div>
                              )}
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default CompanyList;
