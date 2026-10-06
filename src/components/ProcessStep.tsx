export function ProcessStep({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <li className="reveal relative border-t border-paper/20 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
      <p aria-hidden="true" className="display text-8xl text-violet sm:text-9xl">
        {number}
      </p>
      <h3 className="display mt-2 text-3xl sm:text-4xl">
        <span className="sr-only">Step {number}: </span>
        {title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-paper/80 sm:text-lg">{body}</p>
    </li>
  );
}
