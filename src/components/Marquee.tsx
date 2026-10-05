/** A scrolling strip of words. Duplicated once so the loop is seamless. */
export function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center">
          <span className="px-5 sm:px-8">{item}</span>
          <span aria-hidden="true" className="text-[0.7em]">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee overflow-hidden whitespace-nowrap ${className}`}>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
