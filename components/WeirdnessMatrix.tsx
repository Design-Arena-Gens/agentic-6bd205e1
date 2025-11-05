"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import { campaigns } from "../data/campaigns";

const Wrapper = styled.section`
  margin-bottom: 96px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 32px 28px 40px;
  border-radius: 28px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 15% 20%, rgba(95, 111, 255, 0.16), transparent 55%);
    pointer-events: none;
  }
`;

const Heading = styled.h2`
  margin: 0 0 16px;
  font-size: clamp(2rem, 4vw, 2.8rem);
`;

const Subheading = styled.p`
  margin: 0 0 30px;
  max-width: 600px;
  color: var(--muted);
  line-height: 1.65;
`;

const Matrix = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 18px;
`;

const Cell = styled(motion.div)`
  border-radius: 22px;
  padding: 18px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  min-height: 170px;
`;

const CellTitle = styled.div`
  font-weight: 600;
`;

const CellScore = styled.div`
  font-size: 2rem;
  margin-top: 6px;
  background: linear-gradient(120deg, rgba(95, 111, 255, 0.9), rgba(255, 209, 102, 0.9));
  -webkit-background-clip: text;
  color: transparent;
`;

const CellText = styled.p`
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.5;
  margin-top: 12px;
`;

const quadrants = [
  {
    title: "Spectacle",
    description: "Campaigns that forced attention by staging outrageous visual theater.",
    calc: () =>
      average(
        campaigns.filter((c) => c.weirdFactor >= 8.5).map((c) => c.weirdFactor * 11 + 34)
      )
  },
  {
    title: "Craft",
    description: "Absurd ideas anchored by meticulous execution and detail.",
    calc: () =>
      average(
        campaigns
          .filter((c) => c.tactics.some((t) => t.includes("prototype") || t.includes("engineering")))
          .map((c) => c.weirdFactor * 9 + 41)
      )
  },
  {
    title: "Lore",
    description: "Narratives that fans retell because the story is just that bizarre.",
    calc: () =>
      average(
        campaigns
          .filter((c) => c.signal.includes("lore") || c.story.includes("story"))
          .map((c) => c.weirdFactor * 10 + 27)
      )
  },
  {
    title: "Lift",
    description: "Measured business impact that justified the madness to finance teams.",
    calc: () =>
      average(
        campaigns.map((c) => {
          const factor = c.metric.includes("%") ? 85 : 72;
          return c.weirdFactor * 7 + factor;
        })
      )
  }
];

function average(values: number[]) {
  if (!values.length) return 0;
  return Math.round(values.reduce((acc, curr) => acc + curr, 0) / values.length);
}

export default function WeirdnessMatrix() {
  return (
    <Wrapper>
      <Heading>The Weirdness / Effectiveness Matrix</Heading>
      <Subheading>
        Weird campaigns win when the strangeness is weaponized to solve a strategic tension. Here’s
        how these six case studies score across four leverage points.
      </Subheading>
      <Matrix>
        {quadrants.map((quadrant, index) => (
          <Cell
            key={quadrant.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
          >
            <CellTitle>{quadrant.title}</CellTitle>
            <CellScore>{quadrant.calc()}</CellScore>
            <CellText>{quadrant.description}</CellText>
          </Cell>
        ))}
      </Matrix>
    </Wrapper>
  );
}
