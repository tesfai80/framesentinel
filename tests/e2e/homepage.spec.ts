import { test, expect } from '@playwright/test';

test.describe('Marketing Site - Home Page', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('h1')).toContainText('Stop Video KYC Fraud');
    await expect(page.getByRole('link', { name: 'Start Free Trial' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Watch Demo' })).toBeVisible();
  });

  test('should open video modal on Watch Demo click', async ({ page }) => {
    await page.goto('/');
    
    // Click Watch Demo button
    await page.getByRole('button', { name: 'Watch Demo' }).click();
    
    // Video modal should appear
    await expect(page.locator('video[src="/demo-video.mp4"]')).toBeVisible();
    
    // Close button should be visible (X button in modal)
    await expect(page.locator('button').filter({ hasText: /^$/ })).toBeVisible();
  });

  test('should close video modal on X click', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('button', { name: 'Watch Demo' }).click();
    await expect(page.locator('video')).toBeVisible();
    
    // Click X button (the one with just icon, no text)
    await page.locator('button').filter({ hasText: /^$/ }).click();
    
    // Video should be hidden
    await expect(page.locator('video')).not.toBeVisible();
  });

  test('should close video modal on background click', async ({ page }) => {
    await page.goto('/');
    
    await page.click('button:has-text("Watch Demo")');
    await expect(page.locator('video')).toBeVisible();
    
    // Click on background (outside video)
    await page.click('body', { position: { x: 10, y: 10 } });
    
    // Video should be hidden
    await expect(page.locator('video')).not.toBeVisible();
  });

  test('should navigate to signup from hero CTA', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('link', { name: 'Start Free Trial' }).first().click();
    
    await expect(page).toHaveURL(/.*signup/);
  });

  test('should display all main sections', async ({ page }) => {
    await page.goto('/');
    
    // Check key sections
    await expect(page.locator('text=5 Detection Modules, 1 API')).toBeVisible();
    await expect(page.locator('text=How the detection pipeline works')).toBeVisible();
    await expect(page.locator('text=Simple, transparent pricing')).toBeVisible();
  });

  test('should display company logos', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('img[alt="AWS"]')).toBeVisible();
    await expect(page.locator('img[alt="GCP"]')).toBeVisible();
    await expect(page.locator('img[alt="Azure"]')).toBeVisible();
  });

  test('should navigate to pricing page', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('link', { name: 'View detailed pricing' }).click();
    
    await expect(page).toHaveURL(/.*pricing/);
  });
});
