import { useEffect } from 'react';
import Hero from './components/hero/Hero';
import Projects from './components/projects/projects';
import Skills from './components/skills/Skills';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css'



const App = () => {

    useEffect(() => {
        AOS.init({
            duration:1000
        })
    }, [])

    return(
        <main className='bg-[#0d182e]'>
            <Hero />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </main>
    )
}
export default App;