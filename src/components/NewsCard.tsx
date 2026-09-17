"use client";

import { useRef } from "react";
import { Column, Heading, Icon, Row, Tag, Text } from "@once-ui-system/core";
import styles from "./ProjectCard.module.scss";

interface NewsCardProps {
  outlet: string;
  title: string;
  date?: string;
  tag?: string;
  link: string;
}

export function NewsCard({ outlet, title, date, tag, link }: NewsCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--rx", `${((x / rect.width) - 0.5) * 4}deg`);
    el.style.setProperty("--ry", `${((y / rect.height) - 0.5) * -4}deg`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <a
      ref={ref}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ display: "block", textDecoration: "none", width: "100%", height: "100%" }}
    >
      <Column
        fillWidth
        gap="12"
        padding="l"
        background="surface"
        border="neutral-alpha-weak"
        radius="l"
        style={{ height: "100%" }}
      >
        <Row fillWidth horizontal="between" vertical="center" gap="8">
          {tag && (
            <Tag size="s" prefixIcon="newspaper">
              {tag}
            </Tag>
          )}
          {date && (
            <Text variant="label-default-s" onBackground="neutral-weak">
              {date}
            </Text>
          )}
        </Row>
        <Heading as="h3" variant="heading-strong-m">
          {outlet}
        </Heading>
        <Text variant="body-default-s" onBackground="neutral-weak" wrap="balance">
          {title}
        </Text>
        <Row gap="8" vertical="center" marginTop="4">
          <Text variant="label-default-s" onBackground="brand-weak">
            Read
          </Text>
          <Icon name="arrowUpRightFromSquare" size="xs" onBackground="brand-weak" />
        </Row>
      </Column>
    </a>
  );
}
