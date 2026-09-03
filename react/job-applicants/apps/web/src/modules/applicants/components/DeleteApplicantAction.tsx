import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import {
    deleteApplicant,
    restoreApplicant,
} from '@job-applicants/api-client';
import { Button } from '@job-applicants/ui/components/button';
import { Trash2 } from 'lucide-react';

type DeleteApplicantActionProps = {
    applicantId: number;
    onDeleted?: () => void;
    onRestored?: () => void;
};

export function DeleteApplicantAction({
    applicantId,
    onDeleted,
    onRestored,
}: DeleteApplicantActionProps) {
    const { t } = useTranslation('common');
    const { t: tBasicInfo } = useTranslation('basicInfo');
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (isDeleting) {
            return;
        }
    
        setIsDeleting(true);
    
        try {
            await deleteApplicant(applicantId);
    
            onDeleted?.();
    
            toast.success(tBasicInfo('messages.deleted'), {
                action: {
                    label: t('actions.undo'),
                    onClick: async () => {
                        try {
                            await restoreApplicant(applicantId);
                            onRestored?.();
                            toast.success(tBasicInfo('messages.restored'));
                        } catch {
                            toast.error(tBasicInfo('errors.restoreFailed'));
                        }
                    },
                },
            });
        } catch {
            toast.error(tBasicInfo('errors.deleteFailed'));
        } finally {
            setIsDeleting(false);
        }
    };

    const deleteLabel = tBasicInfo('actions.deleteApplicant');

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={isDeleting}
            onClick={handleDelete}
            aria-label={deleteLabel}
            title={deleteLabel}
        >
            <Trash2 className="size-4" />
        </Button>
    );
}
