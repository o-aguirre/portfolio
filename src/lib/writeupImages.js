const SCHEME = /^[a-z][a-z0-9+.-]*:/i
// eslint-disable-next-line no-control-regex
const UNSAFE = /[\\\u0000-\u001f\u007f]/

const withTrailingSlash = (base) => (base.endsWith('/') ? base : `${base}/`)

// URL parsing treats percent-encoded dots (`%2e%2e`) as `..`, so traversal is
// checked on the decoded path too. Malformed encodings are rejected.
const hasTraversal = (value) => {
  let decoded
  try {
    decoded = decodeURIComponent(value)
  } catch {
    return true
  }
  return [value, decoded].some((path) => path.split('/').includes('..'))
}

// Maps a markdown image `src` to a URL the site can serve, or null when the
// source must not be rendered. Relative paths live in
// `public/writeups/<slug>/`; only https absolute URLs are allowed.
export const resolveImageSrc = (slug, src, base = import.meta.env.BASE_URL) => {
  if (typeof src !== 'string') return null
  const value = src.trim()
  if (value === '' || UNSAFE.test(value)) return null
  if (hasTraversal(value)) return null
  if (value.startsWith('//')) return null

  const root = withTrailingSlash(base)
  if (value.startsWith('/')) return `${root}${value.slice(1)}`
  if (SCHEME.test(value)) return /^https:\/\/\S+$/i.test(value) ? value : null

  return `${root}writeups/${slug}/${value.replace(/^(\.\/)+/, '')}`
}
