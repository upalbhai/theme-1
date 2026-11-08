"use client";

import * as React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Shield,
  Key,
  Bell,
  Camera,
  CheckCircle2,
  Lock,
  Smartphone,
  Laptop,
  Globe,
  TrendingUp,
  Save,
  Check,
  Building,
  Clock,
  ShieldCheck,
  Activity,
  DollarSign,
  Share2,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AnimatedNumber } from "@/components/core/animated-number";
import { toast } from "sonner";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  department: string;
  location: string;
  timezone: string;
  bio: string;
  joinedDate: string;
  avatarInitials: string;
  completionScore: number;
}

const INITIAL_PROFILE: ProfileData = {
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex.m@apex-crm.com",
  phone: "+1 (555) 234-5678",
  title: "Senior Director of Sales & Revenue",
  department: "Executive Revenue",
  location: "San Francisco, CA",
  timezone: "Pacific Time (US & Canada) (GMT-7)",
  bio: "Leading enterprise account expansion, contract negotiation, and sales pipeline optimization across North American accounts.",
  joinedDate: "January 2024",
  avatarInitials: "AM",
  completionScore: 88,
};

const STATS = [
  {
    label: "Closed Pipeline",
    value: "$1,482,000",
    detail: "+24.5% vs previous quarter",
    isPositive: true,
  },
  {
    label: "Deal Win Rate",
    value: "78.4%",
    detail: "Top tier in revenue cohort",
    isPositive: true,
  },
  {
    label: "Active Accounts",
    value: "42",
    detail: "98% annual retention rate",
    isPositive: true,
  },
  {
    label: "Client CSAT",
    value: "4.9 / 5.0",
    detail: "Across 124 verified reviews",
    isPositive: true,
  },
];

const SKILLS = [
  "Enterprise SaaS",
  "Pipeline Velocity",
  "Contract Negotiation",
  "Account Expansion",
  "Executive Sponsor",
];

const SESSIONS = [
  {
    id: "sess-1",
    device: "MacBook Pro 16″ (Chrome / macOS)",
    location: "San Francisco, United States",
    ip: "192.168.1.65",
    time: "Current session",
    isActive: true,
    icon: Laptop,
  },
  {
    id: "sess-2",
    device: "iPhone 15 Pro (Apex CRM Mobile)",
    location: "San Francisco, United States",
    ip: "192.168.1.84",
    time: "2 hours ago",
    isActive: false,
    icon: Smartphone,
  },
];

const ACTIVITIES = [
  {
    id: "act-1",
    title: "Closed Deal: Horizon Tech Enterprise Expansion",
    description: "+$240,000 ARR added to Q4 target",
    time: "Today at 2:45 PM",
  },
  {
    id: "act-2",
    title: "Updated Enterprise Lead Scoring Matrix",
    description: "Adjusted automated qualification criteria for Tier-1 prospects",
    time: "Yesterday at 11:30 AM",
  },
  {
    id: "act-3",
    title: "Exported Pipeline Performance Report",
    description: "Generated Q3 executive revenue breakdown",
    time: "Oct 18, 2026 at 4:15 PM",
  },
];

export default function ProfilePage() {
  const [formData, setFormData] = React.useState<ProfileData>(INITIAL_PROFILE);
  const [isSaving, setIsSaving] = React.useState(false);

  // Security Toggles
  const [twoFactor, setTwoFactor] = React.useState(true);
  const [emailAlerts, setEmailAlerts] = React.useState(true);
  const [weeklyDigest, setWeeklyDigest] = React.useState(true);
  const [dealUpdates, setDealUpdates] = React.useState(true);

  // Active Sessions State
  const [sessions, setSessions] = React.useState(SESSIONS);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile changes saved successfully");
    }, 400);
  };

  const handleCopyProfileLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Profile URL copied to clipboard");
    }
  };

  const handleRevokeSession = (id: string, device: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success(`Revoked session for ${device}`);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card className="border-border/80 shadow-2xs overflow-hidden">
        {/* Subtle Warm Cover Banner */}
        <div className="h-32 md:h-40 w-full bg-muted/60 border-b border-border/60 relative p-4 flex items-start justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyProfileLink}
            className="gap-2 bg-card/90 backdrop-blur-xs text-xs font-medium cursor-pointer shadow-2xs"
          >
            <Share2 className="size-3.5" />
            <span>Copy Link</span>
          </Button>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-14 md:-mt-16">
            {/* Avatar & Identifiers */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="relative group">
                <Avatar className="size-24 md:size-28 border-4 border-card shadow-sm bg-primary text-primary-foreground">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl md:text-3xl font-bold font-mono">
                    {formData.avatarInitials}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => toast.info("Profile photo upload dialog")}
                  className="absolute bottom-0 right-0 size-7 rounded-full bg-foreground text-background flex items-center justify-center shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
                  title="Upload avatar"
                >
                  <Camera className="size-3.5" />
                </button>
              </div>

              <div className="space-y-1 pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                    {formData.firstName} {formData.lastName}
                  </h1>
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4.5 bg-muted/40 font-mono">
                    Director
                  </Badge>
                </div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">
                  {formData.title} • {formData.department}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground/80 pt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3" />
                    <span>{formData.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    <span>Member since {formData.joinedDate}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Status / Actions */}
            <div className="flex items-center gap-2.5 pb-1">
              <Badge
                variant="outline"
                className="text-xs gap-1.5 py-1 px-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
              >
                <CheckCircle2 className="size-3.5" />
                <span>Active Account</span>
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="border-border/80 shadow-2xs">
            <CardContent className="p-4 space-y-1">
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
              <div className="text-2xl font-bold tracking-tight tabular-nums text-foreground">
                {stat.value}
              </div>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {stat.detail}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main 2-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Profile Strength, Contact, Skills */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Strength */}
          <Card className="border-border/80 shadow-2xs">
            <CardHeader className="pb-3 border-b border-border/60">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Profile Completeness
                </CardTitle>
                <span className="text-xs font-bold font-mono text-primary">
                  {formData.completionScore}%
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5">
              <Progress value={formData.completionScore} className="h-2 bg-muted" />

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Primary corporate email verified</span>
                  </span>
                  <span className="font-mono text-[11px] text-foreground">Done</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Two-factor authentication (2FA)</span>
                  </span>
                  <span className="font-mono text-[11px] text-foreground">Active</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Role & team permissions</span>
                  </span>
                  <span className="font-mono text-[11px] text-foreground">Done</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Details Card */}
          <Card className="border-border/80 shadow-2xs">
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Direct Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <Mail className="size-3.5 text-muted-foreground shrink-0" />
                <span className="truncate font-medium flex-1">{formData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-3.5 text-muted-foreground shrink-0" />
                <span className="truncate font-medium flex-1">{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="size-3.5 text-muted-foreground shrink-0" />
                <span className="truncate font-medium flex-1">{formData.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="size-3.5 text-muted-foreground shrink-0" />
                <span className="truncate font-medium flex-1" title={formData.timezone}>
                  {formData.timezone}
                </span>
              </div>

              <Separator className="my-2" />

              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Core Expertise
                </span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {SKILLS.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-[10px] py-0 px-2 h-5 bg-muted/40 font-normal">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Settings Tabs */}
        <div className="lg:col-span-8 space-y-6">
          <Tabs defaultValue="general" className="w-full space-y-6">
            <TabsList className="inline-flex w-auto p-1 gap-1 bg-muted/60 border border-border/80 rounded-xl">
              <TabsTrigger value="general" className="gap-2 px-3.5 py-1.5 text-xs font-medium cursor-pointer">
                <User className="size-3.5 text-primary" />
                <span>Personal Information</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2 px-3.5 py-1.5 text-xs font-medium cursor-pointer">
                <ShieldCheck className="size-3.5 text-primary" />
                <span>Security & Sessions</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-2 px-3.5 py-1.5 text-xs font-medium cursor-pointer">
                <Bell className="size-3.5 text-primary" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2 px-3.5 py-1.5 text-xs font-medium cursor-pointer">
                <Activity className="size-3.5 text-primary" />
                <span>Activity Log</span>
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: General Information */}
            <TabsContent value="general">
              <Card className="border-border/80 shadow-2xs">
                <CardHeader className="pb-3 border-b border-border/60">
                  <CardTitle className="text-sm font-semibold">Profile Details</CardTitle>
                  <CardDescription className="text-xs">
                    Update your account details and organizational contact information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName" className="text-xs font-semibold">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lastName" className="text-xs font-semibold">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-semibold">
                          Corporate Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-semibold">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="title" className="text-xs font-semibold">
                          Title
                        </Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="department" className="text-xs font-semibold">
                          Department
                        </Label>
                        <Input
                          id="department"
                          value={formData.department}
                          onChange={(e) =>
                            setFormData({ ...formData, department: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="location" className="text-xs font-semibold">
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="timezone" className="text-xs font-semibold">
                          Timezone
                        </Label>
                        <Input
                          id="timezone"
                          value={formData.timezone}
                          onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="bio" className="text-xs font-semibold">
                        Professional Summary
                      </Label>
                      <Textarea
                        id="bio"
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="resize-none text-xs leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setFormData(INITIAL_PROFILE);
                          toast.info("Changes reverted");
                        }}
                        className="text-xs cursor-pointer"
                      >
                        Reset
                      </Button>
                      <Button type="submit" disabled={isSaving} className="gap-2 text-xs cursor-pointer">
                        <Save className="size-3.5" />
                        <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: Security & Authentication */}
            <TabsContent value="security" className="space-y-6">
              {/* 2FA */}
              <Card className="border-border/80 shadow-2xs">
                <CardHeader className="pb-3 border-b border-border/60">
                  <CardTitle className="text-sm font-semibold">
                    Two-Factor Authentication (2FA)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Protect workspace access using time-based one-time authentication codes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between p-3.5 rounded-lg border border-border/80 bg-muted/20">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-xs text-foreground flex items-center gap-2">
                        <Shield className="size-3.5 text-primary" />
                        <span>Authenticator App (TOTP)</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Use Google Authenticator, 1Password, or YubiKey to approve sign-in prompts.
                      </p>
                    </div>
                    <Switch
                      checked={twoFactor}
                      onCheckedChange={(val) => {
                        setTwoFactor(val);
                        toast.success(val ? "2FA enabled" : "2FA disabled");
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Password update */}
              <Card className="border-border/80 shadow-2xs">
                <CardHeader className="pb-3 border-b border-border/60">
                  <CardTitle className="text-sm font-semibold">Change Password</CardTitle>
                  <CardDescription className="text-xs">
                    Passwords must contain at least 12 characters including uppercase, numbers, and symbols.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast.success("Password updated successfully");
                    }}
                    className="space-y-3"
                  >
                    <div className="space-y-1.5">
                      <Label htmlFor="curr-pass" className="text-xs font-semibold">
                        Current Password
                      </Label>
                      <Input id="curr-pass" type="password" placeholder="••••••••••••" required />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="new-pass" className="text-xs font-semibold">
                          New Password
                        </Label>
                        <Input id="new-pass" type="password" placeholder="••••••••••••" required />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="confirm-pass" className="text-xs font-semibold">
                          Confirm Password
                        </Label>
                        <Input id="confirm-pass" type="password" placeholder="••••••••••••" required />
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <Button type="submit" size="sm" className="gap-2 text-xs cursor-pointer">
                        <Lock className="size-3.5" />
                        <span>Update Password</span>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Active Sessions */}
              <Card className="border-border/80 shadow-2xs">
                <CardHeader className="pb-3 border-b border-border/60">
                  <CardTitle className="text-sm font-semibold">Active Login Sessions</CardTitle>
                  <CardDescription className="text-xs">
                    Authorized hardware devices currently signed into your Apex CRM credentials.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-2.5">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/80 bg-card"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            session.isActive
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <session.icon className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold flex items-center gap-2 text-foreground">
                            <span>{session.device}</span>
                            {session.isActive && (
                              <Badge
                                variant="outline"
                                className="text-[10px] py-0 px-1.5 h-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              >
                                Active Now
                              </Badge>
                            )}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {session.location} • {session.ip} • {session.time}
                          </p>
                        </div>
                      </div>

                      {session.isActive ? (
                        <span className="text-[11px] font-mono text-muted-foreground">Current</span>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRevokeSession(session.id, session.device)}
                          className="text-xs text-destructive hover:bg-destructive/10 cursor-pointer h-7"
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 3: Preferences & Notifications */}
            <TabsContent value="preferences" className="space-y-6">
              <Card className="border-border/80 shadow-2xs">
                <CardHeader className="pb-3 border-b border-border/60">
                  <CardTitle className="text-sm font-semibold">Email & In-App Alerts</CardTitle>
                  <CardDescription className="text-xs">
                    Choose which notifications you receive across your workspace accounts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-xs text-foreground">
                        Deals Pipeline Stage Transitions
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Receive instant updates whenever high-value deals advance or close.
                      </p>
                    </div>
                    <Switch
                      checked={dealUpdates}
                      onCheckedChange={(val) => {
                        setDealUpdates(val);
                        toast.success("Deal notifications updated");
                      }}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-xs text-foreground">
                        Security & Device Login Alerts
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Receive email alerts whenever an unrecognized browser or IP signs in.
                      </p>
                    </div>
                    <Switch
                      checked={emailAlerts}
                      onCheckedChange={(val) => {
                        setEmailAlerts(val);
                        toast.success("Security alerts updated");
                      }}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-xs text-foreground">
                        Weekly Executive Revenue Summary
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Monday morning email digest summarizing pipeline velocity and quotas.
                      </p>
                    </div>
                    <Switch
                      checked={weeklyDigest}
                      onCheckedChange={(val) => {
                        setWeeklyDigest(val);
                        toast.success("Digest preference updated");
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 4: Activity Log */}
            <TabsContent value="activity">
              <Card className="border-border/80 shadow-2xs">
                <CardHeader className="pb-3 border-b border-border/60">
                  <CardTitle className="text-sm font-semibold">Audit Trail & Action Log</CardTitle>
                  <CardDescription className="text-xs">
                    System record of recent actions performed under this administrative user profile.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="relative pl-5 border-l-2 border-border/80 space-y-5">
                    {ACTIVITIES.map((act) => (
                      <div key={act.id} className="relative space-y-0.5">
                        <div className="absolute -left-[27px] top-1 size-3 rounded-full bg-primary ring-4 ring-card" />
                        <p className="text-xs font-semibold text-foreground">{act.title}</p>
                        <p className="text-[11px] text-muted-foreground">{act.description}</p>
                        <p className="text-[10px] text-muted-foreground/70 font-mono pt-0.5">
                          {act.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
