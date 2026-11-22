import { ArchivePhoto } from "@/components/ArchivePhoto";
import { gallery } from "@/resources";

export default function GalleryView() {
  return (
    <div className="photo-grid">
      {gallery.images.map((image) => (
        <ArchivePhoto
          key={image.src}
          src={image.src}
          alt={image.alt}
          caption={image.alt}
          ratio={image.orientation === "horizontal" ? "3 / 2" : "4 / 5"}
        />
      ))}
    </div>
  );
}
