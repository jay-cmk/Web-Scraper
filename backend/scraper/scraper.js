const puppeteer = require("puppeteer");

const scrapeWebsite = async (url) => {
  try {
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: puppeteer.executablePath(), // ✅ Makes it work on Render
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu"
      ]
    });

    const page = await browser.newPage();
    console.log(`Scraping: ${url}`);

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    const data = await page.evaluate(() => {
      const bodyText = document.body.innerText;

      // --- Company Name ---
      let companyName =
        document.querySelector("meta[property='og:site_name']")?.content ||
        document.querySelector("title")?.innerText ||
        document.querySelector("h1")?.innerText ||
        "";
      companyName = companyName.replace(/\|.*$/, "").trim();

      // --- Social Media ---
      const socialLinks = Array.from(document.querySelectorAll("a[href]"))
        .map(a => a.href)
        .filter(href =>
          /(linkedin\.com|twitter\.com|facebook\.com|instagram\.com)/i.test(href)
        );

      // --- Address ---
      const addressRegex = /\d{1,5}.*?,\s*[\w\s]+,\s*[\w\s]+,\s*[\w\s-]+(\d{5,6})?/;
      const addressMatch = bodyText.match(addressRegex) || [];

      // --- Products / Services ---
      let productsServices = "";
      const productKeywords = /(products?|services?|solutions?|offerings?)\b/i;
      const navLinks = Array.from(document.querySelectorAll("a, li, h2, h3"))
        .map(el => el.textContent.trim())
        .filter(txt => productKeywords.test(txt) && txt.length < 100);
      if (navLinks.length) {
        productsServices = [...new Set(navLinks)].slice(0, 5).join(", ");
      }

      // --- Industry ---
      let industry =
        bodyText.match(/Industry\s*:\s*([\s\S]{0,100})/i)?.[1]?.trim() || "";
      if (!industry) {
        if (/software|web|IT/i.test(bodyText)) industry = "IT & Software";
        else if (/healthcare/i.test(bodyText)) industry = "Healthcare";
        else if (/education/i.test(bodyText)) industry = "Education";
      }

      // --- Tech Stack ---
      const foundTech = [];
      const techKeywords = [
        { name: "React", pattern: /react/i },
        { name: "Angular", pattern: /angular/i },
        { name: "Vue", pattern: /vue/i },
        { name: "Node.js", pattern: /node(\.js)?/i },
        { name: "Python", pattern: /python/i },
        { name: "PHP", pattern: /\bphp\b/i },
        { name: "MongoDB", pattern: /mongo/i },
        { name: "MySQL", pattern: /mysql/i },
        { name: "PostgreSQL", pattern: /postgres/i },
        { name: "AWS", pattern: /aws|amazon web services/i },
        { name: "Azure", pattern: /azure/i },
        { name: "GCP", pattern: /google cloud/i },
        { name: "Docker", pattern: /docker/i },
        { name: "Kubernetes", pattern: /kubernetes|k8s/i }
      ];

      techKeywords.forEach(tech => {
        if (tech.pattern.test(bodyText)) foundTech.push(tech.name);
      });

      Array.from(document.scripts).forEach(script => {
        techKeywords.forEach(tech => {
          if (script.src && tech.pattern.test(script.src))
            foundTech.push(tech.name);
        });
      });

      // --- Projects ---
      const projectsMatch = bodyText.match(/Projects?:?\s([\s\S]{0,300})/i);
      const projects = projectsMatch
        ? projectsMatch[1].split("\n").slice(0, 5)
        : [];

      // --- Competitors ---
      const competitorsMatch = bodyText.match(/Competitors?:?\s([\s\S]{0,300})/i);
      const competitors = competitorsMatch
        ? competitorsMatch[1].split("\n").slice(0, 5)
        : [];

      // --- Market Position ---
      const marketPositionMatch = bodyText.match(
        /(leader|challenger|innovator|niche player)/i
      );

      // --- Description ---
      const description =
        document.querySelector("meta[name='description']")?.content || "";

      // --- Year Founded ---
      const yearFounded =
        bodyText.match(/Founded\s+(in\s+)?\d{4}/i)?.[0] || "";

      return {
        name: companyName || "No name found",
        website: window.location.href,
        email:
          bodyText.match(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i)?.[0] ||
          "Not found",
        phone: bodyText.match(/(\+\d{1,3}[- ]?)?\d{10}/)?.[0] || "Not found",
        socialMedia: socialLinks,
        address: addressMatch[0] || "Not found",
        description,
        yearFounded,
        productsServices,
        industry,
        techStack: [...new Set(foundTech)],
        projects: projects.filter(Boolean),
        competitors: competitors.filter(Boolean),
        marketPosition: marketPositionMatch ? marketPositionMatch[0] : ""
      };
    });

    await browser.close();
    return data;
  } catch (error) {
    console.error(`❌ Error scraping ${url}:`, error.message);
    return { error: `Failed to scrape ${url}: ${error.message}` };
  }
};

module.exports = scrapeWebsite;
