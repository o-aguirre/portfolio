import { profile } from '../../data/profile'
import { toHexdump } from '../../lib/hexdump'

const hexdump = toHexdump('hello, friend.').join('\n')

const swatches = [
  'bg-ansi-bg',
  'bg-ansi-surface',
  'bg-ansi-raised',
  'bg-ansi-green',
  'bg-ansi-cyan',
  'bg-ansi-amber',
  'bg-ansi-red',
  'bg-ansi-gray',
]

const Fastfetch = () => (
  <div className="flex gap-6 items-start w-full text-sm">
    <pre aria-hidden="true" className="hidden md:block shrink-0 text-ansi-green">
      {hexdump}
    </pre>
    <div className="min-w-0 space-y-2">
      <p className="font-bold break-words">
        <span className="text-ansi-green">{profile.user}</span>
        <span className="text-ansi-fg">@</span>
        <span className="text-ansi-cyan">{profile.host}</span>
      </p>
      <p aria-hidden="true" className="text-ansi-gray">----</p>
      <dl className="space-y-1">
        {profile.fields.map(({ key, value }) => (
          <div key={key} className="flex flex-wrap gap-x-2">
            <dt className="font-bold text-ansi-cyan">{key}:</dt>
            <dd className="text-ansi-fg break-words min-w-0">{value}</dd>
          </div>
        ))}
      </dl>
      <div aria-hidden="true" className="flex pt-2">
        {swatches.map((bg) => (
          <span key={bg} className={`size-4 border border-ansi-raised ${bg}`} />
        ))}
      </div>
    </div>
  </div>
)

export default Fastfetch
