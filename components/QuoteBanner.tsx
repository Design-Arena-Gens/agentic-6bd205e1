"use client";

import { useEffect, useState } from "react";

const inspirationalQuotes = [
  "Normal is overrated. Stand out by being unapologetically odd.",
  "The boldest campaigns start where the rulebook ends.",
  "Weird is a strategic advantage when it's rooted in insight.",
  "Great marketing interrupts expectations with relevance and surprise."
];

export default function QuoteBanner() {
  const [quote, setQuote] = useState<string>("Loading inspiration…");

  useEffect(() => {
    setQuote(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]);
  }, []);

  return <div className="quote-banner">{quote}</div>;
}
