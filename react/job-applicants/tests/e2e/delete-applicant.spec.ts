import { expect, test } from '@playwright/test';

test('can soft-delete an applicant from the list', async ({ page }) => {
    await page.goto('/applicants/basic-info');

    const applicantRow = page.getByRole('row', {
        name: /E2E Test Applicant/i,
    });
    await expect(applicantRow).toBeVisible();

    await applicantRow.getByRole('button', {
        name: 'Delete applicant',
    }).click();

    await expect(
        page.getByText('Applicant deleted.', { exact: true }),
    ).toBeVisible();
    await expect(
        page.getByRole('row', { name: /E2E Test Applicant/i }),
    ).not.toBeVisible();

    await page.reload();
    await expect(
        page.getByRole('row', { name: /E2E Test Applicant/i }),
    ).not.toBeVisible();
});
