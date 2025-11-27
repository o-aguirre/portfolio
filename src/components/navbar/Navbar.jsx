const Navbar = () => {

    const listNavbar = [
        {name: 'Home', link: '#home'},
        {name: 'Projects', link: '#projects'},
        {name: 'Skills', link: '#skills'},
        {name: 'Contact', link: '#contact'}
    ];

    return (
        <header className="top-0 w-full z-50 bg-black border-b border-gray-800">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <span className="ml-3 text-3xl font-bold text-white">Portfolio <span className="text-blue-700 drop-shadow-[0_0_20px_rgba(60,39,245,0.8)]">o-aguirre</span></span>
                </a>
                <nav className="md:ml-auto text-white text-base md:mr-auto flex flex-wrap items-center justify-center">
                    {
                        listNavbar.map((item, index) => (
                            <a key={index} href={item.link} className="mr-5 hover:text-blue-800 transition-colors duration-300 font-medium cursor-pointer">
                                {item.name}
                            </a>
                        ))
                    }
                </nav>
                <a href="#contact">
                    <button className="inline-flex items-center bg-black border border-gray-800 hover:border-blue-900 hover:drop-shadow-[0_0_20px_rgba(60,39,245,0.8)] hover:scale-103 py-2 px-6 rounded-full text-base mt-4 md:mt-0 text-white transition-all duration-300">
                        Contact me
                    </button>
                </a>
            </div>
        </header>
    )
}
export default Navbar;