export default function CategoryPills({ items, activeId, onSelect, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`
          cursor-pointer whitespace-nowrap rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-200
          ${
            activeId == null
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-105'
              : 'border border-slate-200/90 bg-white/90 text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
          }
        `}
      >
        Tất cả
      </button>
      {items.map((c) => {
        const isActive = activeId === c.id
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            className={`
              cursor-pointer whitespace-nowrap rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-200
              ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-105'
                  : 'border border-slate-200/90 bg-white/90 text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
              }
            `}
          >
            {c.label}
          </button>
        )
      })}
    </div>
  )
}

