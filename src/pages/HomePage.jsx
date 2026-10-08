import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/hero/Hero'
import WriteupsSection from '../features/writeups/WriteupsSection'
import Skills from '../components/skills/Skills'
import Certs from '../components/certs/Certs'
import Timeline from '../components/timeline/Timeline'
import Contact from '../components/contact/Contact'
import Footer from '../components/footer/Footer'
import { scrollToSection } from '../lib/scrollToSection'
import { useLanguage } from '../i18n/useLanguage'

const HomePage = () => {
    const { state } = useLocation()
    const scrollTarget = state?.scrollTo
    const { t } = useLanguage()

    useEffect(() => {
        document.title = t('meta.title')
    }, [t])

    useEffect(() => {
        if (scrollTarget) scrollToSection(scrollTarget)
    }, [scrollTarget])

    return (
        <>
            <Hero />
            <WriteupsSection />
            <Skills />
            <Certs />
            <Timeline />
            <Contact />
            <Footer />
        </>
    )
}
export default HomePage;
