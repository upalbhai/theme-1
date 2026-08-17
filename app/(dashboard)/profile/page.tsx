"use client";

import React, { useState } from "react";
import {
  User, Mail, Phone, MapPin, Briefcase, Calendar, Shield, Key, Bell, Camera,
  CheckCircle2, Lock, Smartphone, Laptop, Globe, Sparkles, Award, TrendingUp,
  Save, Check, Building, Clock, ShieldCheck, Activity, DollarSign, Share2
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

// Dummy Data Object for Profile Rendering
const DUMMY_USER = {
  profile: {
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex.m@apex-crm.com",
    phone: "+1 (555) 234-5678",
    title: "Senior Director of Sales & Revenue",
    department: "Executive Sales",
    location: "San Francisco, CA",
    timezone: "Pacific Time (US & Canada) (GMT-7)",
    bio: "Passionate sales director leading high-velocity enterprise teams. Specializing in deal structuring, pipeline optimization, and SaaS customer acquisition.",
    joinedDate: "Jan 2024",
    avatarInitials: "AM",
    completionScore: 85,
  },
  stats: {
    totalRevenue: "$1,482,000",
    revenueTrend: "+24.5% from last quarter",
    winRate: "78.4%",
    winRateTrend: "Top 5% in organization",
    activeAccounts: "42 Key Clients",
    retentionRate: "98% retention rate",
    clientRating: "4.9 / 5.0",
    reviewsCount: "Based on 124 reviews",
  },
  skills: ["Enterprise SaaS", "Pipeline Mgmt", "Key Accounts", "CRM Automation", "Negotiation"],
  sessions: [
    {
      id: 1,
      device: 'MacBook Pro 16" (Chrome)',
      location: 'San Francisco, USA',
      ip: '192.168.1.65',
      time: 'Current Session',
      isActive: true,
      icon: Laptop
    },
    {
      id: 2,
      device: 'iPhone 15 Pro (Apex CRM Mobile)',
      location: 'San Francisco, USA',
      ip: '192.168.1.65',
      time: '2 hours ago',
      isActive: false,
      icon: Smartphone
    }
  ],
  activities: [
    {
      id: 1,
      title: 'Closed Deal: Apex Enterprise Expansion',
      description: '+$240,000 ARR Added',
      time: 'Today at 2:45 PM',
      color: 'bg-primary',
      textColor: 'text-emerald-600 dark:text-emerald-400 font-medium'
    },
    {
      id: 2,
      title: 'Updated Lead Qualification Matrix',
      description: 'Adjusted scoring algorithm for Enterprise leads',
      time: 'Yesterday at 11:30 AM',
      color: 'bg-primary',
      textColor: 'text-muted-foreground'
    },
    {
      id: 3,
      title: 'Exported Sales Analytics Report',
      description: 'Q3 Performance Breakdown CSV',
      time: 'Aug 9, 2026 at 4:15 PM',
      color: 'bg-emerald-500',
      textColor: 'text-muted-foreground'
    }
  ]
};

export default function ProfilePage() {
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form states based on DUMMY_USER
  const [formData, setFormData] = useState({ ...DUMMY_USER.profile });

  // Security Toggles
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [dealUpdates, setDealUpdates] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      {/* Top Banner & Header */}
      <div className="relative rounded-2xl border bg-card text-card-foreground shadow-sm">
        {/* Cover Photo Gradient */}
        <div className="h-40 md:h-52 w-full rounded-t-2xl bg-gradient-to-r from-primary via-blue-600 to-sky-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/20" />
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 gap-2 bg-background/80 backdrop-blur-md hover:bg-background shadow-sm"
            onClick={handleCopyLink}
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
            <span>{copied ? "Link Copied" : "Share Profile"}</span>
          </Button>
        </div>

        {/* Profile Info Overlay - Removed negative margins from this container to keep text below banner */}
        <div className="px-6 pb-6 pt-4 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            {/* Avatar with Camera Icon - Pulled up individually */}
            <div className="relative group -mt-20 md:-mt-24 sm:mb-2">
              <Avatar className="h-28 w-28 md:h-36 md:w-36 border-4 border-background shadow-xl ring-2 ring-primary/20 bg-background">
                <AvatarFallback className="bg-gradient-to-tr from-primary to-sky-500 text-white font-bold text-3xl md:text-4xl">
                  {DUMMY_USER.profile.avatarInitials}
                </AvatarFallback>
              </Avatar>
              <button 
                title="Change Profile Photo"
                className="absolute bottom-1 right-1 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Name and Badges */}
            <div className="space-y-1.5 pb-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {formData.firstName} {formData.lastName}
                </h1>
                <Badge variant="default" className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verified Admin
                </Badge>
                <Badge variant="outline" className="gap-1 border-primary/40 text-primary">
                  <Sparkles className="h-3 w-3" /> Pro Director
                </Badge>
              </div>
              <p className="text-sm font-medium text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                <Briefcase className="h-4 w-4 text-primary" /> {formData.title}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <Building className="h-3.5 w-3.5" /> {formData.department}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {formData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> Joined {formData.joinedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center justify-center gap-3 md:pb-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Globe className="h-4 w-4" /> Public View
            </Button>
            <Button size="sm" className="gap-2 shadow-md shadow-primary/20">
              <Award className="h-4 w-4" /> View Achievements
            </Button>
          </div>
        </div>
      </div>

      {/* Metric Cards Summary Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-card to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue Closed</CardTitle>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DUMMY_USER.stats.totalRevenue}</div>
            <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1 font-medium">
              <TrendingUp className="h-3.5 w-3.5" /> {DUMMY_USER.stats.revenueTrend}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-indigo-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Deal Win Rate</CardTitle>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
              <Award className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DUMMY_USER.stats.winRate}</div>
            <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1 font-medium">
              <TrendingUp className="h-3.5 w-3.5" /> {DUMMY_USER.stats.winRateTrend}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-amber-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Accounts</CardTitle>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <User className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DUMMY_USER.stats.activeAccounts}</div>
            <p className="text-xs text-muted-foreground mt-1">{DUMMY_USER.stats.retentionRate}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-purple-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Client Rating</CardTitle>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <Sparkles className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DUMMY_USER.stats.clientRating}</div>
            <p className="text-xs text-muted-foreground mt-1">{DUMMY_USER.stats.reviewsCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Layout (Sidebar Card + Tabs Content) */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Side Profile Overview */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Completion Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Profile Strength</CardTitle>
                <span className="text-sm font-bold text-primary">{DUMMY_USER.profile.completionScore}%</span>
              </div>
              <CardDescription>Complete profile to unlock full team features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={DUMMY_USER.profile.completionScore} className="h-2" />
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Work Email Verified
                  </span>
                  <span className="font-semibold text-foreground">Done</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 2FA Authentication
                  </span>
                  <span className="font-semibold text-foreground">Active</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-muted" /> Add Social Profiles
                  </span>
                  <span className="font-semibold text-amber-500">Pending</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Contact & Bio Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">About & Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-muted-foreground text-xs leading-relaxed">
                {formData.bio}
              </p>
              
              <Separator />

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="truncate font-medium">{formData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-medium">{formData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-medium">{formData.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-medium">{formData.timezone}</span>
                </div>
              </div>

              <Separator />

              {/* Skills Tags */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Expertise</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {DUMMY_USER.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs font-normal">{skill}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side Main Tabbed Settings */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="w-full justify-start overflow-x-auto bg-muted/60 p-1">
              <TabsTrigger value="general" className="gap-2">
                <User className="h-4 w-4" /> Personal Details
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <ShieldCheck className="h-4 w-4" /> Security & 2FA
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" /> Preferences
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2">
                <Activity className="h-4 w-4" /> Activity Log
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: General Details Form */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Personal Information</CardTitle>
                  <CardDescription>
                    Update your public profile details and company information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input
                          id="timezone"
                          value={formData.timezone}
                          onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <Button type="button" variant="outline">Discard</Button>
                      <Button type="submit" className="gap-2 shadow-md shadow-primary/20">
                        {isSaved ? <Check className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4" />}
                        {isSaved ? "Saved Successfully!" : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: Security & Password */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Two-Factor Authentication (2FA)</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your admin account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/20">
                    <div className="space-y-0.5">
                      <div className="font-semibold text-sm flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" /> Authenticator App (TOTP)
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Use Google Authenticator or 1Password to generate verification codes.
                      </p>
                    </div>
                    <Switch
                      checked={twoFactor}
                      onCheckedChange={setTwoFactor}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Change Password</CardTitle>
                  <CardDescription>Ensure your password is at least 12 characters long with symbols.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="••••••••••••" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="••••••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="••••••••••••" />
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <Button className="gap-2">
                      <Lock className="h-4 w-4" /> Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Active Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Active Login Sessions</CardTitle>
                  <CardDescription>Manage devices currently logged into your Apex CRM account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {DUMMY_USER.sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${session.isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          <session.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold flex items-center gap-2">
                            {session.device}
                            {session.isActive && <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 text-[10px] py-0">Current Session</Badge>}
                          </p>
                          <p className="text-xs text-muted-foreground">{session.location} • {session.isActive ? session.ip : session.time}</p>
                        </div>
                      </div>
                      {session.isActive ? (
                        <Button variant="ghost" size="sm" className="text-xs">Active Now</Button>
                      ) : (
                        <Button variant="outline" size="sm" className="text-xs text-destructive hover:text-destructive">Revoke</Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 3: Preferences */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Notification Settings</CardTitle>
                  <CardDescription>Choose how you want to be notified about deals, leads, and team updates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-sm">Deal Status Updates</p>
                      <p className="text-xs text-muted-foreground">Receive instant alerts when deals move stages or close.</p>
                    </div>
                    <Switch checked={dealUpdates} onCheckedChange={setDealUpdates} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-sm">Email Security Notifications</p>
                      <p className="text-xs text-muted-foreground">Get notified when a new device logs into your account.</p>
                    </div>
                    <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-sm">Weekly Executive Digest</p>
                      <p className="text-xs text-muted-foreground">Receive a weekly summary report of pipeline revenue and team metrics.</p>
                    </div>
                    <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 4: Activity Log */}
            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Recent System Activity</CardTitle>
                  <CardDescription>Audit log of actions taken by your account in Apex CRM.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-primary/20 space-y-6">
                    {DUMMY_USER.activities.map((activity) => (
                      <div key={activity.id} className="relative group">
                        <div className={`absolute -left-[31px] top-0.5 h-4 w-4 rounded-full ${activity.color} ring-4 ring-background`} />
                        <p className="text-sm font-semibold">{activity.title}</p>
                        <p className={`text-xs ${activity.textColor}`}>{activity.description}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{activity.time}</p>
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
