import Navbar from "./../navbar/Navbar";
import CV from './../../assets/CV.pdf'
import me from './../../assets/o-aguirre.jpg'
import github from './../../assets/github-icon.png'
import linkedin from './../../assets/linkedin-icon.png'
import { ReactTyped } from "react-typed";

const Hero = () => {
    return (
        <div className="relative overflow-hidden min-h-[550px] sm:min-h-[660px] flex flex-col">

            <Navbar />
            <section data-aos="fade-up" data-aos-delay="250" className="text-white body-font z-10 pt-20">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center relative">
                        <h1 className="title-font sm:text-4xl text-4xl mb-4 font-bold text-white">Hi! I'm Onésimo</h1>
                        <ReactTyped
                            className="text-xl font-bold my-4 py-3 px-4 bg-linear-to-r from-blue-600/20 to-purple-600/20 rounded-lg inline-block"
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
                        <p className="mb-8 leading-relaxed text-gray-300 text-lg">A passionate Software Development student at DuocUC, focused on becoming a Full-Stack Developer. I specialize in building robust and dynamic solutions, connecting backend logic with Java and Spring Boot to frontend interactivity with React and JavaScript.</p>
                        <div className="mb-8 flex flex-row items-center gap-4">
                            <span className="text-gray-300">Social media links :</span>
                            <a href="https://github.com/o-aguirre" target="_blank" className="inline-block size-10 hover:scale-110 transition-all duration-300">
                                <img className="w-full h-full object-contain" src={github} alt="github icon" />
                            </a>
                            <a href="https://www.linkedin.com/in/onesimo-aguirre/" target="_blank" className="inline-block size-10 hover:scale-110 transition-all duration-300">
                                <img className="w-full h-full object-contain" src={linkedin} alt="linkedin icon" />
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <a href={CV} download>
                                <button className="inline-flex text-white bg-black border border-gray-800 hover:border-blue-900 py-2 px-6 focus:outline-none hover:drop-shadow-[0_0_20px_rgba(60,39,245,0.8)] hover:scale-103 rounded-full text-lg transition-all duration-300">
                                    Download CV
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img src={me} className="object-cover object-center rounded-full w-80 h-80 border border-gray-800 drop-shadow-[0_0_40px_rgba(60,39,245,0.4)] hover:drop-shadow-[0_0_50px_rgba(60,39,245,0.6)] transition-all duration-500" />
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Hero;