import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  /** Use \n to break the headline onto separate lines. */
  title: string;
  id?: string;
  size?: "mega" | "huge" | "big" | "sm";
  className?: string;
  children?: ReactNode;
};

const sizes = { mega: "text-mega", huge: "text-huge", big: "text-big", sm: "text-[clamp(2rem,3.4vw,3.25rem)]" };

export function SectionHeading({ eyebrow, title, id, size = "huge", className = "", children }: Props) {
  const lines = title.split("\n");
  return (
    <div className={className}>
      {eyebrow && (
        <p className="mb-4 inline-block rounded-full border-2 border-current px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={`display ${sizes[size]} text-balance`}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>
      {children}
    </div>
  );
}
