import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { WorkIndex } from "@/components/work/WorkIndex";
import { getAllWork } from "@/components/work/getWorkIndex";
import { PageIntro } from "@/components/PageIntro";

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
  const items = getAllWork();
  return (
    <>
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
      <PageIntro
        label="Work"
        count={items.length}
        title="Ventures, in-house programmes, open source and research."
        lede="Everything here was built to be used by someone other than me. Newest first; the ventures and the world-firsts are where the bigger stories live."
      />
      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <WorkIndex items={items} />
      </section>
    </>
  );
}
