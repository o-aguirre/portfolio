const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-ansi-bg border-t border-ansi-raised w-full font-mono">
            <div className="w-full mx-auto max-w-7xl p-4 flex items-center justify-center text-sm">
                <span className="text-ansi-gray text-center break-words">
                    [exit 0] &copy; {year} o-aguirre
                </span>
            </div>
        </footer>
    )
}
export default Footer;
