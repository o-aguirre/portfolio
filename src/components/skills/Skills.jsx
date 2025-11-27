import jsIcon from './../../assets/js.png'
import tailwindcssIcon from './../../assets/tailwind-css.png'
import reactIcon from './../../assets/react.png'
import springIcon from './../../assets/spring-boot.png'
import gitIcon from './../../assets/git.png'

const Skills = () => {

    const skills = [
        { name: 'JavaScript', icon: jsIcon },
        { name: 'Tailwind CSS', icon: tailwindcssIcon },
        { name: 'React', icon: reactIcon },
        { name: 'Spring Boot', icon: springIcon },
        { name: 'Git', icon: gitIcon }
    ];

    return (
        <section id="skills" className="relative overflow-hidden flex flex-col text-white body-font">
            <div className="container flex flex-wrap px-5 py-24 mx-auto items-center">
                <div data-aos="fade-up" data-aos-delay="200" className="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pd-10 border-b border-gray-800">
                    <h1 data-aos="fade-right" data-aos-delay="500" className="sm:text-4xl text-2xl font-medium title-font mb-2 text-white">Skills</h1>
                    <p data-aos="fade-right" data-aos-delay="500" className="leading-relaxed text-base">My name is Onésimo Aguirre, and I am currently a Software Development student at DuocUC. Although I don't have professional experience yet, I have dedicated my studies to building a solid foundation in full-stack development.
                        I enjoy creating both robust server-side logic with Java and Spring Boot, as well as modern, interactive user interfaces with React. My knowledge of SQL allows me to manage data efficiently, and I use Git as a fundamental tool for an organized and collaborative workflow.
                        I am actively seeking an opportunity to apply my skills, learn from an experienced team, and contribute to challenging projects..</p>
                </div>
                <div data-aos="fade-left" data-aos-delay="500" className="md:w-1/2 md:pl-12">
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 px-5 py-3 bg-gray-800/50 border border-gray-800 rounded-full hover:border-blue-900 hover:bg-blue-900/20 transition-all duration-300 group"
                            >
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                                <span className="text-sm font-medium text-gray-300 group-hover:text-blue-400 transition-colors duration-300">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Skills;