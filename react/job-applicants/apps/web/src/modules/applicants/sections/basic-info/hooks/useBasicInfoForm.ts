// NOTE:
// form hook is simultaneously:
// - form management
// - validation
// - API orchestration
// - error handling
// - notification handling


import { useForm } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import { createApplicant, updateApplicant } from '@job-applicants/api-client';
import {
    CreateBasicInfoSchema,
    type BasicInfoFormValues,
} from '@job-applicants/schemas';
import { EMPTY_BASIC_INFO } from '#src/constants';
import { toast } from 'sonner';

type UseBasicInfoFormOptions = {
    defaultValues?: BasicInfoFormValues;
    mode?: 'create' | 'edit';
    applicantId?: number;
    onSuccess?: () => void;
};

export function useBasicInfoForm(
    options: UseBasicInfoFormOptions = {},
) {
    const { t } = useTranslation('basicInfo');
    const {
        defaultValues = EMPTY_BASIC_INFO,
        mode = 'create',
        applicantId,
        onSuccess,
    } = options;

    const form = useForm({
        defaultValues,

        validators: {
            onChange: CreateBasicInfoSchema,
            onSubmit: CreateBasicInfoSchema,
        },

        onSubmit: async ({ value }) => {
            const data = CreateBasicInfoSchema.parse(value);

            if (mode === 'create') {
                try {
                    await createApplicant(data);

                    form.reset(data);

                    onSuccess?.();
                    toast.success(t('messages.created'));
                } catch {
                    toast.error(t('errors.createFailed'));
                }

                return;
            }

            if (applicantId === undefined) {
                throw new Error(
                    'Applicant ID is required when editing an applicant.',
                );
            }

            try {
                await updateApplicant(applicantId, data);

                form.reset(data);

                onSuccess?.();
                toast.success(t('messages.updated'));
            } catch {
                toast.error(t('errors.updateFailed'));
            }
        },
    });

    return form;
}

export type ApplicantForm = ReturnType<typeof useBasicInfoForm>;
