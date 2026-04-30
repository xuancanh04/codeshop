export default function CategoryPills({ items, activeId, onSelect, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`
          whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all
          ${activeId == null
            ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-blue-500/25'
            : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800'}
        `}
      >
        All
      </button>
      {items.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onSelect(c.id)}
          className={`
            whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all
            ${activeId === c.id
              ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-blue-500/25'
              : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800'}
          `}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}
