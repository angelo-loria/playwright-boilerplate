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
    * [You can see page components being instantiated in our home.page.ts file](https://github.com/angelo-loria/playwright-boilerplate/blob/b32c6dc4acfd69784bbb2942a865e5c1f0c56a76/pageObjects/pages/home.page.ts#L7). These components can then be used in our tests in an easy-to-read format. See [here](https://github.com/angelo-loria/playwright-boilerplate/blob/b32c6dc4acfd69784bbb2942a865e5c1f0c56a76/tests/e2e/productSearch.spec.ts#L9).
* `pageFixture.ts`
    * This is a [fixture](https://playwright.dev/docs/test-fixtures) used to instantiate all of our page objects so they can be used across all of our tests, saving us the hassle of importing and instantiating them in every spec file. [You can see how the page objects are passed into our test as parameters](https://github.com/angelo-loria/playwright-boilerplate/blob/b32c6dc4acfd69784bbb2942a865e5c1f0c56a76/tests/e2e/productSearch.spec.ts#L4), which can then be used throughout the test.

## Accessibility Testing
I'm using the `@axe-core/playwright` for accessibility testing in [axe.spec.ts](https://github.com/angelo-loria/playwright-boilerplate/blob/main/tests/accessibility/axe.spec.ts). These are failing miserably on the test site I'm using so they are currently skipped with the `skip()` annotation.

## Github Actions
I've made some changes to the default Github Actions workflow that Playwright generates.
* I've added caching for the browser binaries. This will speed up the workflow by not having to download the browser binaries every time the workflow runs. [See line 41 of the Actions workflow for the first of the steps involved in caching the binaries.](https://github.com/angelo-loria/playwright-boilerplate/blob/b32c6dc4acfd69784bbb2942a865e5c1f0c56a76/.github/workflows/playwright-shard.yml#L41)
* I'm using Playwright's [sharding feature](https://playwright.dev/docs/test-shardinghttps://playwright.dev/docs/test-sharding) to run the tests in parallel. [See line 25 of the Actions workflow for the matrix configuration](https://github.com/angelo-loria/playwright-boilerplate/blob/b32c6dc4acfd69784bbb2942a865e5c1f0c56a76/.github/workflows/playwright-shard.yml#L25) and [line 64 for the step that runs the tests in parallel](https://github.com/angelo-loria/playwright-boilerplate/blob/b32c6dc4acfd69784bbb2942a865e5c1f0c56a76/.github/workflows/playwright-shard.yml#L64). Test results from sharded tests are combined into a single report and uploaded to Github Pages in the [Reporting](https://github.com/angelo-loria/playwright-boilerplate/blob/b32c6dc4acfd69784bbb2942a865e5c1f0c56a76/.github/workflows/playwright-shard.yml#L84) job. See the badge at the top of this README for a link to the latest test report. I've added a step to automatically [comment on the pull request with a link to the report](https://github.com/angelo-loria/playwright-boilerplate/pull/11#issuecomment-1792545629).
* I'm also using [test-reporter](https://github.com/dorny/test-reporter) for displaying a test report within Actions itself. [Here's what this report looks like](https://github.com/angelo-loria/playwright-boilerplate/actions/runs/6747111338/job/18342580846).

