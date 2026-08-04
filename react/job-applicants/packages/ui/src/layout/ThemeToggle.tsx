import { Button } from "@job-applicants/ui/components/button";

export function ThemeToggle() {
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
    };

    return (
        <Button
            variant="outline"
            onClick={toggleTheme}
        >
            Toggle Theme
        </Button>
    )
}