import { useEffect } from 'react';
import Hero from './components/hero/Hero';
import Projects from './components/projects/Projects';
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
        <main className='bg-[#000000]'>
            <Hero />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
        </main>
    )
}
export default App;