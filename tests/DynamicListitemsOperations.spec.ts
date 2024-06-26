import { Page, expect, test } from '@playwright/test';

type Props = {
	targetURL: string;
	countButtons: number;
};
let testSettings: Props = {
	targetURL: 'http://the-internet.herokuapp.com/add_remove_elements/',
	countButtons: 15,
};

test('Click on dynamically added buttons', async ({ page }: { page: Page }) => {
	await page.goto(`${testSettings.targetURL}`);
	await expect(page).toHaveTitle('The Internet');
	for (let i = 0; i < testSettings.countButtons; i++) {
		await page.getByRole('button', { name: 'Add Element' }).click();
	}
	await page.waitForSelector('.added-manually');
	const deleteButtons = page.locator('.added-manually');
	const count: number = await deleteButtons.count();
	for (let i: number = 0; i < count; i++) {
		try {
			await deleteButtons.nth(0).click();
		} catch (e) {
			console.log(`Error clicking on element ${i}: ${e.message}`);
		}
	}
});
