import type { ReactNode } from "react";

/**
 * A small, safe Markdown renderer for journal articles. It supports headings
 * (## and ###), paragraphs, bullet and numbered lists, quotes, **bold**,
 * *italic*, `code` and [links](https://…). It never renders raw HTML.
 */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={k++}>{m[1]}</strong>);
    else if (m[2]) out.push(<em key={k++}>{m[2]}</em>);
    else if (m[3]) out.push(<code key={k++} className="rounded bg-paper/10 px-1.5 py-0.5 text-[0.9em]">{m[3]}</code>);
    else {
      const href = m[5];
      const ok = /^(https?:\/\/|mailto:|\/|#)/.test(href);
      out.push(
        ok ? (
          <a key={k++} href={href} className="font-bold text-lav underline underline-offset-4 hover:text-paper">
            {m[4]}
          </a>
        ) : (
          m[4]
        ),
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="space-y-6 text-lg leading-relaxed text-paper/90 sm:text-xl">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (/^###\s/.test(block)) return <h3 key={i} className="display pt-4 text-2xl text-paper sm:text-3xl">{inline(block.replace(/^###\s+/, ""))}</h3>;
        if (/^##\s/.test(block)) return <h2 key={i} className="display pt-6 text-3xl text-paper sm:text-4xl">{inline(block.replace(/^##\s+/, ""))}</h2>;
        if (lines.every((l) => /^[-*]\s/.test(l)))
          return (
            <ul key={i} className="space-y-2">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-violet" />
                  <span>{inline(l.replace(/^[-*]\s+/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        if (lines.every((l) => /^\d+\.\s/.test(l)))
          return (
            <ol key={i} className="list-decimal space-y-2 pl-6 marker:font-bold marker:text-violet">
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^\d+\.\s+/, ""))}</li>
              ))}
            </ol>
          );
        if (lines.every((l) => /^>\s?/.test(l)))
          return (
            <blockquote key={i} className="border-l-4 border-violet pl-5 text-paper/80">
              {inline(lines.map((l) => l.replace(/^>\s?/, "")).join(" "))}
            </blockquote>
          );
        return <p key={i}>{inline(lines.join(" "))}</p>;
      })}
    </div>
  );
}
