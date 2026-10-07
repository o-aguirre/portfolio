import Navbar from "./../navbar/Navbar";
import CV from './../../assets/CV.pdf'
import Fastfetch from "./Fastfetch";
import { toHexdump } from "../../lib/hexdump";

const hello = toHexdump('hello, friend.').join('\n')

const linkClass = "text-ansi-cyan hover:text-ansi-green focus-visible:outline-2 focus-visible:outline-ansi-green transition-colors"

const Prompt = ({ children }) => (
    <p className="text-ansi-gray break-words">
        <span className="text-ansi-green">$</span> {children}
    </p>
)

const Hero = () => {
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
                        <div className="p-5 space-y-3 text-left">
                            <div className="hidden md:block space-y-3">
                                <Prompt>xxd hello.txt</Prompt>
                                <pre aria-hidden="true" className="text-sm text-ansi-green">{hello}</pre>
                            </div>

                            <Prompt>whoami</Prompt>
                            <h1 className="text-3xl font-bold text-ansi-green break-words">Hi! I'm mephibosheth</h1>

                            <Prompt>fastfetch --logo none</Prompt>
                            <Fastfetch />

                            <Prompt>cat about.txt</Prompt>
                            <div className="space-y-3">
                                <p className="leading-relaxed text-ansi-fg break-words">Estudiante de Ingeniería Informática apasionado por la ciberseguridad. Durante mi formación he trabajado con diversos lenguajes de programación, diseño de aplicaciones e integración de IA, lo que me ha dado una visión profunda de cómo funcionan los sistemas por dentro.</p>
                                <p className="leading-relaxed text-ansi-fg break-words">Descubrí mi verdadera vocación en la ciberseguridad y he volcado mi enfoque en dominar esta disciplina. Participo activamente en los tracks de formación de Duoc UC y compito en cada CTF que puedo, conectando con la comunidad y reforzando mis conocimientos técnicos en entornos prácticos.</p>
                                <p className="leading-relaxed text-ansi-fg break-words">En constante evolución y aprendizaje, con el objetivo firme de convertirme en un profesional integral.</p>
                            </div>

                            <Prompt>ls links/</Prompt>
                            <p className="flex flex-wrap gap-x-4 gap-y-1">
                                <a href="https://github.com/o-aguirre" target="_blank" rel="noreferrer" aria-label="GitHub profile" className={linkClass}>[github]</a>
                                <a href="https://www.linkedin.com/in/onesimo-aguirre/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className={linkClass}>[linkedin]</a>
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
            </section>
        </div>
    )
}
export default Hero;
