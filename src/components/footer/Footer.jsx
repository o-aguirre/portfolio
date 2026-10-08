const linkClass = "text-ansi-cyan hover:text-ansi-green focus-visible:outline-2 focus-visible:outline-ansi-green transition-colors"

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-ansi-bg border-t border-ansi-raised w-full font-mono">
            <div className="w-full mx-auto max-w-7xl p-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
                <span className="text-ansi-gray text-center break-words">
                    [exit 0] &copy; {year} o-aguirre
                </span>
                <a href="https://github.com/o-aguirre" target="_blank" rel="noreferrer" aria-label="GitHub profile" className={linkClass}>[github]</a>
                <a href="https://www.linkedin.com/in/onesimo-aguirre/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className={linkClass}>[linkedin]</a>
            </div>
        </footer>
    )
}
export default Footer;
