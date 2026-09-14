import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { expect, test, vi, beforeEach } from 'vitest';
import { useBasicInfoForm, type ApplicantForm } from './useBasicInfoForm';
import type { BasicInfoFormValues } from '@job-applicants/schemas';

const { createApplicant, updateApplicant, toast } = vi.hoisted(() => ({
    createApplicant: vi.fn(),
    updateApplicant: vi.fn(),
    toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock('@job-applicants/api-client', () => ({ createApplicant, updateApplicant }));
vi.mock('sonner', () => ({ toast }));

const validValues: BasicInfoFormValues = {
    firstName: 'Ada', lastName: 'Lovelace', designation: 'Engineer',
    email: 'ada@example.com', phone: '+919876543210', country: 'India',
    state: 'Gujarat', city: 'Ahmedabad', gender: 'female', zipCode: '380001',
    relationshipStatus: 'committed', dob: '1990-01-01',
};

function Harness({ options, onForm }: { options?: Parameters<typeof useBasicInfoForm>[0]; onForm: (form: ApplicantForm) => void }) {
    const form = useBasicInfoForm(options);
    useEffect(() => onForm(form), [form, onForm]);
    return null;
}

function FocusHarness({ values, onForm }: { values: BasicInfoFormValues; onForm: (form: ApplicantForm) => void }) {
    const form = useBasicInfoForm({ mode: 'create', defaultValues: values });
    useEffect(() => onForm(form), [form, onForm]);

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit();
        }}>
            <form.Field name="firstName">
                {(field) => (
                    <input
                        id="firstName"
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                    />
                )}
            </form.Field>
            <form.Field name="email">
                {(field) => (
                    <input
                        id="email"
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                    />
                )}
            </form.Field>
            <button type="submit">Create Applicant</button>
        </form>
    );
}

beforeEach(() => {
    vi.clearAllMocks();
    createApplicant.mockResolvedValue({});
    updateApplicant.mockResolvedValue({});
});

test('create mode submits validated data exactly once', async () => {
    let form!: ApplicantForm;
    render(<Harness options={{ mode: 'create', defaultValues: validValues }} onForm={(value) => { form = value; }} />);
    await act(() => form.handleSubmit());
    expect(createApplicant).toHaveBeenCalledOnce();
    expect(createApplicant).toHaveBeenCalledWith(validValues);
});

test('create success calls onSuccess, shows toast, and resets the form', async () => {
    const onSuccess = vi.fn(); let form!: ApplicantForm;
    render(<Harness options={{ mode: 'create', defaultValues: validValues, onSuccess }} onForm={(value) => { form = value; }} />);
    await act(() => form.handleSubmit());
    expect(onSuccess).toHaveBeenCalledOnce();
    expect(toast.success).toHaveBeenCalledWith('Applicant created successfully.');
    expect(form.state.isSubmitting).toBe(false);
});

test('edit mode updates the applicant exactly once', async () => {
    let form!: ApplicantForm;
    render(<Harness options={{ mode: 'edit', applicantId: 123, defaultValues: validValues }} onForm={(value) => { form = value; }} />);
    await act(() => form.handleSubmit());
    expect(updateApplicant).toHaveBeenCalledOnce();
    expect(updateApplicant).toHaveBeenCalledWith(123, validValues);
});

test('edit success calls onSuccess, shows toast, and resets the form', async () => {
    const onSuccess = vi.fn(); let form!: ApplicantForm;
    render(<Harness options={{ mode: 'edit', applicantId: 123, defaultValues: validValues, onSuccess }} onForm={(value) => { form = value; }} />);
    await act(() => form.handleSubmit());
    expect(onSuccess).toHaveBeenCalledOnce();
    expect(toast.success).toHaveBeenCalledWith('Applicant updated successfully.');
    expect(form.state.isSubmitting).toBe(false);
});

test('edit without an applicant id does not call updateApplicant', async () => {
    let form!: ApplicantForm;
    // @ts-expect-error This intentionally exercises the runtime guard for malformed edit options.
    render(<Harness options={{ mode: 'edit', defaultValues: validValues }} onForm={(value) => { form = value; }} />);
    await expect(act(() => form.handleSubmit())).rejects.toThrow('Applicant ID is required when editing an applicant.');
    expect(updateApplicant).not.toHaveBeenCalled();
});

test('create failure shows an error toast and rethrows the original error', async () => {
    const error = new Error('create failed'); createApplicant.mockRejectedValue(error); let form!: ApplicantForm;
    render(<Harness options={{ mode: 'create', defaultValues: validValues }} onForm={(value) => { form = value; }} />);
    await expect(act(() => form.handleSubmit())).rejects.toThrow(error);
    expect(toast.error).toHaveBeenCalledWith('Could not create applicant.');
});

test('update failure shows an error toast and rethrows the original error', async () => {
    const error = new Error('update failed'); updateApplicant.mockRejectedValue(error); let form!: ApplicantForm;
    render(<Harness options={{ mode: 'edit', applicantId: 123, defaultValues: validValues }} onForm={(value) => { form = value; }} />);
    await expect(act(() => form.handleSubmit())).rejects.toThrow(error);
    expect(toast.error).toHaveBeenCalledWith('Could not update applicant.');
});

test('invalid form data does not call the API client', async () => {
    let form!: ApplicantForm;
    render(<Harness options={{ mode: 'create', defaultValues: { ...validValues, email: 'not-an-email' } }} onForm={(value) => { form = value; }} />);
    await act(() => form.handleSubmit());
    expect(createApplicant).not.toHaveBeenCalled();
});

test('failed submission focuses the first invalid field in form order', async () => {
    let form!: ApplicantForm;
    const scrollIntoView = vi.fn();
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    render(
        <FocusHarness
            values={{ ...validValues, firstName: '', email: 'not-an-email' }}
            onForm={(value) => { form = value; }}
        />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Create Applicant' }));

    await waitFor(() => expect(document.activeElement).toBe(document.getElementById('firstName')));
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'center' });
    expect(form.state.submissionAttempts).toBe(1);
});

test('failed submission focuses a later invalid field when earlier fields are valid', async () => {
    const scrollIntoView = vi.fn();
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    render(
        <FocusHarness
            values={{ ...validValues, email: 'not-an-email' }}
            onForm={() => undefined}
        />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Create Applicant' }));

    await waitFor(() => expect(document.activeElement).toBe(document.getElementById('email')));
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'center' });
});

test('successful submission does not trigger invalid-field focus', async () => {
    let form!: ApplicantForm;
    const scrollIntoView = vi.fn();
    HTMLElement.prototype.scrollIntoView = scrollIntoView;
    const sentinel = document.createElement('button');
    document.body.appendChild(sentinel);
    sentinel.focus();

    render(
        <FocusHarness
            values={validValues}
            onForm={(value) => { form = value; }}
        />,
    );

    await act(() => form.handleSubmit());

    expect(scrollIntoView).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(sentinel);
    sentinel.remove();
});
