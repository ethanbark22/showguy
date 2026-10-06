/**
 * A clearly-labelled box for photography that doesn't exist yet (artist
 * shots, content examples). Replace with <Image> once you have the photo.
 */
export function ImagePlaceholder({
  label = "Photo goes here",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`grid aspect-[4/3] place-items-center rounded-3xl border-2 border-dashed border-current/40 bg-ink/[0.06] p-4 text-center text-xs font-bold uppercase tracking-widest opacity-70 ${className}`}
    >
      {label}
    </div>
  );
}
