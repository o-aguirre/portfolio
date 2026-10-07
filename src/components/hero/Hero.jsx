import Navbar from "./../navbar/Navbar";
import CV from './../../assets/CV.pdf'
import Fastfetch from "./Fastfetch";
import { useLanguage } from "../../i18n/useLanguage";

const linkClass = "text-ansi-cyan hover:text-ansi-green focus-visible:outline-2 focus-visible:outline-ansi-green transition-colors"

const Prompt = ({ children }) => (
    <p className="text-ansi-gray break-words">
        <span className="text-ansi-green">$</span> {children}
    </p>
)

const Hero = () => {
    const { t } = useLanguage()

    return (
        <div id="home" className="relative overflow-hidden min-h-[550px] sm:min-h-[660px] flex flex-col font-mono">

            <Navbar />
            <section data-aos="fade-up" data-aos-delay="250" className="text-ansi-fg z-10 pt-10">
                <div className="container mx-auto px-5 py-16">
                    <div className="w-full max-w-4xl mx-auto bg-ansi-surface border border-ansi-raised rounded-md shadow-[0_0_30px_rgba(0,179,104,0.08)]">
                        <div className="flex items-center gap-2 px-4 py-2 bg-ansi-raised">
                            <span className="size-3 rounded-full bg-ansi-red" aria-hidden="true" />
                            <span className="size-3 rounded-full bg-ansi-amber" aria-hidden="true" />
                            <span className="size-3 rounded-full bg-ansi-green" aria-hidden="true" />
                            <span className="ml-2 text-sm text-ansi-gray truncate">onesimo@portfolio: ~</span>
                        </div>
                        <div data-testid="terminal-body" className="p-5 space-y-8 text-left">
                            <div className="space-y-3">
                                <Prompt>whoami</Prompt>
                                <h1 className="text-3xl font-bold text-ansi-green break-words">{t('hero.title')}</h1>
                            </div>

                            <div className="space-y-3">
                                <Prompt>fastfetch</Prompt>
                                <Fastfetch />
                            </div>

                            <div className="space-y-3">
                                <Prompt>cat about.txt</Prompt>
                                <div className="space-y-3">
                                    <p className="leading-relaxed text-ansi-fg break-words">{t('hero.about.1')}</p>
                                    <p className="leading-relaxed text-ansi-fg break-words">{t('hero.about.2')}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Prompt>ls links/</Prompt>
                                <p className="flex flex-wrap gap-x-4 gap-y-1">
                                    <a href="https://github.com/o-aguirre" target="_blank" rel="noreferrer" aria-label={t('link.github')} className={linkClass}>[github]</a>
                                    <a href="https://www.linkedin.com/in/onesimo-aguirre/" target="_blank" rel="noreferrer" aria-label={t('link.linkedin')} className={linkClass}>[linkedin]</a>
                                </p>
                                <Prompt>
                                    <a
                                        href={CV}
                                        download
                                        className="text-ansi-amber hover:text-ansi-green focus-visible:outline-2 focus-visible:outline-ansi-green transition-colors"
                                    >
                                        ./download_cv.sh
                                    </a>
                                </Prompt>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Hero;
