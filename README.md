[![Playwright Tests](https://github.com/angelo-loria/playwright-boilerplate/workflows/Playwright%20Tests/badge.svg)](https://github.com/angelo-loria/playwright-boilerplate/actions?query=workflow:"Playwright+Tests")
[![View site - GH Pages](https://img.shields.io/badge/View_Latest_Test_Report-Github_Pages-2ea44f)](https://angelo-loria.github.io/playwright-boilerplate/)


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
    * [Here's an example where a page component is being instantiated within a page object](https://github.com/angelo-loria/playwright-boilerplate/blob/a4cb51bae85703ab7783988a32b733f5148a59da/pageObjects/pages/home.page.ts#L8-L9). Specifically, this the navigation bar component being instantiated within the home page class, as the home page contains the navigation bar. The navigation bar component can then be used in our tests. See [here](https://github.com/angelo-loria/playwright-boilerplate/blob/a4cb51bae85703ab7783988a32b733f5148a59da/tests/user/registerUser.spec.ts#L17-L18) and [here](https://github.com/angelo-loria/playwright-boilerplate/blob/a4cb51bae85703ab7783988a32b733f5148a59da/tests/user/registerUser.spec.ts#L22).
* `pageFixture.ts`
    * This is a [fixture](https://playwright.dev/docs/test-fixtures) used to instantiate all of our page objects so they can be used across all of our tests, saving us the hassle of importing and instantiating them in every spec file. [You can see how the page objects are passed into our test as parameters](https://github.com/angelo-loria/playwright-boilerplate/blob/a4cb51bae85703ab7783988a32b733f5148a59da/tests/user/registerUser.spec.ts#L4), which can then be used throughout the test.

## Accessibility Testing
I'm using the `@axe-core/playwright` for accessibility testing in [axe.spec.ts](https://github.com/angelo-loria/playwright-boilerplate/blob/main/tests/accessibility/axe.spec.ts). These are failing miserably on the test site I'm using.

## Github Actions
I've made some changes to the Github Actions workflow that Playwright provides.
* I've added caching for the browser binaries. This will speed up the workflow by not having to download the browser binaries every time the workflow runs. [See line 37 of the Actions workflow for the first of the steps involved in caching the binaries.](https://github.com/angelo-loria/playwright-boilerplate/blob/6521fe30026b45b03672bfb66d5898d3b3ef9d81/.github/workflows/playwright.yml#L37)
* I've added a step to upload the test report to Github Pages. Note that this report is overwritten on every test run. See the badge at the top of this README for a link to the latest test report and [line 71 of the Actions workflow for the steps to upload and deploy the report to Github Pages.](https://github.com/angelo-loria/playwright-boilerplate/blob/6521fe30026b45b03672bfb66d5898d3b3ef9d81/.github/workflows/playwright.yml#L71)
* I'm also using [test-reporter](https://github.com/dorny/test-reporter) for displaying a test report within Actions itself. [Here's what this report looks like](https://github.com/angelo-loria/playwright-boilerplate/actions/runs/5394266421/jobs/9795222055).

