import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/hero/Hero'
import Projects from '../components/projects/Projects'
import Skills from '../components/skills/Skills'
import Contact from '../components/contact/Contact'
import Footer from '../components/footer/Footer'
import { scrollToSection } from '../lib/scrollToSection'

const HomePage = () => {
    const { state } = useLocation()
    const scrollTarget = state?.scrollTo

    useEffect(() => {
        if (scrollTarget) scrollToSection(scrollTarget)
    }, [scrollTarget])

    return (
        <>
            <Hero />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
        </>
    )
}
export default HomePage;
