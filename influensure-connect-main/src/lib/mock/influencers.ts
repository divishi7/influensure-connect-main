export type Platform = "Instagram" | "TikTok" | "YouTube" | "X";
export type Niche = "Fashion" | "Fitness" | "Tech" | "Food" | "Travel" | "Beauty" | "Gaming" | "Finance" | "Lifestyle" | "Music";
export type Risk = "safe" | "medium" | "high";

export interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  platform: Platform;
  niche: Niche;
  location: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  engagementRate: number; // percent
  authenticityScore: number; // 0-100
  fraudRisk: Risk;
  audience: {
    genderFemale: number;
    genderMale: number;
    ageGroups: { label: string; value: number }[];
    topCities: { city: string; value: number }[];
  };
  growth: { month: string; followers: number }[];
  engagement: { month: string; rate: number }[];
  fraud: {
    fakeFollowers: number; // %
    botComments: number; // %
    suspiciousSpikes: number;
    audienceQuality: number; // 0-100
    engagementConsistency: number; // 0-100
  };
}

const NICHES: Niche[] = ["Fashion", "Fitness", "Tech", "Food", "Travel", "Beauty", "Gaming", "Finance", "Lifestyle", "Music"];
const PLATFORMS: Platform[] = ["Instagram", "TikTok", "YouTube", "X"];
const CITIES = [
  "Delhi, IN",
  "Mumbai, IN",
  "Bengaluru, IN",
  "Hyderabad, IN",
  "Chennai, IN",
  "Pune, IN",
  "Kolkata, IN",
  "Ahmedabad, IN",
  "Jaipur, IN",
  "Chandigarh, IN",
  "Lucknow, IN",
  "Indore, IN"
];
const FIRSTS = [
  "Priya",
  "Ananya",
  "Aarav",
  "Aryan",
  "Rahul",
  "Neha",
  "Karan",
  "Riya",
  "Ishita",
  "Aditya",
  "Vikram",
  "Sneha",
  "Aman",
  "Rohan",
  "Diya",
  "Tanvi",
  "Yash",
  "Kabir",
  "Meera",
  "Arjun",
  "Nisha",
  "Siddharth",
  "Pooja",
  "Akash",
  "Shreya",
  "Dev",
  "Aniket",
  "Tanya",
  "Harsh",
  "Aditi",
  "Krishna",
  "Vedant",
  "Muskaan",
  "Parth",
  "Anushka",
  "Rudra",
  "Khushi",
  "Manav",
  "Ira",
  "Dhruv"
];
const LASTS = [
  "Sharma",
  "Verma",
  "Gupta",
  "Patel",
  "Singh",
  "Mehta",
  "Agarwal",
  "Chaudhary",
  "Kapoor",
  "Malhotra",
  "Reddy",
  "Nair",
  "Joshi",
  "Yadav",
  "Bansal",
  "Shah",
  "Saxena",
  "Jain",
  "Mishra",
  "Kumar"
];

// deterministic PRNG
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function avatarFor(seed: string) {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

function genGrowth(rand: () => number, base: number, trend: number) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let cur = base * 0.6;
  return months.map((m) => {
    cur = cur * (1 + trend * (0.6 + rand() * 0.8));
    return { month: m, followers: Math.round(cur) };
  });
}

function genEngagement(rand: () => number, base: number) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((m) => ({ month: m, rate: Math.max(0.3, base + (rand() - 0.5) * 1.6) }));
}

function gen(i: number): Influencer {
  const rand = rng(i * 9301 + 49297);
  const platform = PLATFORMS[i % PLATFORMS.length];
  const niche = NICHES[i % NICHES.length];
  const first = FIRSTS[i % FIRSTS.length];
  const last = LASTS[(i * 7) % LASTS.length];
  const name = `${first} ${last}`;
  const username = `${first.toLowerCase()}.${last.toLowerCase()}${(i * 3) % 99}`;
  const followers = Math.round(5000 + rand() * 4_500_000);
  const engagementRate = +(0.8 + rand() * 7.5).toFixed(2);
  const authenticityScore = Math.round(45 + rand() * 55);
  const fraudRisk: Risk = authenticityScore >= 80 ? "safe" : authenticityScore >= 60 ? "medium" : "high";
  const genderFemale = Math.round(30 + rand() * 50);
  const trend = 0.005 + rand() * 0.04;

  return {
    id: `inf-${i + 1}`,
    name,
    username,
    avatar: avatarFor(username),
    platform,
    niche,
    location: CITIES[i % CITIES.length],
    bio: `${niche} creator sharing daily ${niche.toLowerCase()} content & honest reviews.`,
    followers,
    following: Math.round(200 + rand() * 4000),
    posts: Math.round(80 + rand() * 2200),
    engagementRate,
    authenticityScore,
    fraudRisk,
    audience: {
      genderFemale,
      genderMale: 100 - genderFemale,
      ageGroups: [
        { label: "13-17", value: Math.round(rand() * 12) },
        { label: "18-24", value: Math.round(20 + rand() * 25) },
        { label: "25-34", value: Math.round(20 + rand() * 25) },
        { label: "35-44", value: Math.round(10 + rand() * 15) },
        { label: "45+", value: Math.round(rand() * 12) },
      ],
      topCities: [
  { city: "Mumbai", value: Math.round(15 + rand() * 15) },
  { city: "Delhi", value: Math.round(12 + rand() * 15) },
  { city: "Bengaluru", value: Math.round(10 + rand() * 12) },
  { city: "Hyderabad", value: Math.round(8 + rand() * 10) },
  { city: "Chennai", value: Math.round(5 + rand() * 8) },
],
    },
    growth: genGrowth(rand, followers, trend),
    engagement: genEngagement(rand, engagementRate),
    fraud: {
      fakeFollowers: +(100 - authenticityScore + (rand() - 0.5) * 10).toFixed(1),
      botComments: +((100 - authenticityScore) * 0.6 + rand() * 8).toFixed(1),
      suspiciousSpikes: Math.round(rand() * 5),
      audienceQuality: Math.round(authenticityScore + (rand() - 0.5) * 10),
      engagementConsistency: Math.round(authenticityScore + (rand() - 0.5) * 14),
    },
  };
}

export const influencers: Influencer[] = Array.from({ length: 42 }, (_, i) => gen(i));

export const nicheOptions = NICHES;
export const platformOptions = PLATFORMS;
export const locationOptions = Array.from(new Set(CITIES));

export function getInfluencer(id: string) {
  return influencers.find((x) => x.id === id);
}