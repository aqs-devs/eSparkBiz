import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { expect, test, vi } from 'vitest';
import type { BasicInfoFormValues } from '@job-applicants/schemas';
import { ApplicantFormPage } from './ApplicantFormPage';
import type { ApplicantForm } from '../hooks/useBasicInfoForm';
import { useBasicInfoForm } from '../hooks/useBasicInfoForm';

vi.mock('../components/BasicInfoForm', () => ({
    BasicInfoForm: () => <div data-testid="basic-info-form" />,
}));

const values: BasicInfoFormValues = {
    firstName: 'Ada', lastName: 'Lovelace', designation: 'Engineer',
    email: 'ada@example.com', phone: '', country: null, state: null,
    city: null, gender: 'female', zipCode: null, relationshipStatus: null,
    dob: '1990-01-01',
};

function createForm() {
    return useBasicInfoForm({ defaultValues: values });
}

function renderPage(mode: 'create' | 'edit', form: ApplicantForm, initialEntries = ['/form']) {
    const router = createMemoryRouter([
        { path: '/form', element: <ApplicantFormPage form={form} mode={mode} cancelTo="/home" /> },
        { path: '/home', element: <div>Home</div> },
    ], { initialEntries });
    return render(<RouterProvider router={router} />);
}

function FormHarness({ submitting = false, dirty = false, onForm }: { mode?: 'create' | 'edit'; submitting?: boolean; dirty?: boolean; onForm: (form: ApplicantForm) => void }) {
    const form = createForm();
    form.handleSubmit = vi.fn().mockResolvedValue(undefined) as ApplicantForm['handleSubmit'];
    if (submitting) form.store.state.isSubmitting = true;
    if (dirty) form.setFieldValue('firstName', 'Changed');
    onForm(form);
    return null;
}

test('renders the create submit label', () => {
    let form!: ApplicantForm;
    render(<FormHarness onForm={(value) => { form = value; }} />);
    renderPage('create', form);
    expect(screen.getByRole('button', { name: 'Create Applicant' })).toBeInTheDocument();
});

test('renders the edit submit label', () => {
    let form!: ApplicantForm;
    render(<FormHarness mode="edit" onForm={(value) => { form = value; }} />);
    renderPage('edit', form);
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
});

test('submitting invokes form.handleSubmit', () => {
    let form!: ApplicantForm;
    render(<FormHarness onForm={(value) => { form = value; }} />);
    renderPage('create', form);
    fireEvent.submit(screen.getByRole('button', { name: 'Create Applicant' }).closest('form')!);
    expect(form.handleSubmit).toHaveBeenCalledOnce();
});

test('disables submit and shows saving while submitting', () => {
    let form!: ApplicantForm;
    render(<FormHarness submitting onForm={(value) => { form = value; }} />);
    renderPage('create', form);
    expect(screen.getByRole('button', { name: 'Saving...' })).toBeDisabled();
});

test('allows clean navigation and blocks dirty navigation', async () => {
    let cleanForm!: ApplicantForm;
    render(<FormHarness onForm={(value) => { cleanForm = value; }} />);
    const cleanRouter = createMemoryRouter([
        { path: '/form', element: <ApplicantFormPage form={cleanForm} mode="create" cancelTo="/home" /> },
        { path: '/home', element: <div>Home</div> },
    ], { initialEntries: ['/form'] });
    render(<RouterProvider router={cleanRouter} />);
    fireEvent.click(screen.getByRole('link', { name: /back to applicants/i }));
    await waitFor(() => expect(screen.getByText('Home')).toBeInTheDocument());
    cleanup();

    let dirtyForm!: ApplicantForm;
    render(<FormHarness dirty onForm={(value) => { dirtyForm = value; }} />);
    const dirtyRouter = createMemoryRouter([
        { path: '/form', element: <ApplicantFormPage form={dirtyForm} mode="create" cancelTo="/home" /> },
        { path: '/home', element: <div>Home</div> },
    ], { initialEntries: ['/form'] });
    render(<RouterProvider router={dirtyRouter} />);
    fireEvent.click(screen.getAllByRole('link', { name: /back to applicants/i }).at(-1)!);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
});

test('Stay resets and Leave proceeds for blocked navigation', async () => {
    let form!: ApplicantForm;
    render(<FormHarness dirty onForm={(value) => { form = value; }} />);
    const router = createMemoryRouter([
        { path: '/form', element: <ApplicantFormPage form={form} mode="create" cancelTo="/home" /> },
        { path: '/home', element: <div>Home</div> },
    ], { initialEntries: ['/form'] });
    render(<RouterProvider router={router} />);
    fireEvent.click(screen.getByRole('link', { name: /back to applicants/i }));
    const dialog = await screen.findByRole('dialog');
    fireEvent.click(screen.getByRole('button', { name: 'Stay' }));
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
    fireEvent.click(screen.getByRole('link', { name: /back to applicants/i }));
    fireEvent.click(await screen.findByRole('button', { name: 'Leave' }));
    await waitFor(() => expect(screen.getByText('Home')).toBeInTheDocument());
});
