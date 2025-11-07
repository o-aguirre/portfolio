import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Projects from './pages/Projects.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import './assets/styles/style.css'

const App = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/projects' element={<Projects />} />
            </Routes>
        </ BrowserRouter >
    )
}
export default App;