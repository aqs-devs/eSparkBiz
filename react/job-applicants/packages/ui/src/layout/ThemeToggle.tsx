import { Button } from '@job-applicants/ui/components/button';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Button
            variant="outline"
            onClick={toggleTheme}
        >
            Toggle Theme
        </Button>
    );
}