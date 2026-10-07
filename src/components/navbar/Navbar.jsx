import NavLinkButton from './NavLinkButton'
import LanguageToggle from './LanguageToggle'
import { NAV_ITEMS } from '../../lib/sections'

const Navbar = () => {
    return (
        <header className="top-0 w-full z-50 bg-ansi-bg border-b border-ansi-raised font-mono">
            <div className="container mx-auto flex flex-wrap gap-3 p-5 flex-col md:flex-row items-center">
                <NavLinkButton target="home" className="text-lg font-bold break-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ansi-green">
                    <span className="text-ansi-green">o-aguirre@portfolio</span>
                    <span className="text-ansi-fg">:~$</span>
                </NavLinkButton>
                <nav aria-label="Primary" className="md:ml-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                    {
                        NAV_ITEMS.map((item) => (
                            <NavLinkButton key={item.target} target={item.target} className="text-ansi-fg hover:text-ansi-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ansi-green transition-colors duration-300 cursor-pointer">
                                {item.name}
                            </NavLinkButton>
                        ))
                    }
                    <span aria-hidden="true" className="text-ansi-raised">│</span>
                    <LanguageToggle />
                </nav>
            </div>
        </header>
    )
}
export default Navbar;
