interface TableOfContentsProps {
  structure: { title: string; display: boolean; items: string[] }[];
  showSubItems: boolean;
}

export default function TableOfContents({ structure, showSubItems }: TableOfContentsProps) {
  return (
    <details className="about-contents">
      <summary>On this page</summary>
      <nav aria-label="About sections">
        {structure.filter((section) => section.display).map((section) => (
          <div key={section.title}>
            <a href={`#${encodeURIComponent(section.title)}`}>{section.title}</a>
            {showSubItems && section.items.map((item) => (
              <a className="contents-child" key={item} href={`#${encodeURIComponent(item)}`}>{item}</a>
            ))}
          </div>
        ))}
      </nav>
    </details>
  );
}
