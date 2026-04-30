const variants = {
  primary:
    'bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25 dark:bg-gradient-to-r dark:from-violet-600 dark:to-blue-600 dark:shadow-violet-500/30 dark:hover:from-violet-500 dark:hover:to-blue-500 dark:hover:shadow-blue-500/25',
  secondary:
    'bg-white text-slate-800 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 dark:border-white/20 dark:bg-transparent dark:text-white dark:shadow-none dark:hover:border-white/35 dark:hover:bg-white/[0.06]',
  outline:
    'border-2 border-blue-600/80 text-blue-700 bg-transparent hover:bg-blue-50 dark:border-blue-500/60 dark:text-blue-400 dark:hover:bg-blue-950/40',
  ghost:
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-500',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-sm font-medium rounded-xl',
  lg: 'px-6 py-3 text-base font-medium rounded-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as = 'button',
  ...props
}) {
  const Tag = as
  return (
    <Tag
      className={`
        inline-flex items-center justify-center gap-2 font-medium transition-all duration-200
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:focus-visible:outline-blue-400
        disabled:pointer-events-none disabled:opacity-50
        ${variants[variant] ?? variants.primary}
        ${sizes[size] ?? sizes.md}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  )
}
