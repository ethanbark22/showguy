/** The SHOWGUY star. Yellow by default; use it sparingly as a small detail. */
export function Star({ className = "", fill = "var(--color-star)" }: { className?: string; fill?: string }) {
  return (
    <svg aria-hidden="true" viewBox="-1 -1 2 2" className={className} fill={fill}>
      <path d="M0-1 .29-.4.95-.31.47.16.59.81 0 .5-.59.81-.47.16-.95-.31-.29-.4Z" />
    </svg>
  );
}
