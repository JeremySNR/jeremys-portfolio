import { Column, SmartLink, Text } from "@once-ui-system/core";
import { home, news } from "@/resources";
import styles from "./PressStrip.module.scss";

/**
 * A quiet typographic roll-call of the outlets that have covered the work.
 * No logos, no carousel — just names set in the display serif, which reads
 * as confidence rather than a sales pitch.
 */
export function PressStrip() {
  if (!home.press?.display) return null;

  return (
    <Column fillWidth horizontal="center" gap="20" paddingY="8">
      <Text as="span" className={styles.label}>
        {home.press.title}
      </Text>
      <ul className={styles.outlets}>
        {home.press.outlets.map((outlet) => (
          <li key={outlet} className={styles.outlet}>
            {outlet}
          </li>
        ))}
      </ul>
      <SmartLink href={news.path} className={styles.readLink}>
        <Text variant="label-default-s" onBackground="neutral-weak" className={styles.readText}>
          Read the coverage →
        </Text>
      </SmartLink>
    </Column>
  );
}
