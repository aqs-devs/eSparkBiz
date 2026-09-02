import { expect, test } from '@playwright/test';

test('can create and open an applicant', async ({ page }) => {
    await page.goto('/applicants/new');

    await page.getByLabel('First Name').fill('Create');
    await page.getByLabel('Last Name').fill('E2E Applicant');
    await page.getByLabel('Designation').fill('Software Engineer');
    await page.getByLabel('E-mail').fill('e2e.create@example.test');
    await page.getByRole('textbox', { name: 'Phone' }).fill('+447911123456');
    await page.getByRole('combobox', { name: 'Country' }).click();
    await page.getByRole('option', { name: 'United States', exact: true }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await page.getByRole('option', { name: 'California' }).click();
    await page.getByRole('combobox', { name: 'City' }).click();
    await page.getByRole('option', { name: 'San Francisco', exact: true }).click();
    await page.getByRole('radio', { name: 'Other' }).click();
    await page.getByLabel('Zip Code').fill('94105');
    await page.getByRole('combobox', { name: 'Relationship Status' }).click();
    await page.getByRole('option', { name: 'Single' }).click();
    await page.getByLabel('Date of Birth').click();
    const datePicker = page.getByRole('dialog');
    await datePicker.getByRole('combobox', { name: 'Month' }).selectOption('0');
    await datePicker.getByRole('combobox', { name: 'Year' }).selectOption('1990');
    await datePicker.locator('[data-day="1990-01-01"]').click();

    await page.getByRole('button', { name: 'Create Applicant' }).click();

    await expect(page).toHaveURL(/\/applicants\/basic-info/);
    await expect(
        page.getByText('Applicant created successfully.'),
    ).toBeVisible();

    const createdApplicant = page.getByRole('row', {
        name: /Create E2E Applicant/i,
    });
    await expect(createdApplicant).toBeVisible();
    await createdApplicant.getByRole('link').first().click();
    await expect(page).toHaveURL(/\/applicants\/\d+\/basic-info/);
});
