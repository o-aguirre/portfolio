import jsIcon from './../../assets/js.png'
import tailwindcssIcon from './../../assets/tailwind-css.png'
import reactIcon from './../../assets/react.png'
import springIcon from './../../assets/spring-boot.png'
import gitIcon from './../../assets/git.png'

const Skills = () => {
    return (
        <section id="skills" className="relative overflow-hidden flex flex-col text-white body-font">
            <div className="container flex flex-wrap px-5 py-24 mx-auto items-center">
                <div data-aos="fade-up" data-aos-delay="200" className="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pd-10 border-b border-blue-900">
                    <h1 data-aos="fade-right" data-aos-delay="500" className="sm:text-4xl text-2xl font-medium title-font mb-2 text-white">Skills</h1>
                    <p data-aos="fade-right" data-aos-delay="500" className="leading-relaxed text-base">My name is Onésimo Aguirre, and I am currently a Software Development student at DuocUC. Although I don't have professional experience yet, I have dedicated my studies to building a solid foundation in full-stack development.
                        
                        I enjoy creating both robust server-side logic with Java and Spring Boot, as well as modern, interactive user interfaces with React. My knowledge of SQL allows me to manage data efficiently, and I use Git as a fundamental tool for an organized and collaborative workflow.

                        I am actively seeking an opportunity to apply my skills, learn from an experienced team, and contribute to challenging projects..</p>
                </div>
                <div data-aos="fade-left" data-aos-delay="500" className="flex flex-col md:w-1/2 md:pl-12">
                    <nav className="flex flex-wrap list-none">
                        <li className="lg:w-1/3 mb-4 w-1/2">
                            <img src={tailwindcssIcon} alt="" className="rounded-full w-24 h-24 object-cover" />
                        </li>
                        <li className="lg:w-1/3 mb-4 w-1/2">
                            <img src={jsIcon} alt="" className="rounded-full w-24 h-24 object-cover" />
                        </li>
                        <li className="lg:w-1/3 mb-4 w-1/2">
                            <img src={reactIcon} alt="" className="rounded-full w-24 h-24 object-cover" />
                        </li>
                        <li className="lg:w-1/3 mb-4 w-1/2">
                            <img src={springIcon} alt="" className="rounded-full w-24 h-24 object-cover" />
                        </li>
                        <li className="lg:w-1/3 mb-4 w-1/2">
                            <img src={gitIcon} alt="" className="rounded-full w-24 h-24 object-cover" />
                        </li>
                    </nav>
                </div>
            </div>
        </section>
    )
}
export default Skills;