import { Line, Row, SmartLink, Text } from "@once-ui-system/core";
import styles from "./SectionLabel.module.scss";

/**
 * Editorial section marker: a numbered mono kicker, a hairline rule,
 * and an optional quiet link on the right.
 */
export function SectionLabel({
  index,
  title,
  href,
  linkLabel,
}: {
  index: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <Row fillWidth vertical="center" gap="16" paddingX="s">
      <Text as="span" className={styles.kicker}>
        <span className={styles.index}>{index}</span>
        {title}
      </Text>
      <Line background="neutral-alpha-weak" />
      {href && linkLabel && (
        <SmartLink href={href} className={styles.link}>
          <Text variant="label-default-s" onBackground="neutral-weak" className={styles.linkText}>
            {linkLabel}
          </Text>
        </SmartLink>
      )}
    </Row>
  );
}
