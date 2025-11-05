"use client";

import styled from "styled-components";
import Hero from "../components/Hero";
import CampaignGrid from "../components/CampaignGrid";
import WeirdnessMatrix from "../components/WeirdnessMatrix";
import Playbook from "../components/Playbook";
import SignalRadar from "../components/SignalRadar";
import { campaigns } from "../data/campaigns";

const SectionHeading = styled.h2`
  margin: 0 0 18px;
  font-size: clamp(2.2rem, 4vw, 3rem);
`;

const Intro = styled.p`
  margin: 0 0 38px;
  color: var(--muted);
  max-width: 620px;
  line-height: 1.7;
`;

const Footer = styled.footer`
  margin-top: 120px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.85rem;
  text-align: center;
`;

export default function Page() {
  return (
    <>
      <Hero />
      <section>
        <SectionHeading>Six weird wins worth reverse-engineering</SectionHeading>
        <Intro>
          Each story below pairs the what (absurd creative swing) with the why (clear commercial
          payoff). Comb through for patterns: audience obsession, cultural timing, and bravely
          literal storytelling.
        </Intro>
        <CampaignGrid campaigns={campaigns} />
      </section>
      <WeirdnessMatrix />
      <SignalRadar />
      <Playbook />
      <Footer>
        Built to celebrate marketers who zigged when everyone zagged. Ship your own chaos—just make
        sure finance can graph the upside.
      </Footer>
    </>
  );
}
