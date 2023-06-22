[![Playwright Tests](https://github.com/angelo-loria/playwright-boilerplate/workflows/Playwright%20Tests/badge.svg)](https://github.com/angelo-loria/playwright-boilerplate/actions?query=workflow:"Playwright+Tests")
[![View site - GH Pages](https://img.shields.io/badge/View_Latest_Test_Report-Github_Pages-2ea44f)](https://angelo-loria.github.io/playwright-boilerplate/)


# Playwright Page Object Model Boilerplate

This is an example of a Playwright project that uses the page object model design pattern. In general, [Playwright best practices](https://playwright.dev/docs/best-practices) are followed where possible and the [configuration](https://github.com/angelo-loria/playwright-boilerplate/blob/main/playwright.config.ts) is largely the default configuration generated when you install Playwright. 

The site under test is [Automation Exercise](https://www.automationexercise.com/) and tests were derived from the [Automation Exercise test cases](https://www.automationexercise.com/test_cases).


### The `pageObjects` Directory
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






