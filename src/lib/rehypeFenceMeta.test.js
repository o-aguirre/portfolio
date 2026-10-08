import { describe, it, expect } from 'vitest'
import rehypeFenceMeta from './rehypeFenceMeta'

const tree = (data) => ({
  type: 'root',
  children: [
    {
      type: 'element',
      tagName: 'pre',
      properties: {},
      children: [{ type: 'element', tagName: 'code', properties: {}, data, children: [] }],
    },
  ],
})
const codeOf = (root) => root.children[0].children[0]

describe('rehypeFenceMeta', () => {
  it('copies the fence meta onto the code element properties', () => {
    const root = tree({ meta: 'title="x"' })
    rehypeFenceMeta()(root)
    expect(codeOf(root).properties.dataMeta).toBe('title="x"')
  })

  it('leaves fences without meta untouched', () => {
    const root = tree(undefined)
    rehypeFenceMeta()(root)
    expect(codeOf(root).properties.dataMeta).toBeUndefined()
  })
})
