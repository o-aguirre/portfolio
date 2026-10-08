export function scrollToSection(id, doc = document, win = window) {
  const el = doc.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    return true
  }
  if (id === 'home') {
    win.scrollTo({ top: 0, behavior: 'smooth' })
    return true
  }
  return false
}
