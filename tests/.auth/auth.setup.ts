import { test as setup } from '@playwright/test';
import LoginPage from '../../pageObjects/pages/login.page';
import * as dotenv from 'dotenv';
dotenv.config();

const authfile: string = './.auth/user.json';

setup('Authentication by UI', async ({ page }) => {
    setup.slow();

    const loginPage: LoginPage = new LoginPage(page);

    // Login by UI

    await page.goto('/');
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await page.waitForResponse(response => response.url().includes('/home'));

    await page.context().storageState({ path: authfile });
});
