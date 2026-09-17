import { Column, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";
import { baseURL, about, person, news } from "@/resources";
import { NewsCard } from "@/components/NewsCard";
import { Reveal } from "@/components/Reveal";

export async function generateMetadata() {
  return Meta.generate({
    title: news.title,
    description: news.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(news.title)}`,
    path: news.path,
  });
}

const featuredOutlets = ["BBC", "WIRED", "The Washington Post", "NBC", "Fox News"];

export default function News() {
  return (
    <Column maxWidth="l" paddingTop="24" gap="xl" horizontal="center">
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

      <Column maxWidth="s" horizontal="center" align="center" gap="m">
        <Heading variant="display-strong-xl" align="center" wrap="balance">
          In the news
        </Heading>
        <Text variant="heading-default-xl" onBackground="neutral-weak" align="center" wrap="balance">
          {news.intro}
        </Text>
      </Column>

      <Row fillWidth wrap horizontal="center" gap="8">
        {featuredOutlets.map((outlet) => (
          <Tag key={outlet} size="l">
            {outlet}
          </Tag>
        ))}
      </Row>

      <Row fillWidth wrap gap="16" horizontal="center">
        {news.items.map((item, index) => (
          <Reveal
            key={`${item.outlet}-${item.title}`}
            delay={Math.min(index * 0.04, 0.4)}
            style={{ flex: "1 1 340px", maxWidth: "440px", display: "flex" }}
          >
            <NewsCard
              outlet={item.outlet}
              title={item.title}
              date={item.date}
              tag={item.tag}
              link={item.link}
            />
          </Reveal>
        ))}
      </Row>
    </Column>
  );
}
