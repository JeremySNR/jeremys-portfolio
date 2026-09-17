import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container" style={{ paddingBlock: "clamp(5rem, 14vw, 10rem)" }}>
      <div className="grid">
        <div className="mono" style={{ gridColumn: "1 / span 3", paddingTop: "0.6rem" }}>
          404
        </div>
        <div style={{ gridColumn: "4 / span 8" }}>
          <h1 className="display-l" style={{ margin: "0 0 1.25rem" }}>
            Nothing here.
          </h1>
          <p className="lede" style={{ margin: "0 0 2rem" }}>
            The page you were after doesn&apos;t exist, or has moved.
          </p>
          <Link href="/" className="link" style={{ fontSize: "0.9375rem" }}>
            Back to the start
          </Link>
        </div>
      </div>
    </section>
  );
}
