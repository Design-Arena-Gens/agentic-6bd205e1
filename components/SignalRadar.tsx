"use client";

import { useMemo, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { campaigns } from "../data/campaigns";

const Wrapper = styled.section`
  margin-bottom: 120px;
  display: grid;
  grid-template-columns: minmax(320px, 480px) minmax(260px, 1fr);
  gap: 40px;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 26px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.6rem);
`;

const Dropdown = styled.select`
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: var(--fg);
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 0.95rem;
  cursor: pointer;
`;

const Legend = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 14px;
`;

const LegendItem = styled.li`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 14px 16px;
  border-radius: 18px;
`;

const LegendTitle = styled.div`
  font-weight: 600;
`;

const LegendText = styled.p`
  margin: 6px 0 0;
  font-size: 0.92rem;
  color: var(--muted);
  line-height: 1.55;
`;

const Tooltip = styled.div`
  font-size: 0.85rem;
  color: var(--muted);
  line-height: 1.6;
`;

const dimensions = [
  {
    id: "attention",
    label: "Attention Shock",
    description: "How aggressively the stunt interrupts the status quo and steals headlines."
  },
  {
    id: "lore",
    label: "Lore Depth",
    description: "The stickiness of the story—does it spark retellings and inside jokes?"
  },
  {
    id: "conversion",
    label: "Conversion Lift",
    description: "How well the campaign converted cultural noise into sales or signups."
  },
  {
    id: "repeatability",
    label: "Repeatability",
    description: "Can the brand reuse the idea or build a platform around it?"
  },
  {
    id: "founderLove",
    label: "Founder Love",
    description: "The degree to which leadership celebrated and scaled the outcome."
  }
];

const chartSize = 320;
const center = chartSize / 2;
const radius = chartSize / 2 - 20;

type PlotPoint = {
  angle: number;
  value: number;
};

function getPolygonPoints(values: number[]): string {
  return values
    .map((value, index) => {
      const angle = ((Math.PI * 2) / values.length) * index - Math.PI / 2;
      const r = (value / 100) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");
}

function computeScores(campaignId: string) {
  const campaign = campaigns.find((c) => c.id === campaignId)!;

  return {
    attention: Math.min(100, Math.round(campaign.weirdFactor * 10 + 8)),
    lore: Math.min(
      100,
      Math.round(campaign.signal.includes("lore") ? 94 : campaign.signal.length % 30 + 62)
    ),
    conversion: campaign.metric.includes("%")
      ? Math.min(100, 70 + parseInt(campaign.metric.match(/\d+/)?.[0] ?? "20", 10))
      : Math.min(100, 65 + (campaign.metric.includes("$") ? 20 : 15)),
    repeatability: 55 + (campaign.story.length % 35),
    founderLove: 60 + (campaign.outcome.length % 32)
  };
}

export default function SignalRadar() {
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0].id);

  const { polygonPoints, scores } = useMemo(() => {
    const result = computeScores(selectedCampaign);
    const values = dimensions.map((dimension) => result[dimension.id as keyof typeof result]);
    return {
      scores: result,
      polygonPoints: getPolygonPoints(values)
    };
  }, [selectedCampaign]);

  return (
    <Wrapper>
      <ChartContainer>
        <ChartHeader>
          <Title>Signal Strength Radar</Title>
          <Dropdown value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)}>
            {campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.brand} · {campaign.title}
              </option>
            ))}
          </Dropdown>
        </ChartHeader>
        <motion.svg
          width={chartSize}
          height={chartSize}
          viewBox={`0 0 ${chartSize} ${chartSize}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[20, 40, 60, 80, 100].map((tick) => (
            <polygon
              key={tick}
              points={getPolygonPoints(new Array(dimensions.length).fill(tick))}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
            />
          ))}
          {dimensions.map((dimension, index) => {
            const angle = ((Math.PI * 2) / dimensions.length) * index - Math.PI / 2;
            const x = center + (radius + 18) * Math.cos(angle);
            const y = center + (radius + 18) * Math.sin(angle);
            return (
              <text
                key={dimension.id}
                x={x}
                y={y}
                fill="rgba(255,255,255,0.7)"
                fontSize={12}
                textAnchor="middle"
              >
                {dimension.label}
              </text>
            );
          })}
          <motion.polygon
            points={polygonPoints}
            fill="rgba(95, 111, 255, 0.35)"
            stroke="rgba(255, 209, 102, 0.65)"
            strokeWidth={2}
            animate={{ points: polygonPoints }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          />
        </motion.svg>
        <Tooltip>
          Weirdness is table stakes. Signal strength measures whether the idea left an artifact the
          brand could build on. Select a campaign to see how its intangible benefits stack up.
        </Tooltip>
      </ChartContainer>
      <Legend>
        {dimensions.map((dimension) => (
          <LegendItem key={dimension.id}>
            <LegendTitle>
              {dimension.label} · {scores[dimension.id as keyof typeof scores]}
            </LegendTitle>
            <LegendText>{dimension.description}</LegendText>
          </LegendItem>
        ))}
      </Legend>
    </Wrapper>
  );
}
