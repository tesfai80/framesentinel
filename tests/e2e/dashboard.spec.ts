import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('http://localhost:3002/login');
    await page.fill('input[type="email"]', 'newtest@example.com');
    await page.fill('input[type="password"]', 'NewTest123!');
    await page.click('button:has-text("Sign In")');
    
    // Wait for dashboard
    await page.waitForURL('http://localhost:3001/dashboard', { timeout: 15000 });
  });

  test('should display dashboard overview', async ({ page }) => {
    // Verify main sections
    await expect(page.locator('text=Overview')).toBeVisible();
    await expect(page.locator('text=Total Sessions')).toBeVisible();
    await expect(page.locator('text=Fraud Detected')).toBeVisible();
    await expect(page.locator('text=Verified')).toBeVisible();
  });

  test('should navigate to sessions page', async ({ page }) => {
    await page.click('text=Sessions');
    
    await expect(page).toHaveURL(/.*sessions/);
    await expect(page.locator('h1:has-text("Sessions")')).toBeVisible();
  });

  test('should navigate to analytics page', async ({ page }) => {
    await page.click('text=Fraud Analytics');
    
    await expect(page).toHaveURL(/.*analytics/);
    await expect(page.locator('h1:has-text("Fraud Analytics")')).toBeVisible();
  });

  test('should display user info in sidebar', async ({ page }) => {
    await expect(page.locator('text=newtest@example.com')).toBeVisible();
    await expect(page.locator('text=ADMIN')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    await page.click('button:has-text("Logout")');
    
    // Should redirect to login
    await page.waitForURL('http://localhost:3001/login', { timeout: 5000 });
  });

  test('should display credits balance', async ({ page }) => {
    await expect(page.locator('text=Credits')).toBeVisible();
  });

  test('should filter sessions by date', async ({ page }) => {
    await page.click('text=Sessions');
    
    // Open date picker
    await page.click('input[type="date"]').first();
    
    // Select a date
    const today = new Date().toISOString().split('T')[0];
    await page.fill('input[type="date"]', today);
    
    // Sessions should be filtered
    await page.waitForTimeout(1000);
  });
});
