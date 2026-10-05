import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
      <p className="display text-mega">404</p>
      <h1 className="display text-big mt-4">That page has left the building.</h1>
      <ButtonLink href="/" className="mt-8">
        Back to the homepage
      </ButtonLink>
    </div>
  );
}
