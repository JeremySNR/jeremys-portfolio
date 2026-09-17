import { Meta, Schema } from "@once-ui-system/core";
import { home, about, person, baseURL, work } from "@/resources";
import { Hero } from "@/components/home/Hero";
import { Proof } from "@/components/home/Proof";
import { Range } from "@/components/home/Range";
import { Writing } from "@/components/home/Writing";
import { PressList } from "@/components/home/PressList";
import { Closing } from "@/components/home/Closing";
import { SectionHead } from "@/components/SectionHead";
import { WorkIndex } from "@/components/work/WorkIndex";
import { getFeaturedWork } from "@/components/work/getWorkIndex";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const featured = getFeaturedWork();

  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Hero />
      <Proof />

      <section className="container section" aria-labelledby="work-title">
        <SectionHead
          label="Selected work"
          count={featured.length}
          title="Things that made it to production."
          id="work-title"
          href={work.path}
          linkLabel="All work"
        />
        <WorkIndex items={featured} />
      </section>

      <Range />
      <Writing />
      <PressList />
      <Closing />
    </>
  );
}
