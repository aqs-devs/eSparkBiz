import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('applicant form has no accessibility violations', async ({ page }) => {
    await page.goto('/applicants/new');

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
});
