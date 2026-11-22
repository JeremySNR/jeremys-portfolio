import { ArchivePhoto } from "@/components/ArchivePhoto";
import { gallery } from "@/resources";

const descriptions: Record<string, string> = {
  "IMG-20250402-WA0027.jpg": "A panel discussion on the NetworKITT stage",
  "IMG-20251014-WA0001.jpg": "Jeremy talking with guests at an evening reception",
  "ROZ_8680.jpg": "Jeremy in the Force24 office",
  "PXL_20250319_123231055.jpg": "Jeremy at the Neural Voice exhibition stand",
  "1241067471_HIGH.jpg": "Jeremy holding a handheld device under violet stage lights",
  "PXL_20250916_170927338.jpg": "Jeremy with a colleague outside an event",
  "IMG20230809090847_01.jpg": "Jeremy outdoors holding an open laptop",
  "PXL_20251013_202014559.NIGHT.jpg": "Jeremy standing in the doorway of Number 10",
  "IMG-20221207-WA0034.jpg": "Jeremy presenting beside a projected slide",
  "1_20240223_121141_0000.png": "Neural Voice video on booking a sales meeting with AI",
  "20231121_103712_0000.png": "Jeremy pitching Sales Compass on a rollercoaster",
};

export default function GalleryView() {
  return (
    <div className="photo-grid">
      {gallery.images.map((image) => {
        const alt = descriptions[image.src.split("/").pop() || ""] || image.alt;
        return <ArchivePhoto key={image.src} src={image.src} alt={alt} caption={alt}
          ratio={image.orientation === "horizontal" ? "3 / 2" : "4 / 5"} />;
      })}
    </div>
  );
}
