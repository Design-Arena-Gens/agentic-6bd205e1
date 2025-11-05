"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import { Campaign } from "../data/campaigns";

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
  margin-bottom: 96px;
`;

const Card = styled(motion.article)`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 28px;
  border-radius: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }

  &::after {
    content: "";
    position: absolute;
    inset: -60% 30% 30% -60%;
    background: radial-gradient(circle at top left, rgba(95, 111, 255, 0.16), transparent 60%);
    pointer-events: none;
  }
`;

const TagRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: var(--muted);
`;

const Tag = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.07);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  letter-spacing: -0.01em;
`;

const Subtitle = styled.div`
  font-size: 0.95rem;
  color: var(--muted);
`;

const Metric = styled.div`
  background: linear-gradient(120deg, rgba(95, 111, 255, 0.28), rgba(255, 209, 102, 0.28));
  border-radius: 14px;
  padding: 10px 14px;
  font-size: 0.92rem;
  font-weight: 500;
`;

const Story = styled.p`
  margin: 0;
  font-size: 0.97rem;
  line-height: 1.65;
`;

const Signal = styled.blockquote`
  margin: 0;
  border-left: 3px solid rgba(255, 255, 255, 0.2);
  padding-left: 16px;
  color: rgba(255, 255, 255, 0.85);
  font-style: italic;
  font-size: 0.95rem;
`;

const TacticPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
`;

const Tactic = styled.span`
  font-size: 0.82rem;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
`;

type Props = {
  campaigns: Campaign[];
};

export default function CampaignGrid({ campaigns }: Props) {
  return (
    <Grid>
      {campaigns.map((campaign, index) => (
        <Card
          key={campaign.id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.05, duration: 0.55, ease: "easeOut" }}
        >
          <TagRow>
            <Tag>{campaign.brand}</Tag>
            <Tag>{campaign.year}</Tag>
            <Tag>{campaign.industry}</Tag>
            <Tag>{campaign.region}</Tag>
          </TagRow>
          <Title>{campaign.title}</Title>
          <Subtitle>{campaign.pitch}</Subtitle>
          <Metric>{campaign.metric}</Metric>
          <Story>{campaign.story}</Story>
          <Signal>Signal: {campaign.signal}</Signal>
          <TacticPills>
            {campaign.tactics.map((tactic) => (
              <Tactic key={tactic}>{tactic}</Tactic>
            ))}
          </TacticPills>
        </Card>
      ))}
    </Grid>
  );
}
