import NavLinkButton from './NavLinkButton'
import LanguageToggle from './LanguageToggle'

const listNavbar = [
    {name: './home', target: 'home'},
    {name: './writeups', target: 'writeups'},
    {name: './skills', target: 'skills'},
    {name: './contact', target: 'contact'}
];

const Navbar = () => {
    return (
        <header className="top-0 w-full z-50 bg-ansi-bg border-b border-ansi-raised font-mono">
            <div className="container mx-auto flex flex-wrap gap-3 p-5 flex-col md:flex-row items-center">
                <span className="text-lg font-bold break-all">
                    <span className="text-ansi-green">o-aguirre@portfolio</span>
                    <span className="text-ansi-fg">:~$</span>
                </span>
                <nav aria-label="Primary" className="md:mx-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                    {
                        listNavbar.map((item) => (
                            <NavLinkButton key={item.target} target={item.target} className="text-ansi-fg hover:text-ansi-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ansi-green transition-colors duration-300 cursor-pointer">
                                {item.name}
                            </NavLinkButton>
                        ))
                    }
                </nav>
                <LanguageToggle />
            </div>
        </header>
    )
}
export default Navbar;
