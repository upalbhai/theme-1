import { PhoneCall, Mail, Calendar } from "lucide-react";

export const salesData = [
  { month: "Jan", revenue: 42000, target: 35000 },
  { month: "Feb", revenue: 48000, target: 38000 },
  { month: "Mar", revenue: 55000, target: 40000 },
  { month: "Apr", revenue: 51000, target: 42000 },
  { month: "May", revenue: 68000, target: 45000 },
  { month: "Jun", revenue: 74000, target: 50000 },
  { month: "Jul", revenue: 89000, target: 55000 },
];

export const leadSourceData = [
  { name: "Organic Search", leads: 420 },
  { name: "Direct Outreach", leads: 310 },
  { name: "Paid Campaigns", leads: 250 },
  { name: "Referrals", leads: 180 },
];

export const recentDeals = [
  {
    company: "Acme Corp",
    contact: "Sarah Jenkins",
    val: "$45,000",
    stage: "Closed Won",
    stageColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    date: "10 mins ago",
  },
  {
    company: "Nexus AI Inc",
    contact: "David Miller",
    val: "$28,500",
    stage: "Proposal Sent",
    stageColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    date: "1 hour ago",
  },
  {
    company: "Starlight Media",
    contact: "Elena Rostova",
    val: "$62,000",
    stage: "Negotiation",
    stageColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    date: "3 hours ago",
  },
  {
    company: "Vanguard Tech",
    contact: "James Thorne",
    val: "$18,000",
    stage: "Contacted",
    stageColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    date: "Yesterday",
  },
];

export const recentActivities = [
  {
    icon: PhoneCall,
    color: "text-blue-500 bg-blue-500/10",
    title: "Call Logged with Sarah Jenkins",
    desc: "Discussed enterprise license pricing tier and SLA conditions.",
    time: "25m ago",
  },
  {
    icon: Mail,
    color: "text-purple-500 bg-purple-500/10",
    title: "Proposal Email Sent to David Miller",
    desc: "Sent PDF contract v2.4 with updated payment terms.",
    time: "2h ago",
  },
  {
    icon: Calendar,
    color: "text-emerald-500 bg-emerald-500/10",
    title: "Demo Scheduled with Horizon Logistics",
    desc: "Scheduled technical demo session with engineering leads.",
    time: "4h ago",
  },
];

export const monthlyConversionsData = [
  { month: "Jan", conversions: 180, rate: 4.2 },
  { month: "Feb", conversions: 210, rate: 4.5 },
  { month: "Mar", conversions: 250, rate: 4.8 },
  { month: "Apr", conversions: 220, rate: 4.4 },
  { month: "May", conversions: 310, rate: 5.1 },
  { month: "Jun", conversions: 340, rate: 5.3 },
  { month: "Jul", conversions: 390, rate: 5.6 },
];

export const segmentData = [
  { name: "Enterprise", value: 450000, color: "var(--primary)" },
  { name: "Mid-Market", value: 280000, color: "var(--chart-2)" },
  { name: "SMB", value: 157000, color: "var(--chart-3)" },
];

export const pipelineStages = [
  { stage: "Qualified Lead", value: 382000, count: 48 },
  { stage: "Meeting Scheduled", value: 245000, count: 32 },
  { stage: "Proposal Sent", value: 168000, count: 18 },
  { stage: "Contract Negotiation", value: 92000, count: 8 },
];

export const topPerformers = [
  { name: "Alex Morgan", deals: 14, revenue: "$142,500", achievement: 118, status: "Exceeded" },
  { name: "Elena Rostova", deals: 11, revenue: "$118,000", achievement: 105, status: "Exceeded" },
  { name: "Sarah Jenkins", deals: 9, revenue: "$89,450", achievement: 98, status: "On Target" },
  { name: "James Thorne", deals: 8, revenue: "$72,000", achievement: 90, status: "Behind" },
];
