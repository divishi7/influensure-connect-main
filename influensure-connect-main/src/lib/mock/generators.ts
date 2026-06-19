import { influencers, type Niche, type Platform } from "./influencers";

export interface CampaignBriefInput {
  campaignName: string;
  productCategory: string;
  budget: number;
  audience: string;
  timeline: string;
  goals: string;
  niche?: Niche;
  platforms?: Platform[];
}

export interface GeneratedBrief {
  overview: string;
  objectives: string[];
  deliverables: string[];
  kpis: string[];
  outreachEmail: string;
  suggestedInfluencers: typeof influencers;
}

export function generateBrief(input: CampaignBriefInput): GeneratedBrief {
  const tier = input.budget >= 50000 ? "premium" : input.budget >= 15000 ? "mid-tier" : "emerging";
  const overview = `${input.campaignName} is a ${tier} ${input.productCategory.toLowerCase()} campaign targeting ${input.audience}. Over ${input.timeline}, we'll partner with vetted creators to ${input.goals.toLowerCase()} while maintaining brand authenticity and a verified audience quality threshold above 80.`;

  const objectives = [
    `Drive measurable ${input.goals.toLowerCase()} through trusted creator partnerships`,
    `Achieve a verified reach of ${(input.budget * 40).toLocaleString()} authentic impressions`,
    `Maintain an authenticity score ≥ 80 across all selected influencers`,
    `Generate a content library of 25+ on-brand creative assets for repurposing`,
  ];

  const deliverables = [
    "3x feed posts per influencer",
    "5x story frames with swipe-up / link sticker",
    "1x long-form Reel or short-form video",
    "Usage rights for paid amplification (90 days)",
    "UGC content delivered in raw + edited formats",
  ];

  const kpis = [
    "Authentic reach & impressions (filtered by audience quality)",
    "Engagement rate vs. category benchmark",
    "Click-through and conversion rate",
    "Cost per authentic engagement (CPAE)",
    "Return on ad spend (ROAS)",
  ];

  const outreachEmail = `Subject: ${input.campaignName} × {influencer_name} — Partnership Opportunity\n\nHi {influencer_name},\n\nI'm reaching out from ${input.productCategory} on behalf of an exciting new campaign — ${input.campaignName}. We loved your recent content and how authentically you connect with your audience.\n\nWe're building a curated creator roster (${tier} tier) to ${input.goals.toLowerCase()} over ${input.timeline}, with a campaign budget of $${input.budget.toLocaleString()}. Based on your engagement quality and audience fit, you'd be a perfect partner.\n\nDeliverables include 3 feed posts, 5 story frames, and 1 Reel — with full creative freedom and a paid usage window.\n\nWould you be open to a 15-minute intro call this week?\n\nWarmly,\nThe ${input.campaignName} Team`;

  const suggestedInfluencers = influencers
    .filter((i) => (input.niche ? i.niche === input.niche : true))
    .filter((i) => i.authenticityScore >= 75)
    .sort((a, b) => b.authenticityScore - a.authenticityScore)
    .slice(0, 6);

  return { overview, objectives, deliverables, kpis, outreachEmail, suggestedInfluencers };
}