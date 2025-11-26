const Footer = () => {

    const listNavbar = [
        {name: 'Home', link: '#'},
        {name: 'Projects', link: '#projects'},
        {name: 'Skills', link: '#skills'},
        {name: 'Contact', link: '#contact'},
    ]

    return (
        <footer className="bg-black border-t border-gray-800 w-full">
            <div className="w-full mx-auto max-w-7xl p-4 md:flex md:items-center md:justify-center">
                <span className="text-sm text-gray-200 sm:text-center">
                    2025 <a href="#" className="hover:underline">Portfolio o-aguirre</a>
                </span>
            </div>
        </footer>
    )
}
export default Footer;