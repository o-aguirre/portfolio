import { profile } from '../../data/profile'

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
  <div className="w-full min-w-0 space-y-2 text-sm">
    <p className="font-bold whitespace-nowrap">
      <span className="text-ansi-green">{profile.user}</span>
      <span className="text-ansi-fg">@</span>
      <span className="text-ansi-cyan">{profile.host}</span>
    </p>
    <p aria-hidden="true" className="text-ansi-gray">{'-'.repeat(`${profile.user}@${profile.host}`.length)}</p>
    <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
      {profile.fields.map(({ key, value }) => (
        <div key={key} className="contents">
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
)

export default Fastfetch
