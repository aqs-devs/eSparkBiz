import { NavLink } from "react-router";
import { ThemeToggle } from './ThemeToggle';


const Logo = () => (
    <NavLink to="/">
      <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
    </NavLink>
);

const Header = () => {

    return (
        <header className="border-b bg-background">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left */}
        {/* Left */}
        <Logo />
        {/* <nav className="flex items-center gap-6">
            <NavLink to="/applicants/basic-info">
                Basic Info
            </NavLink>

            <NavLink to="/applicants/education">
                Education
            </NavLink>

            <NavLink to="/applicants/experience">
                Experience
            </NavLink>

            <NavLink to="/applicants/technologies">
                Technologies
            </NavLink>
        </nav> */}

        {/* Right */}
        {/* <div className="flex items-center gap-3"> */}
            <ThemeToggle />
            {/* <UserMenu /> */}
        {/* </div> */}
    </div>
</header>
    );
};

export default Header;
