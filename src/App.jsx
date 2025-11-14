import { useEffect } from 'react';
import './App.css'
import Hero from './components/hero/Hero';
import Skills from './components/skills/Skills';
import AOS from 'aos';
import 'aos/dist/aos.css';



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
        </main>
    )
}
export default App;