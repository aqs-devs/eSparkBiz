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
    onSuccess?: () => void;
} & (
    | {
          mode?: 'create';
          applicantId?: never;
      }
    | {
          mode: 'edit';
          applicantId: number;
      }
);

function validateBasicInfo(value: BasicInfoFormValues) {
    const result = CreateBasicInfoSchema.safeParse(value);

    if (!result.success) {
        return result.error.flatten().fieldErrors;
    }

    return undefined;
}

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
            onChange: ({ value }) => validateBasicInfo(value),

            onSubmit: ({ value }) => validateBasicInfo(value),
        },

        onSubmit: async ({ value }) => {
            const data = CreateBasicInfoSchema.parse(value);

            if (mode === 'create') {
                try {
                    await createApplicant(data);

                    onSuccess?.();
                    toast.success(t('messages.created'));
                    form.reset(data);
                } catch (error) {
                    toast.error(t('errors.createFailed'));

                    throw error;
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

                onSuccess?.();
                toast.success(t('messages.updated'));
                form.reset(data);
            } catch (error) {
                toast.error(t('errors.updateFailed'));

                throw error;
            }
        },
    });

    return form;
}

export type ApplicantForm = ReturnType<typeof useBasicInfoForm>;
