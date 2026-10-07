import jsIcon from './../../assets/js.png'
import tailwindcssIcon from './../../assets/tailwind-css.png'
import reactIcon from './../../assets/react.png'
import springIcon from './../../assets/spring-boot.png'
import gitIcon from './../../assets/git.png'
import { useLanguage } from '../../i18n/useLanguage'

const Skills = () => {
    const { t } = useLanguage()

    const skills = [
        { name: 'JavaScript', icon: jsIcon },
        { name: 'Tailwind CSS', icon: tailwindcssIcon },
        { name: 'React', icon: reactIcon },
        { name: 'Spring Boot', icon: springIcon },
        { name: 'Git', icon: gitIcon }
    ];

    return (
        <section id="skills" className="relative overflow-hidden flex flex-col font-mono text-ansi-fg">
            <div className="container flex flex-wrap px-5 py-24 mx-auto items-center">
                <div data-aos="fade-up" data-aos-delay="200" className="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-ansi-raised">
                    <h2 data-aos="fade-right" data-aos-delay="500" className="text-2xl sm:text-3xl font-bold mb-4 break-words">
                        <span className="text-ansi-green">$</span> ls skills/
                    </h2>
                    <p data-aos="fade-right" data-aos-delay="500" className="leading-relaxed text-base text-ansi-gray">{t('skills.about')}</p>
                </div>
                <div data-aos="fade-left" data-aos-delay="500" className="md:w-1/2 md:pl-12">
                    <ul className="flex flex-wrap gap-4 justify-center md:justify-start">
                        {skills.map((skill) => (
                            <li
                                key={skill.name}
                                className="flex items-center gap-3 px-4 py-3 bg-ansi-surface border border-ansi-raised hover:border-ansi-green transition-colors duration-300 group"
                            >
                                <img
                                    src={skill.icon}
                                    alt=""
                                    className="w-8 h-8 object-contain"
                                />
                                <span className="text-sm text-ansi-fg group-hover:text-ansi-green transition-colors duration-300">
                                    {skill.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
export default Skills;
