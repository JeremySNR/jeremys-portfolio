import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Posts } from "@/components/blog/Posts";
import { NeuralField } from "@/components/effects/NeuralField";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/home/SectionLabel";
import { PressStrip } from "@/components/home/PressStrip";
import { Showcase } from "@/components/home/Showcase";
import { StatBand } from "@/components/home/StatBand";
import { ResearchPanel } from "@/components/home/ResearchPanel";
import { ContactCta } from "@/components/home/ContactCta";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <>
      <NeuralField />
      <Column
        maxWidth="m"
        gap="xl"
        paddingY="12"
        horizontal="center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={home.path}
          title={home.title}
          description={home.description}
          image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />

        {/* Hero */}
        <Column fillWidth horizontal="center" gap="m" paddingTop="24">
          <Column maxWidth="s" horizontal="center" align="center">
            {home.featured.display && (
              <RevealFx
                fillWidth
                horizontal="center"
                paddingTop="16"
                paddingBottom="32"
                paddingLeft="12"
              >
                <Badge
                  background="brand-alpha-weak"
                  paddingX="12"
                  paddingY="4"
                  onBackground="neutral-strong"
                  textVariant="label-default-s"
                  arrow={false}
                  href={home.featured.href}
                >
                  <Row paddingY="2">{home.featured.title}</Row>
                </Badge>
              </RevealFx>
            )}
            <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
              <Heading wrap="balance" variant="display-strong-xl">
                {home.headline}
              </Heading>
            </RevealFx>
            <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {home.subline}
              </Text>
            </RevealFx>
            <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
              <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                <Row gap="8" vertical="center" paddingRight="4">
                  {about.avatar.display && (
                    <Avatar
                      marginRight="8"
                      style={{ marginLeft: "-0.75rem" }}
                      src={person.avatar}
                      size="m"
                    />
                  )}
                  {about.title}
                </Row>
              </Button>
            </RevealFx>
          </Column>
        </Column>

        {/* Press */}
        <RevealFx translateY="12" delay={0.6}>
          <PressStrip />
        </RevealFx>

        {/* Selected work */}
        <Column fillWidth gap="l">
          <Reveal>
            <SectionLabel index="01" title="Selected work" href="/work" linkLabel="All work" />
          </Reveal>
          <Showcase />
        </Column>

        {/* The numbers */}
        <Reveal>
          <StatBand />
        </Reveal>

        {/* Research & writing */}
        <Column fillWidth gap="l">
          <Reveal>
            <SectionLabel
              index="02"
              title="Research & writing"
              href={routes["/blog"] ? "/blog" : undefined}
              linkLabel="All writing"
            />
          </Reveal>
          <Reveal>
            <ResearchPanel />
          </Reveal>
          {routes["/blog"] && (
            <Reveal delay={0.08}>
              <Posts range={[1, 2]} columns="2" />
            </Reveal>
          )}
        </Column>

        {/* Contact */}
        <Column fillWidth gap="l">
          <Reveal>
            <SectionLabel index="03" title="Contact" />
          </Reveal>
          <Reveal>
            <ContactCta />
          </Reveal>
        </Column>
      </Column>
    </>
  );
}
