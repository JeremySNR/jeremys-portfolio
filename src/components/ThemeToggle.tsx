"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@once-ui-system/core";
import styles from "./ThemeToggle.module.scss";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [current, setCurrent] = useState<"light" | "dark">("light");

  useEffect(() => {
    const read = () =>
      setCurrent(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
    read();
  }, [theme]);

  const next = current === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
        <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path className={styles.half} d="M10 3.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
      </svg>
    </button>
  );
};
