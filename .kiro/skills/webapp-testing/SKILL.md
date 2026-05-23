---
name: webapp-testing
description: Automated build verification using Playwright for spinning up the local dev server and capturing screenshots, console logs, and accessibility tree from any URL. Lets the AI critique its own output.
---

This skill provides Playwright-based testing for verifying web application output:

1. After every major page or component is drafted, screenshot the result
2. Visually compare against the design reference (Visual Bible)
3. Run Lighthouse audits for Performance ≥ 90, Accessibility ≥ 95
4. Verify responsive behavior on iPhone SE (375px), iPad (768px), 1440px desktop
5. Check console for errors and warnings
6. Validate accessibility tree structure

## Usage

Invoke after building each page to:
- Screenshot and visually verify the output matches premium safari aesthetic
- Run accessibility checks
- Verify responsive breakpoints
- Check for console errors
- Validate that the design doesn't look like a generic template
