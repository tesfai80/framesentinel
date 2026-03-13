# FrameSentinel Test Suite

Comprehensive E2E, Integration, and Unit tests for FrameSentinel platform.

## Structure

```
tests/
├── e2e/                    # End-to-End tests (Playwright)
│   ├── signup.spec.ts      # User signup flow
│   ├── login.spec.ts       # User login flow
│   ├── dashboard.spec.ts   # Admin dashboard tests
│   ├── homepage.spec.ts    # Marketing site homepage
│   └── demo.spec.ts        # Demo page tests
├── integration/            # Integration tests (Python/Pytest)
├── unit/                   # Unit tests (Python/Pytest)
├── fixtures/               # Test fixtures (videos, images, etc.)
├── playwright.config.ts    # Playwright configuration
└── package.json           # Dependencies

```

## Prerequisites

### For E2E Tests (Playwright)
- Node.js 18+
- npm or yarn

### For Integration/Unit Tests (Python)
- Python 3.9+
- pip

## Installation

### Install E2E Test Dependencies

```bash
cd tests
npm install
npx playwright install
```

### Install Python Test Dependencies

```bash
pip install pytest pytest-asyncio httpx
```

## Running Tests

### E2E Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test e2e/signup.spec.ts

# Run specific browser
npx playwright test --project=chromium
```

### Integration Tests (Python)

```bash
npm run test:integration
```

### Unit Tests (Python)

```bash
npm run test:unit
```

### Run All Tests

```bash
npm run test:all
```

## Test Reports

After running tests, reports are generated:

- **Playwright HTML Report**: `playwright-report/index.html`
- **Test Results JSON**: `test-results.json`

View HTML report:
```bash
npx playwright show-report
```

## Writing New Tests

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('my new test', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
});
```

### Integration Test Example

```python
import pytest
import httpx

@pytest.mark.asyncio
async def test_api_endpoint():
    async with httpx.AsyncClient() as client:
        response = await client.get('http://localhost:8000/api/v1/health')
        assert response.status_code == 200
```

## Test Coverage

### E2E Tests Cover:
- ✅ User signup flow (with password toggle)
- ✅ User login flow (with redirect to dashboard)
- ✅ Dashboard navigation and features
- ✅ Marketing site homepage (with video modal)
- ✅ Demo page video upload
- ✅ Mobile and desktop views
- ✅ Multiple browsers (Chrome, Firefox, Safari)

### Integration Tests Cover:
- API endpoints
- Database operations
- Authentication flow
- Video processing pipeline

### Unit Tests Cover:
- Individual functions
- Utility methods
- Data validation

## CI/CD Integration

Tests can be run in CI/CD pipelines:

```yaml
# GitHub Actions example
- name: Run E2E Tests
  run: |
    cd tests
    npm install
    npx playwright install --with-deps
    npm run test:e2e
```

## Debugging Tests

### Debug specific test
```bash
npx playwright test --debug e2e/signup.spec.ts
```

### Generate test code
```bash
npm run playwright:codegen
```

### View trace
```bash
npx playwright show-trace trace.zip
```

## Test Data

Test fixtures are stored in `fixtures/` directory:
- `test-video.mp4` - Sample video for upload tests
- `test-user.json` - Test user credentials

## Environment Variables

Create `.env` file in tests directory:

```env
MARKETING_SITE_URL=http://localhost:3002
ADMIN_DASHBOARD_URL=http://localhost:3001
API_URL=http://localhost:8000
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=TestPassword123!
```

## Troubleshooting

### Tests failing due to timeout
- Increase timeout in `playwright.config.ts`
- Ensure all services are running

### Services not starting
- Check if ports 3001, 3002, 8000 are available
- Manually start services before running tests

### Browser not found
```bash
npx playwright install
```

## Best Practices

1. **Keep tests independent** - Each test should work standalone
2. **Use meaningful test names** - Describe what is being tested
3. **Clean up after tests** - Remove test data
4. **Use fixtures** - Reuse common setup code
5. **Test user flows** - Not just individual features
6. **Handle async properly** - Use await for all async operations
7. **Take screenshots on failure** - Already configured in playwright.config.ts

## Contributing

When adding new features, please add corresponding tests:
1. E2E tests for user-facing features
2. Integration tests for API endpoints
3. Unit tests for utility functions

## Support

For issues or questions about tests, contact the development team.
