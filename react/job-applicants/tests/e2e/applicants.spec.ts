import { expect, test } from '@playwright/test';

test('can open an applicant from the list', async ({ page }) => {
    await page.goto('/applicants/basic-info');

    await expect(
        page.getByRole('heading', { name: /applicants/i }),
    ).toBeVisible();

    const firstApplicant = page
        .getByRole('row')
        .nth(1);

    await expect(firstApplicant).toBeVisible();

    await firstApplicant.getByRole('link').first().click();

    await expect(page).toHaveURL(/\/applicants\/\d+\/basic-info/);
});
