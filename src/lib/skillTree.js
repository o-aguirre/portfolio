// Adds `count` (number of writeups sharing the item's tag) to every skill item.
export function withWriteupCounts(categories, writeups) {
  const tagCounts = new Map()
  for (const { tags = [] } of writeups) {
    for (const tag of new Set(tags.map((t) => t.toLowerCase()))) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
    }
  }
  return categories.map((category) => ({
    ...category,
    items: category.items.map((item) => ({
      ...item,
      count: item.tag ? (tagCounts.get(item.tag.toLowerCase()) ?? 0) : 0,
    })),
  }))
}
