import { test, expect } from '@playwright/test';

test.describe('User Signup Flow', () => {
  test('should complete full signup process', async ({ page }) => {
    // Navigate to signup page
    await page.goto('/signup');
    
    // Verify page loaded
    await expect(page.locator('h1')).toContainText('Start your free trial');
    
    // Generate unique email
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;
    
    // Fill signup form
    await page.fill('input[placeholder="John Doe"]', 'Test User');
    await page.fill('input[placeholder="john@company.com"]', testEmail);
    await page.fill('input[placeholder="Acme Inc."]', 'Test Company');
    await page.fill('input[type="password"]', 'TestPassword123!');
    
    // Plan is already selected as 'free' by default
    
    // Submit form
    await page.click('button:has-text("Start Free Trial")');
    
    // Wait for success message
    await expect(page.locator('text=Sign up successful')).toBeVisible({ timeout: 10000 });
    
    // Verify form is cleared
    await expect(page.locator('input[placeholder="john@company.com"]')).toHaveValue('');
  });

  test('should show password toggle', async ({ page }) => {
    await page.goto('/signup');
    
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill('TestPassword123!');
    
    // Click eye icon to show password (last button with svg)
    await page.locator('button').filter({ hasText: /^$/ }).last().click();
    
    // Verify password is now visible
    await expect(page.locator('input[type="text"]').last()).toHaveValue('TestPassword123!');
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/signup');
    
    // Try to submit without filling fields
    await page.click('button:has-text("Start Free Trial")');
    
    // Browser validation should prevent submission
    const nameInput = page.locator('input[placeholder="John Doe"]');
    await expect(nameInput).toBeFocused();
  });

  test('should not redirect after signup', async ({ page }) => {
    await page.goto('/signup');
    
    const timestamp = Date.now();
    await page.fill('input[placeholder="John Doe"]', 'Test User');
    await page.fill('input[placeholder="john@company.com"]', `test${timestamp}@example.com`);
    await page.fill('input[placeholder="Acme Inc."]', 'Test Company');
    await page.fill('input[type="password"]', 'TestPassword123!');
    
    await page.click('button:has-text("Start Free Trial")');
    
    // Wait a bit
    await page.waitForTimeout(3000);
    
    // Should still be on signup page
    expect(page.url()).toContain('/signup');
  });
});
