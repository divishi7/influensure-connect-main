export type CampaignStatus = "Active" | "Draft" | "Completed" | "Paused";

export interface Campaign {
  id: string;
  name: string;
  brand: string;
  category: string;
  status: CampaignStatus;
  budget: number;
  spent: number;
  reach: number;
  impressions: number;
  engagement: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roi: number; // %
  startDate: string;
  endDate: string;
  influencers: number;
}

export const campaigns: Campaign[] = [
  {
    id: "cmp-1", name: "Glowveda Summer Skincare Launch", brand: "Glowveda", category: "Beauty",
    status: "Active", budget: 3500000, spent: 2200000, reach: 1240000, impressions: 2850000,
    engagement: 184000, clicks: 42300, conversions: 3180, revenue: 7400000, roi: 236,
    startDate: "2025-05-12", endDate: "2025-07-30", influencers: 14,
  },
  {
    id: "cmp-2", name: "FitNation Transformation Challenge", brand: "FitNation", category: "Fitness",
    status: "Active", budget: 2500000, spent: 1650000, reach: 890000, impressions: 1640000,
    engagement: 96000, clicks: 28900, conversions: 2140, revenue: 5400000, roi: 227,
    startDate: "2025-06-01", endDate: "2025-08-15", influencers: 9,
  },
  {
    id: "cmp-3", name: "Cricket Fever Fan Campaign", brand: "FanArena", category: "Sports",
    status: "Completed", budget: 5000000, spent: 4800000, reach: 2180000, impressions: 4220000,
    engagement: 268000, clicks: 71400, conversions: 4920, revenue: 13500000, roi: 281,
    startDate: "2025-02-10", endDate: "2025-04-05", influencers: 22,
  },
  {
    id: "cmp-4", name: "QuickBite Food Festival Promo", brand: "QuickBite", category: "Food",
    status: "Paused", budget: 1800000, spent: 920000, reach: 320000, impressions: 540000,
    engagement: 24000, clicks: 6400, conversions: 410, revenue: 2600000, roi: 183,
    startDate: "2025-04-22", endDate: "2025-07-10", influencers: 6,
  },
  {
    id: "cmp-5", name: "PayWise FinTech Growth Drive", brand: "PayWise", category: "Finance",
    status: "Active", budget: 6500000, spent: 4100000, reach: 1680000, impressions: 3520000,
    engagement: 212000, clicks: 58900, conversions: 3840, revenue: 15200000, roi: 271,
    startDate: "2025-05-28", endDate: "2025-09-01", influencers: 18,
  },
  {
    id: "cmp-6", name: "PrepMaster UPSC Success Campaign", brand: "PrepMaster", category: "Education",
    status: "Draft", budget: 2200000, spent: 0, reach: 0, impressions: 0,
    engagement: 0, clicks: 0, conversions: 0, revenue: 0, roi: 0,
    startDate: "2025-08-01", endDate: "2025-10-15", influencers: 0,
  },
];

export function getCampaign(id: string) {
  return campaigns.find((c) => c.id === id);
}