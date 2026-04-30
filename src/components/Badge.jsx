const styles = {
  default:
    'bg-slate-100 text-slate-700 ring-slate-200/80 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700',
  primary:
    'bg-blue-50 text-blue-800 ring-blue-200/60 dark:bg-blue-950/60 dark:text-blue-200 dark:ring-blue-800',
  accent:
    'bg-violet-50 text-violet-800 ring-violet-200/60 dark:bg-violet-950/60 dark:text-violet-200 dark:ring-violet-800',
  success:
    'bg-emerald-50 text-emerald-800 ring-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-200 dark:ring-emerald-800',
  warning:
    'bg-amber-50 text-amber-900 ring-amber-200/70 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800',
}

export default function Badge({ children, tone = 'default', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset
        ${styles[tone] ?? styles.default}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
