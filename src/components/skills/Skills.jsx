import { skills as skillsData } from '../../data/skills'
import { writeups as writeupsRepo } from '../../features/writeups/index.js'
import { withWriteupCounts } from '../../lib/skillTree'
import { useLanguage } from '../../i18n/useLanguage'

const Skills = ({ categories = skillsData, writeups = writeupsRepo.list() }) => {
    const { t } = useLanguage()
    const tree = withWriteupCounts(categories, writeups)

    const countLabel = (count) =>
        count === 1
            ? t('skills.count.one')
            : t('skills.count.other').replace('{n}', () => String(count))

    return (
        <section id="skills" className="font-mono text-ansi-fg py-16">
            <div className="container mx-auto px-5">
                <h2 className="text-lg mb-6 break-words">
                    <span className="text-ansi-green">$</span> tree skills/
                </h2>
                <ul>
                    {tree.map((category, index) => (
                        <li key={category.id}>
                            <span aria-hidden="true" className="text-ansi-gray">
                                {index === tree.length - 1 ? '└── ' : '├── '}
                            </span>
                            <span className="text-ansi-cyan">{category.id}/</span>
                            <p className="pl-6 break-words">
                                <span aria-hidden="true" className="text-ansi-gray">
                                    {index === tree.length - 1 ? '    └── ' : '│   └── '}
                                </span>
                                {category.items.map((item, itemIndex) => (
                                    <span key={item.name}>
                                        {itemIndex > 0 && (
                                            <span aria-hidden="true" className="text-ansi-gray"> · </span>
                                        )}
                                        <span>{item.name}</span>
                                        {item.count > 0 && (
                                            <span
                                                role="img"
                                                aria-label={countLabel(item.count)}
                                                className="text-ansi-amber"
                                            >
                                                {' '}({item.count})
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default Skills;
