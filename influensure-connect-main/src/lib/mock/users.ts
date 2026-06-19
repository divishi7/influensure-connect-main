export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Brand" | "Analyst";
  status: "Active" | "Invited" | "Suspended";
  joined: string;
  avatar: string;
}

export const adminUsers: AdminUser[] = [
  { id: "u1", name: "Sara Chen", email: "sara@aurora.co", role: "Brand", status: "Active", joined: "2025-03-12", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=sara" },
  { id: "u2", name: "Marcus Reed", email: "marcus@fitflex.io", role: "Brand", status: "Active", joined: "2025-04-02", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=marcus" },
  { id: "u3", name: "Priya Patel", email: "priya@influensure.app", role: "Admin", status: "Active", joined: "2024-11-08", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=priya" },
  { id: "u4", name: "Diego Costa", email: "diego@strider.co", role: "Brand", status: "Active", joined: "2025-01-22", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=diego" },
  { id: "u5", name: "Lena Frost", email: "lena@novaaudio.com", role: "Analyst", status: "Active", joined: "2025-05-18", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=lena" },
  { id: "u6", name: "Owen Park", email: "owen@ecobean.co", role: "Brand", status: "Invited", joined: "2025-06-04", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=owen" },
  { id: "u7", name: "Yuki Mori", email: "yuki@wanderlust.co", role: "Brand", status: "Suspended", joined: "2025-02-14", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=yuki" },
];

export interface FraudReport {
  id: string;
  influencer: string;
  username: string;
  platform: string;
  reason: string;
  severity: "Low" | "Medium" | "High";
  status: "Open" | "Investigating" | "Resolved";
  reported: string;
}

export const fraudReports: FraudReport[] = [
  { id: "f1", influencer: "Ava Stone", username: "ava.stone3", platform: "Instagram", reason: "Sudden 40K follower spike in 2 days", severity: "High", status: "Investigating", reported: "2025-06-10" },
  { id: "f2", influencer: "Leo Kade", username: "leo.kade12", platform: "TikTok", reason: "98% engagement from inactive accounts", severity: "High", status: "Open", reported: "2025-06-12" },
  { id: "f3", influencer: "Nova Lin", username: "nova.lin7", platform: "YouTube", reason: "Comment bot patterns detected", severity: "Medium", status: "Open", reported: "2025-06-14" },
  { id: "f4", influencer: "Theo Frost", username: "theo.frost9", platform: "Instagram", reason: "Engagement / follower ratio anomaly", severity: "Medium", status: "Resolved", reported: "2025-05-30" },
  { id: "f5", influencer: "Mia Cruz", username: "mia.cruz4", platform: "X", reason: "Low audience quality score (32/100)", severity: "Low", status: "Resolved", reported: "2025-05-21" },
];