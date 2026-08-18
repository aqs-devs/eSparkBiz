import { useState } from 'react';
import { toast } from 'sonner';
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
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (isDeleting) {
            return;
        }
    
        setIsDeleting(true);
    
        try {
            await deleteApplicant(applicantId);
    
            onDeleted?.();
    
            toast.success('Applicant deleted', {
                action: {
                    label: 'Undo',
                    onClick: async () => {
                        try {
                            await restoreApplicant(applicantId);
                            onRestored?.();
                            toast.success('Applicant restored');
                        } catch {
                            toast.error('Could not restore applicant');
                        }
                    },
                },
            });
        } catch {
            toast.error('Could not delete applicant');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={isDeleting}
            onClick={handleDelete}
            aria-label="Delete applicant"
            title="Delete applicant"
        >
            <Trash2 className="size-4" />
        </Button>
    );
}