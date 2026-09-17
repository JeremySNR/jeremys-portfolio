"use client";

import { useEffect, useState } from "react";

/** Renders the current time in a time zone, ticking once a minute. */
export function LocalTime({ timeZone, locale = "en-GB" }: { timeZone: string; locale?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone, locale]);

  return (
    <span suppressHydrationWarning className="tnum">
      {time}
    </span>
  );
}
