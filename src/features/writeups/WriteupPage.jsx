import { useParams } from 'react-router-dom'

const WriteupPage = () => {
    const { slug } = useParams()
    return <p className="font-mono text-ansi-gray p-5">writeups/{slug}.md</p>
}
export default WriteupPage;
