import Navbar from "./../navbar/Navbar";
import CV from './../../assets/CV.pdf'
import me from './../../assets/o-aguirre.jpg'
import { ReactTyped } from "react-typed";

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
                <div className="container mx-auto flex px-5 py-16 md:flex-row flex-col items-center gap-10">
                    <div className="w-full md:w-3/5 bg-ansi-surface border border-ansi-raised rounded-md shadow-[0_0_30px_rgba(0,179,104,0.08)]">
                        <div className="flex items-center gap-2 px-4 py-2 bg-ansi-raised">
                            <span className="size-3 rounded-full bg-ansi-red" aria-hidden="true" />
                            <span className="size-3 rounded-full bg-ansi-amber" aria-hidden="true" />
                            <span className="size-3 rounded-full bg-ansi-green" aria-hidden="true" />
                            <span className="ml-2 text-sm text-ansi-gray truncate">onesimo@portfolio: ~</span>
                        </div>
                        <div className="p-5 space-y-3 text-left">
                            <Prompt>whoami</Prompt>
                            <h1 className="text-3xl font-bold text-ansi-green break-words">Hi! I'm Onésimo</h1>
                            <p className="text-xl font-bold text-ansi-cyan break-words">
                                <span className="text-ansi-green">&gt; </span>
                                <ReactTyped
                                    strings={[
                                        "Full-Stack Developer",
                                        "Continuos Learner",
                                        "Problem Solver",
                                        "Team Player"
                                    ]}
                                    typeSpeed={50}
                                    backSpeed={30}
                                    loop
                                />
                            </p>
                            <Prompt>cat about.txt</Prompt>
                            <p className="leading-relaxed text-ansi-fg break-words">A passionate Software Development student at DuocUC, focused on becoming a Full-Stack Developer. I specialize in building robust and dynamic solutions, connecting backend logic with Java and Spring Boot to frontend interactivity with React and JavaScript.</p>
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
                    <div className="md:w-2/5 w-5/6 flex justify-center items-center">
                        <img
                            src={me}
                            alt="Portrait of Onésimo Aguirre"
                            className="object-cover object-center rounded-md w-72 h-72 max-w-full border border-ansi-raised shadow-[0_0_30px_rgba(0,179,104,0.15)] hover:shadow-[0_0_40px_rgba(0,179,104,0.3)] transition-shadow duration-500"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Hero;
