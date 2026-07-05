import { Button, Column, Row, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./ContactCta.module.scss";

/**
 * The closing move: one oversized serif line and two ways to get in touch.
 */
export function ContactCta() {
  const linkedin = social.find((item) => item.name === "LinkedIn");

  return (
    <Column fillWidth horizontal="center" gap="24" className={styles.wrap}>
      <Text as="span" className={styles.kicker}>
        Get in touch
      </Text>
      <h2 className={styles.headline}>
        Building something <em>with AI?</em>
        <br />
        Let&apos;s talk.
      </h2>
      <Text
        align="center"
        wrap="balance"
        onBackground="neutral-weak"
        variant="body-default-m"
        className={styles.sub}
      >
        Whether it&apos;s an AI strategy that needs an owner, a product that needs taking to market,
        or a partnership worth exploring — I&apos;m always up for a conversation.
      </Text>
      <Row gap="12" horizontal="center" wrap paddingTop="8">
        <Button href={`mailto:${person.email}`} variant="primary" size="m" arrowIcon>
          Email me
        </Button>
        {linkedin && (
          <Button href={linkedin.link} variant="secondary" size="m" prefixIcon="linkedin">
            Connect on LinkedIn
          </Button>
        )}
      </Row>
    </Column>
  );
}
