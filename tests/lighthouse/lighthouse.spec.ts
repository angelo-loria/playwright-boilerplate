import { BrowserContext, test, chromium } from "@playwright/test";
import findFreePorts from "find-free-ports";
import * as fs from "fs";

const pagePaths = {
  about: "about",
  faq: "frequently-asked-questions",
  home: "",
  privacyPolicy: "privacy-policy",
  productPage: "product/acme-geometric-circles-t-shirt",
  search: "search?q=acme",
  shippingReturnPolicy: "shipping-return-policy",
  termsConditions: "terms-conditions",
};

// used by tesults-lighthouse.js to upload results
type tesultsTestCase = {
  name: string;
  suite: string;
  result: "pass" | "fail";
  rawResult: string;
  _Path: string;
  files: Array<string>;
};

const tesultsCases: Array<tesultsTestCase> = [];
let browser: BrowserContext;
let port: number;

test.beforeAll(async () => {
  // open chromium with remote debugging port for lighthouse
  [port] = await findFreePorts(1);
  browser = await chromium.launchPersistentContext("", {
    args: [`--remote-debugging-port=${port}`],
    // default lighthouse desktop resolution
    viewport: { width: 1350, height: 940 },
  });
});

for (const [pageName, pagePath] of Object.entries(pagePaths)) {
  test(`${pageName} @lighthouse`, async ({ baseURL }) => {
    const fullUrl = baseURL + pagePath;
    const reportPath = `${__dirname}/reports/${pageName}.html`;
    const lighthouse = require("lighthouse/core/index.cjs");

    // https://github.com/GoogleChrome/lighthouse/blob/main/core/config/desktop-config.js
    const config = {
      extends: "lighthouse:default",
      settings: {
        formFactor: "desktop",
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        skipAudits: [
          // Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
          "uses-http2",
          // There are always bf-cache failures when testing in headless. Reenable when headless can give us realistic bf-cache insights.
          "bf-cache",
        ],
      },
    };

    // https://github.com/GoogleChrome/lighthouse/blob/main/docs/understanding-results.md
    const runnerResult = await lighthouse(
      fullUrl,
      {
        output: "html",
        port: port,
      },
      config
    );

    // write file for upload to tesults
    const reportHtml = runnerResult.report;
    fs.writeFileSync(reportPath, reportHtml);

    const scores = {
      Performance: Math.round(
        runnerResult.lhr.categories.performance.score! * 100
      ),
      Accessibility: Math.round(
        runnerResult.lhr.categories.accessibility.score! * 100
      ),
      "Best Practices": Math.round(
        runnerResult.lhr.categories["best-practices"].score! * 100
      ),
      SEO: Math.round(runnerResult.lhr.categories.seo.score! * 100),
      PWA: Math.round(runnerResult.lhr.categories.pwa.score! * 100),
    };

    for (const [score, value] of Object.entries(scores)) {
      console.log(`${score}: ${value}`);
      tesultsCases.push({
        name: `${score}`,
        suite: `${pageName}`,
        result: "pass",
        rawResult: `${value}`,
        _Path: `${baseURL + pagePath}`,
        files: [reportPath],
      });
    }
  });
}

test.afterAll(async () => {
  await browser.close();
  // write file for upload to tesults
  fs.writeFileSync(
    `${__dirname}/reports/cases.json`,
    JSON.stringify(tesultsCases)
  );
});
