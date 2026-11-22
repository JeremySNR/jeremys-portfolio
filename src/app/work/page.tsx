import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import repositories from "@/components/work/public-repositories.json";
import "./WorkDirectory.css";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column className="work-index" fillWidth paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        Project archive.
      </Heading>
      <Projects selected={["clip-forge", "metachlorian", "modalore", "brink", "quillgon"]} />
      <Projects exclude={["clip-forge", "metachlorian", "modalore", "brink", "quillgon"]} />
      <section className="repo-directory" aria-labelledby="repo-heading">
        <h2 id="repo-heading">On GitHub.</h2>
        <p>My public repositories and contributions, grouped by what they do.</p>
        {repositories.map(({ label, repos }) => (
          <details key={label} open={label === "Recent builds"}>
            <summary>
              {label} <span>({repos.length})</span>
            </summary>
            <ul>
              {repos.map(({ name, url, summary }) => (
                <li key={url}>
                  <a href={url}>{name} ↗</a>
                  <p>{summary}</p>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </section>
    </Column>
  );
}
