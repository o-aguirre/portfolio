// react-markdown does not hand the fence meta (the text after the language,
// e.g. `title="nmap"`) to components. Copy it onto a property so the code
// block component can read it as `data-meta`.
const walk = (node) => {
  if (node.type === 'element' && node.tagName === 'code' && node.data?.meta) {
    node.properties = { ...node.properties, dataMeta: node.data.meta }
  }
  node.children?.forEach(walk)
}

const rehypeFenceMeta = () => (tree) => walk(tree)

export default rehypeFenceMeta
