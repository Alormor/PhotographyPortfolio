export function QuantityStepper({ value, onChange, min = 1, max = 10 }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-neutral-700 bg-surface/80 p-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition hover:bg-neutral-800 hover:text-text disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        −
      </button>
      <span
        className="w-8 text-center text-sm font-semibold text-text tabular-nums"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition hover:bg-neutral-800 hover:text-text disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        +
      </button>
    </div>
  )
}
