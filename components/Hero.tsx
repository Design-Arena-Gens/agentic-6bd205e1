"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.section`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  margin-bottom: 72px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.8rem, 6vw, 4.6rem);
  line-height: 1.04;
  margin: 0;
`;

const Accent = styled.span`
  background: linear-gradient(120deg, #5f6fff, #ffd166);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Description = styled(motion.p)`
  margin-top: 18px;
  font-size: 1.1rem;
  max-width: 540px;
  color: var(--muted);
  line-height: 1.68;
`;

const BadgeStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: center;

  @media (max-width: 960px) {
    align-self: stretch;
  }
`;

const Badge = styled(motion.div)`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 18px 22px;
  border-radius: 20px;
  backdrop-filter: blur(16px);
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.25);
`;

const BadgeTitle = styled.div`
  font-weight: 600;
  margin-bottom: 2px;
`;

const BadgeLabel = styled.div`
  font-size: 0.95rem;
  color: var(--muted);
`;

const heroStats = [
  {
    title: "6 wild campaigns",
    label: "Handpicked for measurable business impact."
  },
  {
    title: "Decoded frameworks",
    label: "Reusable lenses to design your next breakout stunt."
  },
  {
    title: "Zero fluff",
    label: "Each tale pairs spectacle with real metrics."
  }
];

export default function Hero() {
  return (
    <Container>
      <div>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Weird <Accent>won</Accent> because it solved a real business problem.
        </Title>
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
        >
          Explore the fringe campaigns that ignored the safe playbook to deliver revenue spikes,
          cultural resonance, and enduring lore. Every example maps back to the strategic tension it
          exploited.
        </Description>
      </div>
      <BadgeStack>
        {heroStats.map((stat, idx) => (
          <Badge
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <BadgeTitle>{stat.title}</BadgeTitle>
            <BadgeLabel>{stat.label}</BadgeLabel>
          </Badge>
        ))}
      </BadgeStack>
    </Container>
  );
}
