import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { experiments } from '../experiments'

export default function Sidebar() {
  const [query, setQuery] = useState('')
  const filtered = experiments.filter(e =>
    e.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <aside className="flex w-56 flex-shrink-0 flex-col border-r border-white/10 bg-neutral-950">
      <div className="border-b border-white/10 px-4 py-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/90">
          Playground
        </p>
        <input
          type="text"
          placeholder="Search…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/50 outline-none placeholder:text-white/25 focus:border-white/20 focus:text-white/80"
        />
      </div>
      <nav className="flex flex-col gap-0.5 overflow-y-auto p-2">
        {filtered.map(e => (
          <NavLink
            key={e.slug}
            to={e.slug}
            className={({ isActive }) =>
              `rounded-md px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? 'bg-white/10 font-medium text-white/95'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/80'
              }`
            }
          >
            {e.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
