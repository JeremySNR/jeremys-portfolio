import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { baseURL, about, person, news } from "@/resources";
export async function generateMetadata() {
  return Meta.generate({
    title: news.title,
    description: news.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(news.title)}`,
    path: news.path,
  });
}

export default function News() {
  return (
    <Column className="press-index" maxWidth="l" paddingTop="24" gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={news.path}
        title={news.title}
        description={news.description}
        image={`/api/og/generate?title=${encodeURIComponent(news.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column maxWidth="s" gap="m">
        <Heading as="h1" className="broadcast-title" variant="display-strong-xl">
          In the news
        </Heading>
        <Text variant="heading-default-xl" onBackground="neutral-weak">
          {news.intro}
        </Text>
      </Column>

      <ul className="press-list">
        {news.items.map((item) => (
          <li key={item.link}>
            <a href={item.link}>
              <span className="archive-meta">{[item.tag, item.date].filter(Boolean).join(" · ")}</span>
              <strong>{item.outlet}</strong>
              <span className="press-headline">{item.title}</span>
              <span className="press-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </Column>
  );
}
