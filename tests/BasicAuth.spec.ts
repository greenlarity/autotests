import { Page, test } from '@playwright/test';

type Props = {
	targetURL: string;
	pass: string;
	username: string;
};
let testSettings: Props = {
	targetURL: 'http://the-internet.herokuapp.com/basic_auth',
	pass: 'admin',
	username: 'admin',
};

test('Basic auth', async ({ page }: { page: Page }) => {
	const username = testSettings.username;
	const pass = testSettings.pass;
	const authHeader = 'Basic ' + btoa(username + ':' + pass);
	page.setExtraHTTPHeaders({ Authorization: authHeader });
	await page.goto(`${testSettings.targetURL}`);
});
