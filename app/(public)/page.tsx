"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  LayoutGrid,
  ShieldCheck,
  Zap,
  BarChart3,
  SlidersHorizontal,
  Layers,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  User,
} from "lucide-react";
import { AnimatedNumber } from "@/components/core/animated-number";
import { Tilt } from "@/components/core/tilt";

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col bg-background text-foreground">
      {/* Navigation */}
      <header className="h-14 border-b border-border/60 bg-background/95 backdrop-blur-xs sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 font-semibold text-sm">
              <div className="size-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-xs">
                A
              </div>
              <span className="tracking-tight font-bold">Apex CRM</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/components" className="hover:text-foreground transition-colors font-medium">
              Components
            </Link>
            <Link href="/motion-primitives" className="hover:text-foreground transition-colors font-medium">
              Motion Primitives
            </Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors font-medium">
              Live Preview
            </Link>
            <Link href="/components/accordion" className="hover:text-foreground transition-colors font-medium">
              Documentation
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              Log in
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="h-8 px-3.5 text-xs font-medium rounded-lg gap-1.5 shadow-xs">
                Open Dashboard
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Quiet Version Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/60 text-muted-foreground text-xs font-mono border border-border/80">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span className="text-foreground font-semibold">Apex 2.0</span>
            <span className="text-border">•</span>
            <span className="text-muted-foreground font-sans">Next.js 16 & React 19 Architecture</span>
          </div>

          {/* Concrete Headline */}
          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-foreground leading-[1.12]">
            Commercial CRM and customer operations for high-growth teams
          </h1>

          {/* Subhead */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
            A production-ready Next.js 16 admin theme with deal pipelines, customer tables, Redux Toolkit state, TanStack Query caching, and 33 motion primitives.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/dashboard">
              <Button size="lg" className="h-10 px-5 text-xs font-medium rounded-lg gap-2 shadow-xs">
                <span>View Live Dashboard</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
            <Link href="/components">
              <Button size="lg" variant="outline" className="h-10 px-5 text-xs font-medium rounded-lg gap-2 border-border/80 hover:bg-muted">
                <LayoutGrid className="size-3.5 text-muted-foreground" />
                <span>Explore 37 Components</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Moment: Real In-Code CRM Product Preview */}
        <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
          <div className="rounded-2xl border border-border/80 bg-card shadow-sm overflow-hidden">
            {/* Window Chrome */}
            <div className="h-11 border-b border-border/70 bg-muted/40 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-border" />
                <div className="size-2.5 rounded-full bg-border" />
                <div className="size-2.5 rounded-full bg-border" />
                <span className="ml-2 text-xs font-mono text-muted-foreground hidden sm:inline">
                  apex.crm.internal / pipeline
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-background border text-[11px] font-mono">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Q4 Live Pipeline
                </span>
              </div>
            </div>

            {/* Preview Body */}
            <div className="p-4 sm:p-6 space-y-6">
              {/* Stat Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-background border border-border/80 space-y-1">
                  <p className="text-xs text-muted-foreground">Quarterly Pipeline</p>
                  <div className="text-2xl font-bold font-mono tracking-tight text-foreground flex items-center">
                    <span>$</span>
                    <AnimatedNumber value={2480000} springOptions={{ stiffness: 70, damping: 15 }} />
                  </div>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-0.5">
                    +14.2% vs last quarter
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-background border border-border/80 space-y-1">
                  <p className="text-xs text-muted-foreground">Closed Won Revenue</p>
                  <div className="text-2xl font-bold font-mono tracking-tight text-foreground flex items-center">
                    <span>$</span>
                    <AnimatedNumber value={1120500} springOptions={{ stiffness: 70, damping: 15 }} />
                  </div>
                  <p className="text-[11px] text-muted-foreground font-medium pt-0.5">
                    42.8% win conversion
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-background border border-border/80 space-y-1">
                  <p className="text-xs text-muted-foreground">Active Deals</p>
                  <div className="text-2xl font-bold font-mono tracking-tight text-foreground">
                    <AnimatedNumber value={38} springOptions={{ stiffness: 70, damping: 15 }} />
                  </div>
                  <p className="text-[11px] text-muted-foreground font-medium pt-0.5">
                    5 contracts pending review
                  </p>
                </div>
              </div>

              {/* Mini Pipeline Kanban Board */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* Column 1: Discovery */}
                <div className="rounded-xl bg-muted/30 border border-border/60 p-3 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold px-1">
                    <span className="text-foreground">Discovery</span>
                    <Badge variant="secondary" className="text-[10px] h-4.5 px-1.5 font-mono">12</Badge>
                  </div>

                  <div className="p-3 rounded-lg bg-card border border-border/80 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium truncate">Starlight Enterprise</span>
                      <span className="text-xs font-mono font-semibold">$85,000</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Annual Platform Tier</span>
                      <span className="text-[10px] font-mono">Nov 14</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-card border border-border/80 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium truncate">Meridian Labs</span>
                      <span className="text-xs font-mono font-semibold">$42,000</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Custom API Connectors</span>
                      <span className="text-[10px] font-mono">Nov 18</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Proposal Sent */}
                <div className="rounded-xl bg-muted/30 border border-border/60 p-3 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold px-1">
                    <span className="text-foreground">Proposal Sent</span>
                    <Badge variant="secondary" className="text-[10px] h-4.5 px-1.5 font-mono">8</Badge>
                  </div>

                  <div className="p-3 rounded-lg bg-card border border-border/80 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium truncate">Vanguard Logistics</span>
                      <span className="text-xs font-mono font-semibold">$120,000</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>50 Seats + SSO</span>
                      <span className="text-[10px] font-mono text-primary font-medium">Under Review</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-card border border-border/80 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium truncate">Helix Health Inc</span>
                      <span className="text-xs font-mono font-semibold">$64,000</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>HIPAA Compliant Cloud</span>
                      <span className="text-[10px] font-mono">Nov 12</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Closing */}
                <div className="rounded-xl bg-muted/30 border border-border/60 p-3 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold px-1">
                    <span className="text-foreground">Contract Sent</span>
                    <Badge variant="secondary" className="text-[10px] h-4.5 px-1.5 font-mono">5</Badge>
                  </div>

                  <div className="p-3 rounded-lg bg-card border border-border/80 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium truncate">Beacon Media</span>
                      <span className="text-xs font-mono font-semibold">$96,000</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <span>Legal approved</span>
                      <span className="text-[10px] font-mono">Today</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-card border border-border/80 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium truncate">Horizon Robotics</span>
                      <span className="text-xs font-mono font-semibold">$150,000</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Multi-Year Contract</span>
                      <span className="text-[10px] font-mono">Tomorrow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Capabilities */}
      <section className="py-16 sm:py-20 border-t border-border/60 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              Built for speed, state scale, and design consistency
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every screen adheres to a strict 4px grid, unified typography tokens, and predictable component architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-card border border-border/80 space-y-3">
              <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-foreground">
                <Layers className="size-4" />
              </div>
              <h3 className="text-base font-semibold text-foreground">33 Motion Primitives</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Integrated from ibelick/motion-primitives. Includes text morphing, magnification docks, 3D card perspective, and sliding numbers.
              </p>
              <Link
                href="/components"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline pt-1"
              >
                <span>Browse motion components</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/80 space-y-3">
              <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-foreground">
                <ShieldCheck className="size-4" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Redux Toolkit State</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Structured stores, typed selectors, and actions configured for deals, contacts, user preferences, and offline draft storage.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline pt-1"
              >
                <span>Inspect store setup</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/80 space-y-3">
              <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-foreground">
                <Zap className="size-4" />
              </div>
              <h3 className="text-base font-semibold text-foreground">TanStack Query Ready</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Optimistic cache invalidation, background refetching, and pagination hooks wired to mock backend APIs.
              </p>
              <Link
                href="/crm/deals"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline pt-1"
              >
                <span>View CRM queries</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/60 bg-background text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-[10px]">
              A
            </div>
            <span className="font-semibold text-foreground">Apex CRM</span>
            <span>— Commercial Admin Theme</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/components" className="hover:text-foreground transition-colors">
              Components
            </Link>
            <Link href="/motion-primitives" className="hover:text-foreground transition-colors">
              Motion Primitives
            </Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/login" className="hover:text-foreground transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
