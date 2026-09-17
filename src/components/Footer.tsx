import Link from "next/link";
import { person, social, gallery, routes } from "@/resources";
import { LocalTime } from "./LocalTime";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const year = new Date().getFullYear();
  const links = social.filter((s) => s.link);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.left}>
            <p className={`display-m ${styles.line}`}>
              Say hello.
              <br />
              <a href={`mailto:${person.email}`} className={styles.email}>
                {person.email}
              </a>
            </p>
          </div>
          <ul className={styles.links}>
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
            {routes["/gallery"] && (
              <li>
                <Link href={gallery.path} className="link-under">
                  Photos
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className={`mono ${styles.bottom}`}>
          <span>
            © {year} {person.name}
          </span>
          <span className={styles.dot} aria-hidden="true">
            ·
          </span>
          <span>
            Leeds, England <LocalTime timeZone={person.location} />
          </span>
          <span className={styles.spacer} />
          <span>Set in Newsreader and Geist</span>
        </div>
      </div>
    </footer>
  );
};
