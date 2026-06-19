const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const engagementTrend = months.map((m, i) => ({
  month: m,
  engagement: Math.round(40000 + i * 6500 + Math.sin(i) * 8000),
  reach: Math.round(180000 + i * 22000 + Math.cos(i) * 24000),
}));

export const campaignPerformance = [
  { name: "Summer Glow", roi: 240, conversions: 3180 },
  { name: "FitFlex Pro", roi: 224, conversions: 2140 },
  { name: "GameDay", roi: 289, conversions: 4920 },
  { name: "EcoBean", roi: 154, conversions: 410 },
  { name: "Nova Audio", roi: 242, conversions: 3840 },
];

export const audienceGrowth = months.map((m, i) => ({
  month: m,
  audience: Math.round(120_000 + i * 18_000 + Math.sin(i * 1.3) * 9000),
}));

export const fraudRiskDistribution = [
  { name: "Safe", value: 58, color: "var(--risk-safe)" },
  { name: "Medium", value: 27, color: "var(--risk-medium)" },
  { name: "High", value: 15, color: "var(--risk-high)" },
];

export const platformReach = [
  { platform: "Instagram", value: 4_200_000 },
  { platform: "TikTok", value: 3_100_000 },
  { platform: "YouTube", value: 1_850_000 },
  { platform: "X", value: 720_000 },
];

export const dashboardStats = {
  totalInfluencers: 12_482,
  verifiedInfluencers: 8_146,
  activeCampaigns: 38,
  campaignROI: 247,
  fraudAlerts: 24,
};

export const analyticsKPIs = {
  reach: 6_240_000,
  impressions: 12_810_000,
  engagement: 784_000,
  clicks: 207_900,
  conversions: 14_490,
  revenue: 485_200,
  roi: 236,
};