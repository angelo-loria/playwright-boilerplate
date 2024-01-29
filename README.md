[![Playwright Test](https://github.com/angelo-loria/playwright-boilerplate/actions/workflows/playwright-shard.yml/badge.svg?branch=main)](https://github.com/angelo-loria/playwright-boilerplate/actions/workflows/playwright-shard.yml)
[![View site - GH Pages](https://img.shields.io/badge/View_Latest_Test_Report-Github_Pages-9F2B68)](https://angelo-loria.github.io/playwright-boilerplate/)
[![View site - GH Pages](https://img.shields.io/badge/View_Dashboard-Tesults-398cdb)](https://www.tesults.com/angelo-loria/acme-store-demo)


# Playwright Page Object Model Boilerplate

This is an example of a Playwright project that uses the page object model design pattern. In general, [Playwright best practices](https://playwright.dev/docs/best-practices) are followed where possible and the [configuration](https://github.com/angelo-loria/playwright-boilerplate/blob/main/playwright.config.ts) is largely the default configuration generated when you install Playwright. 

The site under test is [Acme Store](https://demo.vercel.store/), a demo ecommerce store built with Next.js, Vercel, and Shopify. 

*Previously, the site under test was [Automation Exercise](https://www.automationexercise.com/). This site was quite outdated and had random pop-up ads that would appear, which made it difficult to test. The Acme Store is far more mordern and a much better candidate for a Playwright boilerplate project in 2023.*

## The `pageObjects` Directory
    pageObjects
        ├── base.page.ts
        ├── base.pageComponent.ts
        ├── pageFixture.ts
        ├── components
            └── *.pageComponent.ts
        └── pages
            └── *.page.ts

This directory contains our base page class, base page component class, and all page object classes that extend those base classes.

* `base.page.ts`
    * The base page class is intended to include Locators and functionality that is shared across all pages. It takes a `Page` instance as a constructor parameter. 
* `base.pageComponent.ts`
    * I like to use page components to logically separate page elements that are common across multiple pages from pages themselves. This class takes a `Locator` parameter in addition to a `Page` instance. Typically, page components are instantiated within other page classes, and not within the spec file itself. 
    * [You can see page components being instantiated in our home.page.ts file](https://github.com/angelo-loria/playwright-boilerplate/blob/main/pageObjects/pages/home.page.ts#L7). These components can then be used in our tests in an easy-to-read format. See [here](https://github.com/angelo-loria/playwright-boilerplate/blob/main/tests/e2e/productSearch.spec.ts#L9).
* `pageFixture.ts`
    * This is a [fixture](https://playwright.dev/docs/test-fixtures) used to instantiate all of our page objects so they can be used across all of our tests, saving us the hassle of importing and instantiating them in every spec file. [You can see how the page objects are passed into our test as parameters](https://github.com/angelo-loria/playwright-boilerplate/blob/main/tests/e2e/productSearch.spec.ts#L4), which can then be used throughout the test.

## Accessibility Testing
I'm using the `@axe-core/playwright` for accessibility testing in [axe.spec.ts](https://github.com/angelo-loria/playwright-boilerplate/blob/main/tests/accessibility/axe.spec.ts). These are failing miserably on the test site I'm using so they are currently skipped with the `skip()` annotation.

## Formatting
I'm using [Prettier](https://prettier.io/) for formatting. I've added an [npm script](https://github.com/angelo-loria/playwright-boilerplate/blob/main/package.json#L7) to make excution simpler, although it's currently not tied to any automation. I just make sure to run this before checking in code.

## Github Actions
I've made some changes to the default Github Actions workflow that Playwright generates.

### Test Execution
Test execution takes place in a job called [playwright_test](https://github.com/angelo-loria/playwright-boilerplate/blob/main/.github/workflows/playwright-shard.yml#L21).
* I've added caching for the browser binaries. This will speed up the workflow by not having to download the browser binaries every time the workflow runs. [See line 41 of the Actions workflow for the first of the steps involved in caching the binaries.](https://github.com/angelo-loria/playwright-boilerplate/blob/main/.github/workflows/playwright-shard.yml#L41)
* I'm using Playwright's [sharding feature](https://playwright.dev/docs/test-shardinghttps://playwright.dev/docs/test-sharding) to run the tests in parallel. [See line 25 of the Actions workflow for the matrix configuration](https://github.com/angelo-loria/playwright-boilerplate/blob/main/.github/workflows/playwright-shard.yml#L25) and [line 64 for the step that runs the tests in parallel](https://github.com/angelo-loria/playwright-boilerplate/blob/main/.github/workflows/playwright-shard.yml#L64). Output from sharded tests is uploaded for use in the reporting job. 

### Reporting
I'm using multiple methods of reporting here. Reporting tasks are done in a [separate job](https://github.com/angelo-loria/playwright-boilerplate/blob/main/.github/workflows/playwright-shard.yml#L84) that executes after all test shard execution has completed. 

#### Github Pages
* Test results from sharded tests are combined into a single report and uploaded to Github Pages. See the badge at the top of this README for a link to the latest test report. I've added a step to automatically [comment on the pull request with a link to the report](https://github.com/angelo-loria/playwright-boilerplate/pull/11#issuecomment-1792545629).

#### dorny/test-reporter
* I'm also using [dorny/test-reporter](https://github.com/dorny/test-reporter) for displaying a test report within Actions itself. [Here's what this report looks like](https://github.com/angelo-loria/playwright-boilerplate/actions/runs/6747111338/job/18342580846). This is handy for getting a quick overview of test results and is easy to set up.

#### Tesults

* [Tesults](https://www.tesults.com/) is a third-party reporting service that has basic free accounts that are perfect for a boilerplate project like this (and I've also used the paid tiers in a professional setting with great success). They have a [playwright-reporter npm package](https://www.tesults.com/docs/playwright) that works with very little configuration, but I took it a step further with a quick and dirty [js script](https://github.com/angelo-loria/playwright-boilerplate/blob/main/feat/acme-store-refactor/.scripts/create-delete-branch-target.js) to automatically create targets in Tesults for new pull requests/branches. This script is used in our [Actions file](https://github.com/angelo-loria/playwright-boilerplate/blob/main/.github/workflows/playwright-shard.yml#L45) to set up a target for the current branch. Results are then posted to that target via the Tesults playwright-reporter. Similar to the Github Pages report, I've added a step to automatically comment on the pull request with a link to the report. You can see the dashboard for this project here at https://www.tesults.com/angelo-loria/acme-store-demo.

Upon a pull request being closed, the Tesults branch target is deleted via the same script with another [Github Actions job](https://github.com/angelo-loria/playwright-boilerplate/blob/main/feat/acme-store-refactor/.github/workflows/delete-tesults-target.yml). This is done to keep the number of targets in Tesults to a minimum on my free account. 

### Lighthouse
I'm using the [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) NPM package for performance and additional accessibility testing. The test setup and execution is a bit unique tests so I've separated them into their own spec file, they use a unique config file, and they are uploaded to Tesults separately from the other tests. [See the directory here](https://github.com/angelo-loria/playwright-boilerplate/tree/main/tests/lighthouse). I've added a specific script in the [package.json](https://github.com/angelo-loria/playwright-boilerplate/blob/main/package.json) file for executing these tests with their specific config file and running the [tesults-lighthouse.js](https://github.com/angelo-loria/playwright-boilerplate/blob/main/.scripts/tesults-lighthouse.js) script afterwards. The script uses the Tesults npm package to upload the results to Tesults to a specific target that's set up with the results interpretation feature to display the individual Lighthouse scores for each page. [It looks pretty slick](https://www.tesults.com/angelo-loria/acme-store-demo/lighthouse). Tesults is hosting the Lighthouse HTML reports and they're uploaded as artifacts to Github Actions as well. [Here's what one of those reports looks like.](https://www.tesults.com/results/files/pdl30/48242328-a7eb-4ab4-8065-3a3686634e5c-1701748288944-1701750294894-0/0/about.html)

### Visual Testing
The visual tests are done using Playwright's [toHaveScreenshot()](https://playwright.dev/docs/test-snapshots). I did have to come up with a way to regenerate them via Actions, which you can see in the [workflows directory](https://github.com/angelo-loria/playwright-boilerplate/blob/main/.github/workflows/update-snapshot.yml). This workflow uses Playwright's `--update-snapshots` CLI command to generate the new snapshots and then commits them to the branch via `stefanzweifel/git-auto-commit-action`.