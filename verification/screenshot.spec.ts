import { test } from '@playwright/test';

test('Capture Landing Page', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: '/home/jules/verification/kenya_landing.png', fullPage: true });
});
