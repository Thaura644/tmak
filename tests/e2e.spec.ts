import { test, expect } from '@playwright/test';

test('Full E2E: Admin can manage members and adverts', async ({ page }) => {
  // 1. Visit Landing Page
  await page.goto('http://localhost:3000');
  await expect(page.locator('text=The Mango Association of Kenya (T-MAK)').first()).toBeVisible();
  
  // 2. Login
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('http://localhost:3000/admin');
  await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible();

  // 3. Add a new Member
  await page.click('nav >> text=Members');
  await page.click('text=Add New Member');
  await page.fill('label:has-text("Name") + input', 'New Test Farmer');
  await page.fill('label:has-text("Role") + input', 'Mango Expert');
  await page.fill('label:has-text("Location") + input', 'Test County');
  await page.fill('label:has-text("Image URL") + input', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe33dFPETeYlU8H0bLSyKriQ3wD5ZzE55rlcGsG4GVEefQlrCFzy_ZrsvSVPuttGkTPWgOU2xMNtn1VIieog4rxsBSlxp6vgVTPgTdfaUkwoAWEKEUVOKIsWE8AfnOoCXsU0X86syDVNP8us5k_xY_PlhCTku8CZviaYUY6YjeTMV9m8Fu8OolprdUiukxntH3QrWo31tIBjomPoz2TiV8_Oos-feQYbssHNJ2iNQy1puJf4hY5IHo0slwfVRACvC7-QJb19egMuuo');
  await page.click('button:has-text("Save Member")');

  await expect(page.locator('text=New Test Farmer').first()).toBeVisible();

  // 4. Add a new Advert
  await page.goto('http://localhost:3000/admin/adverts');
  await page.click('text=Add New Advert');
  await page.fill('label:has-text("Title") + input', 'Special Seedlings');
  await page.fill('label:has-text("Description") + textarea', 'Best seeds in Kenya');
  await page.fill('label:has-text("Type") + input', 'OFFER');
  await page.click('button:has-text("Save Advert")');

  await expect(page.locator('text=Special Seedlings').first()).toBeVisible();

  // 5. Verify on Landing Page
  await page.goto('http://localhost:3000');
  await expect(page.locator('text=Special Seedlings').first()).toBeVisible();
  
  console.log('E2E Test Passed!');
});
