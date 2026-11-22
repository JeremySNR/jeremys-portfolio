"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  src: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  caption?: string;
}

export function ArchivePhoto({ src, alt, ratio, sizes = "(max-width: 700px) 92vw, 640px", caption }: Props) {
  const [viewed, setViewed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <figure className="archive-photo">
      <button type="button" aria-label={`Enlarge: ${alt}`} onClick={() => { setViewed(true); dialog.current?.showModal(); }}>
        <Image src={src} alt={alt} width={1000} height={667} sizes={sizes}
          style={{ aspectRatio: ratio || "auto", objectFit: ratio ? "cover" : "contain" }} />
      </button>
      {caption && <figcaption>{caption}</figcaption>}
      <dialog ref={dialog} aria-label={alt} onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }}>
        <button type="button" className="photo-close" onClick={() => dialog.current?.close()}>Close ×</button>
        {viewed && <img src={src} alt={alt} />}
      </dialog>
    </figure>
  );
}
