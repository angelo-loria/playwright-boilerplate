import { test, expect } from "../../pageObjects/pageFixture";

test.describe("Clients page", () => {
    test.beforeEach(async ({ clientsPage }) => {
        await clientsPage.open();
    });
    test("should search for a Client", async ({ clientsPage }) => {
        await clientsPage.quickSearchInput.fill('Adam');
        await clientsPage.quickSearchInput.press('Enter');
        await clientsPage.page.waitForResponse("**/api/entity/getentitypage")
        expect(await clientsPage.tableRows).toHaveCount(1);
    });
});
