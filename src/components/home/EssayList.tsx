import { Column, Row, SmartLink, Text } from "@once-ui-system/core";
import { home } from "@/resources";
import styles from "./EssayList.module.scss";

/**
 * Featured essays published off-site (LinkedIn, Medium), listed as quiet
 * editorial rows under the research panel.
 */
export function EssayList() {
  if (!home.essays?.display || home.essays.items.length === 0) return null;

  return (
    <Column fillWidth gap="4" paddingX="s">
      {home.essays.items.map((essay) => (
        <Row
          key={essay.link}
          fillWidth
          horizontal="between"
          vertical="center"
          gap="16"
          paddingY="8"
          className={styles.row}
        >
          <SmartLink href={essay.link} suffixIcon="arrowUpRightFromSquare">
            <Text variant="heading-default-s">{essay.title}</Text>
          </SmartLink>
          {essay.meta && (
            <Text
              variant="label-default-s"
              onBackground="neutral-weak"
              style={{ whiteSpace: "nowrap" }}
            >
              {essay.meta}
            </Text>
          )}
        </Row>
      ))}
    </Column>
  );
}
