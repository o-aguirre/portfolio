import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'
import HomePage from './pages/HomePage'
import { useLanguage } from './i18n/useLanguage'

const WriteupPage = lazy(() => import('./features/writeups/WriteupPage'))

const NotFound = () => {
    const { t } = useLanguage()
    return <p className="font-mono text-ansi-red p-5">{t('app.notFound')}</p>
}

const App = () => {
    const { t } = useLanguage()

    useEffect(() => {
        AOS.init({
            duration:1000
        })
    }, [])

    return(
        <main className='bg-ansi-bg'>
            <Suspense fallback={<p className="font-mono text-ansi-gray p-5">{t('app.loading')}</p>}>
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
