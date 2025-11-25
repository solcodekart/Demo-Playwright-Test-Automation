# Playwright + TypeScript Demo Test Suite

Automated UI and API tests for the demo invoicing site https://st2016.inv.bg/ using Microsoft Playwright (TypeScript).

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
/lib
  /enums
    Credentials.ts
  /tools
    selectStringByLang.ts
    step.decorator.ts
/resources
  /files
    empty.doc
    empty.jpeg
    empty.doc.pdf
/tests
  /pages
    Api.actions.ts
    Base.page.ts
    Documents.page.ts
    Landing.page.ts
    Login.page.ts
    New.Invoice.page.ts
    Page.factory.ts
  /steps
    Api.steps.ts
    Documents.Page.steps.ts
    Landing.Page.steps.ts
    Shared.steps.ts
    step.factory.ts
  api.automation.spec.ts
  ui.automation.spec.ts
playwright.config.ts
README.md
package.json
fixtures.ts
testConfig.ts
tsconfig.json
```
## Running
Run all tests (slow motion via CLI):
```bash
npx playwright test LANG="bg" SLOWMO=500
```
Single test:
```bash
npx playwright test LANG="bg" SLOWMO=500 api.automation.spec.ts
```
Headed mode (visual debugging):
```bash
npx playwright test LANG="bg" SLOWMO=500 --headed
```

## Recording a test
```bash
npx playwright codegen LANG="bg" SLOWMO=500 https://st2016.inv.bg/
```
Copy generated code into /tests.

## Best practices for this target site
- Keep workers = 1.
- Avoid parallel page.goto bursts.
- Add small waits only if truly needed (prefer expect polling).
- Do not run load / stress tests against the demo site.

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
