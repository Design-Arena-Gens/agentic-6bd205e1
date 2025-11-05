"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.section`
  margin-bottom: 120px;
  display: grid;
  gap: 28px;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 28px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 3.2rem);
`;

const Description = styled.p`
  margin: 0;
  max-width: 520px;
  color: var(--muted);
  line-height: 1.6;
  font-size: 1rem;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
`;

const Card = styled(motion.article)`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 24px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 220px;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 8% 5%, rgba(255, 209, 102, 0.18), transparent 60%);
    pointer-events: none;
  }
`;

const StepNumber = styled.span`
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.3rem;
`;

const CardText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--muted);
`;

const steps = [
  {
    title: "Diagnose the tension",
    text: "Identify the boring assumption everyone in your category agrees on, then decide to break it publicly. Weirdness only lands when it resolves pent-up audience frustration."
  },
  {
    title: "Anchor in truth",
    text: "Collect a tangible artifact, number, or cultural moment that grounds the idea. Each case study uses an object (vending machine, chicken console) as the totem."
  },
  {
    title: "Design the lore loop",
    text: "Plan how the stunt travels: who retells it, how it embeds into social chatter, and where the receipts live. Lore requires pre-built breadcrumbs."
  },
  {
    title: "Instrument the upside",
    text: "Prepare the landing zones—promo codes, limited drops, or partnerships—so the spike converts into measurable revenue, not just applause."
  }
];

export default function Playbook() {
  return (
    <Wrapper>
      <Header>
        <Title>An oddball playbook you can steal</Title>
        <Description>
          Weird wins are not flukes. They blend brand bravery with operational readiness. Use this
          four-step framing to stress-test ideas before you pitch them upstairs.
        </Description>
      </Header>
      <Cards>
        {steps.map((step, index) => (
          <Card
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <StepNumber>Step {index + 1}</StepNumber>
            <CardTitle>{step.title}</CardTitle>
            <CardText>{step.text}</CardText>
          </Card>
        ))}
      </Cards>
    </Wrapper>
  );
}
