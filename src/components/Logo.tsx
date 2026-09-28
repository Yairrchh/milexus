export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-[1.5em] w-[1.5em]" aria-hidden="true">
        <rect width="32" height="32" rx="9" className="fill-ml-blue" />
        <path
          d="M16 5c.9 6.1 4.9 10.1 11 11-6.1.9-10.1 4.9-11 11-.9-6.1-4.9-10.1-11-11 6.1-.9 10.1-4.9 11-11Z"
          fill="#fff"
        />
        <circle cx="25" cy="7" r="1.8" fill="#fff" opacity="0.85" />
      </svg>
      <span className="font-extrabold tracking-tight text-ml-ink">
        Electro<span className="text-ml-blue">Nova</span>
      </span>
    </span>
  );
}
