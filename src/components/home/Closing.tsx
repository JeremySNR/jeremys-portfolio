import Image from "next/image";
import Link from "next/link";
import { home, person, about } from "@/resources";
import { SectionHead } from "@/components/SectionHead";
import styles from "./Closing.module.scss";

/**
 * A short, human close: a portrait and a few sentences, with the
 * full biography one click away.
 */
export function Closing() {
  if (!home.closing?.display) return null;
  return (
    <section className="container section" aria-labelledby="closing-title">
      <SectionHead label="In short" title={home.closing.title} id="closing-title" />
      <div className={styles.grid}>
        <div className={styles.portraitWrap}>
          <Image
            src={person.avatar}
            alt={`Portrait of ${person.name}`}
            width={480}
            height={480}
            sizes="(max-width: 767px) 40vw, 240px"
            className={`${styles.portrait} drift`}
          />
        </div>
        <div className={styles.text}>
          <p className={`lede ${styles.body}`}>{home.closing.body}</p>
          <Link href={about.path} className={`link ${styles.cta}`}>
            The longer version
          </Link>
        </div>
      </div>
    </section>
  );
}
