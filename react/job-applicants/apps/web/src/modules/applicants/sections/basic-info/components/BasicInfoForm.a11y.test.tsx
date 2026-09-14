import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

function BasicInfoFormWithEmptyRequiredFields() {
    const form = useBasicInfoForm({
        mode: 'create',
        defaultValues: {
            ...validValues,
            firstName: '',
            lastName: '',
            designation: '',
            email: '',
            phone: '',
            gender: null,
            dob: '',
        },
    });

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                void form.handleSubmit();
            }}
        >
            <BasicInfoForm form={form} />
            <button type="submit">Create Applicant</button>
        </form>
    );
}

test('BasicInfoForm has no accessibility violations', async () => {
    const { container } = render(<BasicInfoFormWithValidForm />);

    const results = await axe.run(container);

    expect(results.violations).toEqual([]);
});

test('shows schema errors for untouched required fields after submit', async () => {
    render(<BasicInfoFormWithEmptyRequiredFields />);

    expect(screen.queryAllByRole('alert')).toHaveLength(0);

    fireEvent.click(screen.getByRole('button', { name: 'Create Applicant' }));

    await waitFor(() => {
        expect(screen.getByText('First name is required.')).toBeInTheDocument();
        expect(screen.getAllByRole('alert')).toHaveLength(7);
    });

    expect(screen.getByRole('textbox', { name: /First Name/ })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('textbox', { name: /Last Name/ })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('textbox', { name: /Designation/ })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('textbox', { name: /E-mail/ })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('textbox', { name: /Phone/ })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('radiogroup', { name: /Gender/ })).toHaveAttribute('aria-invalid', 'true');
    expect(document.getElementById('dob')).toHaveAttribute('aria-invalid', 'true');
});
