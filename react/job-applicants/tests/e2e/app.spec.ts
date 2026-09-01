import { expect, test } from '@playwright/test';

test('loads the applicant form', async ({ page }) => {
    await page.goto('/applicants/new');

    await expect(page).toHaveTitle(/Job Applicants/i);
    await expect(page.getByRole('tab', { name: 'Basic Info' })).toBeVisible();
});
