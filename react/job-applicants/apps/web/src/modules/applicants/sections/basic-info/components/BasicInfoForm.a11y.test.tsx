import { render } from '@testing-library/react';
import { useBasicInfoForm } from '../hooks/useBasicInfoForm';
import type { BasicInfoFormValues } from '@job-applicants/schemas';
import axe from 'axe-core';
import { expect, test } from 'vitest';

import { BasicInfoForm } from './BasicInfoForm';

const validValues: BasicInfoFormValues = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    designation: 'Engineer',
    email: 'ada@example.com',
    phone: '+919876543210',
    country: 'India',
    state: 'Gujarat',
    city: 'Ahmedabad',
    gender: 'female',
    zipCode: '380001',
    relationshipStatus: 'committed',
    dob: '1990-01-01',
};

function BasicInfoFormWithValidForm() {
    const form = useBasicInfoForm({
        mode: 'create',
        defaultValues: validValues,
    });

    return <BasicInfoForm form={form} />;
}

test('BasicInfoForm has no accessibility violations', async () => {
    const { container } = render(<BasicInfoFormWithValidForm />);

    const results = await axe.run(container);

    expect(results.violations).toEqual([]);
});
