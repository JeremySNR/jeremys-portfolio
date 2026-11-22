import Link from "next/link";
import { about, home, news } from "@/resources";

export function ArchiveHighlights() {
  const { highlights, essays, press } = home;
  const papers = about.publications?.display ? about.publications.papers : [];
  return (
    <div className="archive-highlights">
      {highlights?.display && (
        <section aria-labelledby="work-in-numbers" className="archive-section">
          <h2 id="work-in-numbers">Work in numbers</h2>
          <dl className="archive-stats">
            {highlights.items.map(({ label, value }) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </section>
      )}
      {press?.display && (
        <section aria-labelledby="press-coverage" className="archive-section archive-press">
          <h2 id="press-coverage">{press.title}</h2>
          <ul>{press.outlets.map((outlet) => <li key={outlet}>{outlet}</li>)}</ul>
          <Link href={news.path}>Read the coverage <span aria-hidden="true">→</span></Link>
        </section>
      )}
      {(papers.length > 0 || essays?.display) && (
        <section aria-labelledby="research-essays" className="archive-section archive-reading">
          <h2 id="research-essays">Research &amp; essays</h2>
          {papers.map((paper) => (
            <a key={paper.link} href={paper.link}>
              <span className="archive-meta">{["Published paper", paper.venue, paper.date].filter(Boolean).join(" · ")}</span>
              <h3>{paper.title}</h3>
              {paper.description && <p>{paper.description}</p>}
              <span className="archive-read">Read the paper ↗</span>
            </a>
          ))}
          {essays?.display && essays.items.map((essay) => (
            <a key={essay.link} href={essay.link}>
              <span className="archive-meta">{essay.meta}</span>
              <h3>{essay.title} <span aria-hidden="true">↗</span></h3>
            </a>
          ))}
        </section>
      )}
    </div>
  );
}

export default ArchiveHighlights;
