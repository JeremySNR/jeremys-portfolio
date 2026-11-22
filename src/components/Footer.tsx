import { person, social } from "@/resources";

export function Footer() {
  return (
    <footer className="broadcast-footer">
      <strong>Jeremy Smith</strong>
      <nav aria-label="Contact and social links">
        {social
          .filter((item) => item.link)
          .map((item) => (
            <a key={item.name} href={item.link}>
              {item.name}
            </a>
          ))}
        <a href="/api/rss">RSS</a>
      </nav>
      <small>
        © {new Date().getFullYear()} {person.name}
      </small>
    </footer>
  );
}
