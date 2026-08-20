import { NavLink } from "react-router";
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

const Logo = () => (
    <NavLink to="/">
      <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
    </NavLink>
);

const Header = () => {
    return (
      <header className="border-b bg-background">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-6">
              <Logo />

              <div className="flex items-center gap-3">
                  <LanguageSwitcher />
                  <ThemeToggle />
              </div>
          </div>
      </header>
    );
};

export default Header;
