import Image from "next/image";
import React from "react";
import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import { AboutNav } from "@/components/about/AboutNav";
import styles from "@/components/about/about.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function About() {
  const sections = [
    { title: about.intro.title, display: about.intro.display },
    { title: about.work.title, display: about.work.display },
    { title: about.recognition?.title ?? "", display: about.recognition?.display ?? false },
    { title: about.publications?.title ?? "", display: about.publications?.display ?? false },
    { title: about.talks?.title ?? "", display: about.talks?.display ?? false },
    { title: about.technical.title, display: about.technical.display },
    { title: about.studies.title, display: about.studies.display },
  ]
    .filter((s) => s.display && s.title)
    .map((s) => ({ ...s, id: slug(s.title) }));

  const links = social.filter((s) => s.link);

  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <div className={`container ${styles.page}`}>
        <header className={styles.header}>
          <div className={`mono ${styles.crumb} rise`} style={{ ["--i" as string]: 0 }}>
            About
          </div>
          <div className={styles.headMain}>
            <h1 className={`display-xl ${styles.name} rise`} style={{ ["--i" as string]: 1 }}>
              {person.name}
            </h1>
            <p className={`lede ${styles.role} rise`} style={{ ["--i" as string]: 2 }}>
              {person.role}. Based in Leeds, working across the UK.
            </p>
          </div>
        </header>

        <div className={styles.body}>
          <aside className={styles.rail}>
            <div className={styles.railInner}>
              {about.avatar.display && (
                <Image
                  src={person.avatar}
                  alt={`Portrait of ${person.name}`}
                  width={480}
                  height={480}
                  sizes="(max-width: 767px) 40vw, 220px"
                  priority
                  className={styles.portrait}
                />
              )}
              <ul className={styles.contacts}>
                {links.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.link}
                      className="link-under"
                      target={item.link.startsWith("http") ? "_blank" : undefined}
                      rel={item.link.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {item.name === "Website" ? "Neural Voice" : item.name}
                    </a>
                  </li>
                ))}
              </ul>
              {about.tableOfContent.display && <AboutNav sections={sections} />}
            </div>
          </aside>

          <div className={styles.main}>
            {about.intro.display && (
              <section id={slug(about.intro.title)} className={styles.section}>
                <p className={`lede ${styles.intro}`}>{about.intro.description}</p>
              </section>
            )}

            {about.work.display && (
              <section id={slug(about.work.title)} className={styles.section}>
                <h2 className={`display-m ${styles.h2}`}>{about.work.title}</h2>
                <ol className={styles.timeline}>
                  {about.work.experiences.map((exp) => (
                    <li key={`${exp.company}-${exp.role}`} className={styles.entry}>
                      <div className={`mono ${styles.when}`}>{exp.timeframe}</div>
                      <div className={styles.entryBody}>
                        <h3 className={`title ${styles.company}`}>{exp.company}</h3>
                        <div className={styles.entryRole}>{exp.role}</div>
                        <ul className={styles.achievements}>
                          {exp.achievements.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                        {exp.images && exp.images.length > 0 && (
                          <div className={styles.entryMedia}>
                            {exp.images.map((img) => (
                              <Image
                                key={img.src}
                                src={img.src}
                                alt={img.alt}
                                width={1200}
                                height={675}
                                sizes="(max-width: 767px) 100vw, 640px"
                                className={`${styles.entryImg} drift`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {about.recognition?.display && (
              <section id={slug(about.recognition.title)} className={styles.section}>
                <h2 className={`display-m ${styles.h2}`}>{about.recognition.title}</h2>
                <ul className={styles.rows}>
                  {about.recognition.items.map((item) => (
                    <li key={item.title} className={styles.row}>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className={`link-under ${styles.rowTitle}`}
                        >
                          {item.title}
                        </a>
                      ) : (
                        <span className={styles.rowTitle}>{item.title}</span>
                      )}
                      {item.meta && <span className={`mono ${styles.rowMeta}`}>{item.meta}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {about.publications?.display && (
              <section id={slug(about.publications.title)} className={styles.section}>
                <h2 className={`display-m ${styles.h2}`}>{about.publications.title}</h2>
                {about.publications.papers.map((paper) => (
                  <article key={paper.title} className={styles.paper}>
                    <div className={`mono ${styles.paperMeta}`}>
                      {paper.venue}
                      {paper.date ? ` · ${paper.date}` : ""}
                    </div>
                    <h3 className={`title ${styles.paperTitle}`}>
                      <a href={paper.link} target="_blank" rel="noreferrer" className="link">
                        {paper.title}
                      </a>
                    </h3>
                    {paper.description && (
                      <p className={styles.paperAbstract}>{paper.description}</p>
                    )}
                  </article>
                ))}
              </section>
            )}

            {about.talks?.display && (
              <section id={slug(about.talks.title)} className={styles.section}>
                <h2 className={`display-m ${styles.h2}`}>{about.talks.title}</h2>
                <ul className={styles.rows}>
                  {about.talks.items.map((item) => (
                    <li key={item.link} className={styles.row}>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className={`link-under ${styles.rowTitle}`}
                      >
                        {item.title}
                      </a>
                      {item.meta && <span className={`mono ${styles.rowMeta}`}>{item.meta}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {about.technical.display && (
              <section id={slug(about.technical.title)} className={styles.section}>
                <h2 className={`display-m ${styles.h2}`}>{about.technical.title}</h2>
                <div className={styles.skills}>
                  {about.technical.skills.map((skill) => (
                    <div key={skill.title} className={styles.skill}>
                      <h3 className={`title ${styles.skillTitle}`}>{skill.title}</h3>
                      <p className={styles.skillBody}>{skill.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {about.studies.display && (
              <section id={slug(about.studies.title)} className={styles.section}>
                <h2 className={`display-m ${styles.h2}`}>{about.studies.title}</h2>
                <ol className={styles.timeline}>
                  {about.studies.institutions.map((inst) => (
                    <li key={inst.name} className={styles.entry}>
                      <div className={`mono ${styles.when}`} />
                      <div className={styles.entryBody}>
                        <h3 className={`title ${styles.company}`}>{inst.name}</h3>
                        <p className={styles.entryText}>{inst.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
