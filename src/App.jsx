import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'
import HomePage from './pages/HomePage'

const WriteupPage = lazy(() => import('./features/writeups/WriteupPage'))

const NotFound = () => (
    <p className="font-mono text-ansi-red p-5">bash: command not found (404)</p>
)

const App = () => {

    useEffect(() => {
        AOS.init({
            duration:1000
        })
    }, [])

    return(
        <main className='bg-[#000000]'>
            <Suspense fallback={<p className="font-mono text-ansi-gray p-5">loading...</p>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/writeups/:slug" element={<WriteupPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </main>
    )
}
export default App;
