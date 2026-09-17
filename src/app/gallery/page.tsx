import { Meta, Schema } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person } from "@/resources";
import { PageIntro } from "@/components/PageIntro";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}

export default function Gallery() {
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <PageIntro
        label="Photos"
        count={gallery.images.length}
        title="Stages, studios and the odd hotel lobby."
        lede="Keynotes, interviews and the places the work has taken me."
      />
      <div className="container" style={{ paddingBottom: "var(--section)" }}>
        <GalleryView />
      </div>
    </>
  );
}
