import { expect, test } from '@playwright/test';

test('can undo applicant deletion', async ({ page }) => {
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

    await expect(applicantRow).not.toBeVisible();

    await page.getByRole('button', {
        name: /undo/i,
    }).click();

    await expect(
        page.getByRole('row', {
            name: /E2E Test Applicant/i,
        }),
    ).toBeVisible();

    await page.reload();

    await expect(
        page.getByRole('row', {
            name: /E2E Test Applicant/i,
        }),
    ).toBeVisible();
});
