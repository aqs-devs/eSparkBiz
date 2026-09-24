import { NavLink } from "react-router";
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

const Logo = () => (
    <NavLink to="/" aria-label="Job Applicants home" className="shrink-0">
      <img
        src="/logo.png"
        alt="Job Applicants"
        className="h-8 w-auto object-contain dark:invert"
      />
    </NavLink>
);

const Header = () => {
    return (
      <header className="border-b bg-background">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6">
              <Logo />

              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                  <LanguageSwitcher />
                  <ThemeToggle />
              </div>
          </div>
      </header>
    );
};

export default Header;
