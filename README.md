# Playwright + TypeScript Demo Test Suite

Automated UI tests for the demo invoicing site https://st2016.inv.bg/ using Microsoft Playwright (TypeScript).

## Why slow motion
The target site is resource constrained. Always run tests with slow motion to avoid overloading it. Recommended: --slow-mo=300–500 and low concurrency (workers = 1).

## Prerequisites
- Node.js 18+
- Git
- (Optional) VS Code + Playwright Test extension

## Install
```bash
npm init -y
npm install -D @playwright/test
npx playwright install
```

## Project structure (minimal)
```
/tests
  login.spec.ts
/playwright.config.ts
/README.md
/package.json
```

## Configuration (slow motion + single worker)
```ts
// filepath: c:\API Tests\playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  workers: 1,                // keep concurrency low
  use: {
    baseURL: 'https://st2016.inv.bg',
    headless: true,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 800 },
    // slowMo can be set here OR via CLI
    launchOptions: { slowMo: 400 }
  },
  retries: 1,
  reporter: [['html', { open: 'never' }], ['list']]
});
```

## Sample test
```ts
// filepath: c:\API Tests\tests\login.spec.ts
import { test, expect } from '@playwright/test';

test('login page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Inv/);
  await expect(page.locator('form')).toBeVisible();
});
```

## Running
Run all tests (slow motion via CLI):
```bash
npx playwright test --slow-mo=400
```
Single test:
```bash
npx playwright test tests/login.spec.ts --slow-mo=500
```
Headed mode (visual debugging):
```bash
npx playwright test --headed --slow-mo=600
```

## Recording a test
```bash
npx playwright codegen https://st2016.inv.bg/ --slow-mo=500
```
Copy generated code into /tests.

## Best practices for this target site
- Keep workers = 1.
- Avoid parallel page.goto bursts.
- Add small waits only if truly needed (prefer expect polling).
- Do not run load / stress tests against the demo site.

## Environment variables (optional)
If credentials are needed:
```bash
set INV_USER=demoUser
set INV_PASS=demoPass
```
Then in test:
```ts
await page.fill('#username', process.env.INV_USER!);
await page.fill('#password', process.env.INV_PASS!);
```

## CI (GitHub Actions minimal)
```yaml
# filepath: .github/workflows/tests.yml
name: ui-tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 18 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --slow-mo=400
      - if: failure()
        run: npx playwright show-report
```

## Reports
After a run:
```bash
npx playwright show-report
```

## Updating browsers
```bash
npx playwright install chromium
```

## Troubleshooting
- Timeout: increase test timeout or navigationTimeout.
- Site overwhelmed: raise slowMo or insert expect-based waits, keep workers=1.
- Flaky element: use locator.getByRole / getByLabel instead of CSS.

## License
Demo usage only. Do not overload the target site.
