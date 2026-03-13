import { test, expect } from '@playwright/test';

test.describe('Demo Page - Video Upload', () => {
  test('should load demo page', async ({ page }) => {
    await page.goto('/demo');
    
    await expect(page.locator('h1')).toContainText('Try FrameSentinel Free');
    await expect(page.locator('text=Demo Limitations')).toBeVisible();
  });

  test('should display demo limitations', async ({ page }) => {
    await page.goto('/demo');
    
    await expect(page.locator('text=2 attempts per hour per IP address')).toBeVisible();
    await expect(page.locator('text=Maximum 15 seconds video duration')).toBeVisible();
    await expect(page.locator('text=Maximum 10MB file size')).toBeVisible();
  });

  test('should show file upload area', async ({ page }) => {
    await page.goto('/demo');
    
    await expect(page.locator('text=Upload verification video')).toBeVisible();
    await expect(page.locator('label:has-text("Choose Video")')).toBeVisible();
  });

  test('should navigate to signup from demo', async ({ page }) => {
    await page.goto('/demo');
    
    await page.getByRole('link', { name: 'Sign Up' }).click();
    
    await expect(page).toHaveURL(/.*signup/);
  });
});
