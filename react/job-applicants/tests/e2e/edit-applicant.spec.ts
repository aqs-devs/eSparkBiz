import { expect, test } from '@playwright/test';

test('can edit and persist an applicant basic-info field', async ({ page }) => {
    await page.goto('/applicants/basic-info');

    const applicantRow = page.getByRole('row', {
        name: /E2E Test Applicant/i,
    });
    await expect(applicantRow).toBeVisible();
    await applicantRow.getByRole('link').first().click();

    await expect(page).toHaveURL(/\/applicants\/\d+\/basic-info/);
    await page.getByRole('link', { name: 'Edit' }).click();

    await expect(page).toHaveURL(/\/applicants\/\d+\/edit\/basic-info/);
    await page.getByLabel('First Name').fill('Edited E2E');
    await page.getByLabel('First Name').press('Tab');
    await page.getByRole('button', { name: 'Save Changes' }).click();

    await expect(page).toHaveURL(/\/applicants\/\d+\/basic-info/);
    await page.reload();

    await expect(
        page.getByText('Edited E2E', { exact: true }),
    ).toBeVisible();
});
