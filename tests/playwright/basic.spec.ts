import { test, expect } from '@playwright/test';

// Home page loads and contains expected text
test('home page should load and display welcome text', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Learning|Preparation Platform/i);
  await expect(page.locator('body')).toContainText("Explore");
  await expect(page.locator('body')).toContainText("Know More");
  await expect(page.locator('body')).toContainText("About");
});

// Navigation to Explore page
test('navigate to explore page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /explore/i }).click();
  await expect(page).toHaveURL(/.*explore/i);
  await expect(page.locator('body')).toContainText(["Explore Your Universe"]);
});

// Navigation to Know More page
test('navigate to know more page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /know more/i }).click();
  await expect(page).toHaveURL(/.*know-widget/i);
});

// Feedback form is accessible via direct URL
test('feedback form is accessible', async ({ page }) => {
  await page.goto('/feedback');
  await expect(page.locator('form')).toBeVisible();
  await expect(page.locator('h2')).toContainText("Feedback Form");
  await expect(page.locator('form')).toContainText("Submit Feedback");
});

// Games page is accessible via direct URL
test('games page is accessible', async ({ page }) => {
  await page.goto('/games/cosmic-memory');
  await expect(page.locator('body')).toContainText(["Cosmic Memory"]);
});
