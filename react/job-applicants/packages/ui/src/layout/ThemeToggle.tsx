import { Button } from '@job-applicants/ui/components/button';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    const isDark = resolvedTheme === 'dark';
    const label = isDark ? 'Light mode' : 'Dark mode';

    return (
        <Button
            variant="outline"
            onClick={toggleTheme}
            aria-label={label}
            title={label}
        >
            {isDark ? <SunIcon aria-hidden="true" /> : <MoonIcon aria-hidden="true" />}
            <span className="max-[480px]:hidden">{label}</span>
        </Button>
    );
}
