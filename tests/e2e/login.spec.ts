import { test, expect } from '@playwright/test';

test.describe('User Login Flow', () => {
  const testUser = {
    email: 'newtest@example.com',
    password: 'NewTest123!'
  };

  test('should login successfully and redirect to dashboard', async ({ page }) => {
    // Go to marketing site login
    await page.goto('http://localhost:3002/login');
    
    // Fill login form
    await page.fill('input[type="email"]', testUser.email);
    await page.fill('input[type="password"]', testUser.password);
    
    // Submit
    await page.click('button:has-text("Sign In")');
    
    // Wait for success message or redirect
    await page.waitForTimeout(2000);
    
    // Should redirect to auth-callback or dashboard
    const url = page.url();
    expect(url).toMatch(/auth-callback|dashboard/);
  });

  test('should show password toggle on login', async ({ page }) => {
    await page.goto('http://localhost:3002/login');
    
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill('TestPassword123!');
    
    // Click eye icon (button with no text, only svg)
    await page.locator('button').filter({ hasText: /^$/ }).click();
    
    // Password should be visible
    await expect(page.locator('input[type="text"]').last()).toHaveValue('TestPassword123!');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3002/login');
    
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'WrongPassword123!');
    
    await page.click('button:has-text("Sign In")');
    
    // Should show error message
    await expect(page.locator('text=Invalid email or password')).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to signup from login', async ({ page }) => {
    await page.goto('http://localhost:3002/login');
    
    await page.click('text=Start free trial');
    
    await expect(page).toHaveURL(/.*signup/);
  });
});
