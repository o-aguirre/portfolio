import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../../lib/scrollToSection'

const NavLinkButton = ({ target, className, children }) => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleClick = () => {
        if (pathname === '/') {
            scrollToSection(target)
        } else {
            navigate('/', { state: { scrollTo: target } })
        }
    }

    return (
        <button type="button" onClick={handleClick} className={className}>
            {children}
        </button>
    )
}
export default NavLinkButton;
