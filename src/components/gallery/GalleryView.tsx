"use client";

import Image from "next/image";
import { gallery } from "@/resources";
import styles from "./gallery.module.scss";

export default function GalleryView() {
  return (
    <ul className={styles.grid}>
      {gallery.images.map((image, index) => (
        <li
          key={image.src}
          className={`${styles.cell} ${image.orientation === "horizontal" ? styles.wide : styles.tall}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index < 4}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className={styles.img}
          />
        </li>
      ))}
    </ul>
  );
}
