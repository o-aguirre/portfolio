import github from './../../assets/github-icon.png'
import linkedin from './../../assets/linkedin-icon.png'

const Footer = () => {

    const listNavbar = [
        { name: 'Home', link: '#' },
        { name: 'Projects', link: '#projects' },
        { name: 'Skills', link: '#skills' },
        { name: 'Contact', link: '#contact' },
    ]

    return (
        <footer className="bg-black border-t border-gray-800 w-full">
            <div className="w-full mx-auto max-w-7xl p-4 md:flex md:items-center md:justify-center gap-4">
                <span className="text-sm text-gray-200 sm:text-center">
                    2025 Portfolio o-aguirre
                </span>
                <a href="https://github.com/o-aguirre" target="_blank" className="size-6">
                    <img className="w-full h-full object-contain" src={github} alt="github icon" />
                </a>
                <a href="https://www.linkedin.com/in/onesimo-aguirre/" target="_blank" className="size-6">
                    <img className="w-full h-full object-contain" src={linkedin} alt="linkedin icon" />
                </a>
            </div>
        </footer>
    )
}
export default Footer;