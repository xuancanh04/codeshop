function Star({ filled }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 ${filled ? 'text-amber-400' : 'text-slate-200 dark:text-slate-600'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export default function RatingStars({ value = 0, count, className = '' }) {
  const full = Math.min(5, Math.round(value))

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="flex" role="img" aria-label={`${value} out of 5 stars`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} filled={i < full} />
        ))}
      </span>
      {count != null && (
        <span className="text-sm text-slate-500 dark:text-slate-400">({count})</span>
      )}
    </div>
  )
}
