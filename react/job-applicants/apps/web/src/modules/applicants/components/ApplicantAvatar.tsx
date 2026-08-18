import { Avatar, AvatarFallback, AvatarImage } from '@job-applicants/ui/components/avatar';
import { cn } from '@job-applicants/ui/utils';

type ApplicantAvatarProps = {
    firstName: string;
    lastName: string;
    src?: string;
    className?: string;
};

function getInitials(firstName: string, lastName: string) {
    return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

export function ApplicantAvatar({
    firstName,
    lastName,
    src,
    className,
}: ApplicantAvatarProps) {
    return (
        <Avatar className={cn('h-20 w-20', className)}>
            <AvatarImage src={src} alt={`${firstName} ${lastName}`} />
            <AvatarFallback>
                {getInitials(firstName, lastName)}
            </AvatarFallback>
        </Avatar>
    );
}