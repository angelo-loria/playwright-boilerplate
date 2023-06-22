import { test, expect } from "../../pageObjects/pageFixture";

test("Register User", async ({
  accountCreatedPage,
  accountDeletedPage,
  homePage,
  signUpLoginPage,
  signUpPage,
}) => {
  const timeStamp = Date.now();

  await test.step("open home page", async () => {
    await homePage.open();

    await expect(homePage.page).toHaveTitle("Automation Exercise");
    await expect(homePage.sliderCarousel).toBeVisible();
    await expect(homePage.navBar.host).toBeVisible();
    await expect(homePage.productCards.host).toHaveCount(40);
  });

  await test.step("signup new user", async () => {
    await homePage.navBar.links.signUpLogin.click();
    await signUpLoginPage.page.waitForURL(/.*login/);

    await expect(signUpLoginPage.headings).toHaveText([
      "Login to your account",
      "OR",
      "New User Signup!",
    ]);
    await signUpLoginPage.signUpNameInput.fill(`Test User${timeStamp}`);
    await signUpLoginPage.signUpEmailInput.fill(
      `TestUser_${timeStamp}@test.com`
    );

    const signUpResponse = signUpLoginPage.page.waitForResponse("**/signup");
    await signUpLoginPage.signUpButton.click();
    expect((await signUpResponse).status()).toBe(200);

    await signUpLoginPage.page.waitForURL(/.*signup/);
    await expect(signUpPage.headings).toHaveText([
      "Enter Account Information",
      "Address Information",
    ]);
  });

  await test.step("fill account details", async () => {
    await signUpPage.fillFormInputs({
      title: "Mr.",
      firstName: "Test",
      lastName: `User${timeStamp}`,
      password: "Test1234",
      birthDay: "1",
      birthMonth: "January",
      birthYear: "2000",
      newsletterSignup: true,
      specialOffers: true,
      company: "Test Company",
      address1: "Test Address",
      address2: "Test Address 2",
      city: "Test City",
      state: "Test State",
      zipcode: "12345",
      country: "United States",
      mobileNumber: "1234567890",
    });

    const createAccountResponse =
      signUpPage.page.waitForResponse("**/account_created");
    await signUpPage.createAccountButton.click();
    expect((await createAccountResponse).status()).toBe(200);

    await signUpPage.page.waitForURL(/.*account_created/);
    await expect(accountCreatedPage.accountCreatedMessage).toBeVisible();
  });

  await test.step("continue to home page", async () => {
    await accountCreatedPage.continueButton.click();

    // opening home page directly to avoid pop up ads
    await homePage.open();

    await expect(homePage.navBar.host).toContainText(
      `Logged in as Test User${timeStamp}`
    );
  });

  await test.step("delete account", async () => {
    const deleteAccountResponse =
      homePage.page.waitForResponse("**/delete_account");
    await homePage.navBar.links.deleteAccount.click();
    expect((await deleteAccountResponse).status()).toBe(200);

    await homePage.page.waitForURL(/.*delete_account/);

    await expect(accountDeletedPage.accountDeletedMessage).toBeVisible();
    await expect(accountDeletedPage.continueButton).toBeVisible();
  });
});
