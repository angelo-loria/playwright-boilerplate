import {test} from '@playwright/test';
import path from 'path';

test.use({
    browserName: 'chromium',
});

test.only('should set input files', async ({ page }) => {
    await page.goto('https://www.w3schools.com/howto/howto_html_file_upload_button.asp');
    await page.getByTestId('myFile').setInputFiles(path.join(__dirname,'bogusFilePath.txt'));
});