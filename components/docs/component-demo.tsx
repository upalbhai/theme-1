"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  RefreshCw,
  Play,
  Plus,
  Minus,
  DollarSign,
  Users,
  Briefcase,
  Zap,
  Flame,
  ArrowRight,
  TrendingUp,
  Sliders,
  Check,
  ChevronDown,
  Layers,
  Search,
} from "lucide-react";

// Core Motion Primitives
import { TextEffect } from "@/components/core/text-effect";
import { TextShimmer } from "@/components/core/text-shimmer";
import { TextLoop } from "@/components/core/text-loop";
import { TextMorph } from "@/components/core/text-morph";
import { TextScramble } from "@/components/core/text-scramble";
import { TextRoll } from "@/components/core/text-roll";
import { SpinningText } from "@/components/core/spinning-text";
import { TextShimmerWave } from "@/components/core/text-shimmer-wave";
import { AnimatedNumber } from "@/components/core/animated-number";
import { SlidingNumber } from "@/components/core/sliding-number";
import { Magnetic } from "@/components/core/magnetic";
import { Tilt } from "@/components/core/tilt";
import { Spotlight } from "@/components/core/spotlight";
import { BorderTrail } from "@/components/core/border-trail";
import { GlowEffect } from "@/components/core/glow-effect";
import { Cursor } from "@/components/core/cursor";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/core/dock";
import { InfiniteSlider } from "@/components/core/infinite-slider";
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "@/components/core/image-comparison";
import { AnimatedGroup } from "@/components/core/animated-group";
import { AnimatedBackground } from "@/components/core/animated-background";
import { TransitionPanel } from "@/components/core/transition-panel";
import { ScrollProgress } from "@/components/core/scroll-progress";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Disclosure, DisclosureTrigger, DisclosureContent } from "@/components/core/disclosure";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/core/dialog";
import { MorphingDialog, MorphingDialogTrigger, MorphingDialogContent, MorphingDialogContainer, MorphingDialogClose } from "@/components/core/morphing-dialog";
import { MorphingPopover, MorphingPopoverTrigger, MorphingPopoverContent } from "@/components/core/morphing-popover";
import { ToolbarDynamic } from "@/components/core/toolbar-dynamic";
import { ToolbarExpandable } from "@/components/core/toolbar-expandable";

export function ComponentDemo({ slug }: { slug: string }) {
  // Demo states
  const [key, setKey] = React.useState(0);
  const restart = () => setKey((k) => k + 1);

  // Text Effect state
  const [textEffectPreset, setTextEffectPreset] = React.useState<"fade" | "slide" | "scale" | "fade-in-blur">("fade-in-blur");
  const [textEffectPer, setTextEffectPer] = React.useState<"word" | "char" | "line">("word");
  const [textEffectInput, setTextEffectInput] = React.useState("Next.js 16 Motion Architecture");

  // Text Morph state
  const [morphWord, setMorphWord] = React.useState("Next.js 16");

  // Text Scramble state
  const [scrambleTrigger, setScrambleTrigger] = React.useState(true);

  // Animated Number state
  const [numberVal, setNumberVal] = React.useState(48250);

  // Sliding Number state
  const [slidingVal, setSlidingVal] = React.useState(1337);

  // Tilt factor state
  const [tiltFactor, setTiltFactor] = React.useState(15);

  // Glow mode state
  const [glowMode, setGlowMode] = React.useState<"rotate" | "pulse" | "breathe" | "colorShift">("breathe");

  // Transition Panel state
  const [activeStep, setActiveStep] = React.useState(0);

  // Dynamic router based on slug
  switch (slug) {
    case "text-effect":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <TextEffect
              key={`${key}-${textEffectPreset}-${textEffectPer}`}
              per={textEffectPer}
              preset={textEffectPreset}
              className="text-2xl md:text-3xl font-extrabold tracking-tight text-center text-foreground"
            >
              {textEffectInput}
            </TextEffect>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-card rounded-xl border">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">Preset:</span>
              {(["fade", "slide", "scale", "fade-in-blur"] as const).map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={textEffectPreset === p ? "default" : "outline"}
                  onClick={() => { setTextEffectPreset(p); restart(); }}
                  className="text-xs h-7"
                >
                  {p}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">Per:</span>
              {(["word", "char", "line"] as const).map((per) => (
                <Button
                  key={per}
                  size="sm"
                  variant={textEffectPer === per ? "default" : "outline"}
                  onClick={() => { setTextEffectPer(per); restart(); }}
                  className="text-xs h-7"
                >
                  {per}
                </Button>
              ))}
              <Button size="sm" variant="ghost" onClick={restart} className="h-7 gap-1">
                <RefreshCw className="size-3.5" />
                Replay
              </Button>
            </div>
          </div>
        </div>
      );

    case "text-shimmer":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border/80 bg-background/90 shadow-sm">
              <Sparkles className="size-4 text-amber-500 animate-pulse" />
              <TextShimmer
                duration={2}
                spread={2}
                className="text-base font-semibold tracking-wide text-foreground"
              >
                ✦ Enterprise CRM & Analytics Suite v2.0
              </TextShimmer>
            </div>
          </div>
        </div>
      );

    case "text-loop":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <div className="text-2xl font-bold flex items-center gap-2">
              <span>Building</span>
              <TextLoop interval={2.5} className="text-primary font-mono bg-primary/10 px-2.5 py-0.5 rounded-lg border border-primary/20">
                <span>Enterprise CRMs</span>
                <span>Customer Portals</span>
                <span>Revenue Pipelines</span>
                <span>SaaS Dashboards</span>
              </TextLoop>
            </div>
          </div>
        </div>
      );

    case "text-morph":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <div className="p-4 px-8 rounded-2xl bg-card border shadow-xs">
              <TextMorph className="text-3xl font-mono font-extrabold text-primary text-center">
                {morphWord}
              </TextMorph>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            {["Next.js 16", "React 19", "Tailwind v4", "Motion v14", "Apex CRM"].map((w) => (
              <Button
                key={w}
                size="sm"
                variant={morphWord === w ? "default" : "outline"}
                onClick={() => setMorphWord(w)}
                className="text-xs"
              >
                {w}
              </Button>
            ))}
          </div>
        </div>
      );

    case "text-scramble":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-zinc-950 border border-zinc-800 rounded-xl">
            <TextScramble
              key={key}
              trigger={scrambleTrigger}
              duration={1.2}
              characterSet="0123456789ABCDEF!@#$%^&*"
              className="font-mono text-2xl font-bold text-emerald-400 tracking-wider"
            >
              APEX_SECURITY_TOKEN_VERIFIED_2026
            </TextScramble>
          </div>

          <div className="flex justify-center">
            <Button size="sm" onClick={() => { restart(); setScrambleTrigger((t) => !t); }} className="gap-2">
              <Play className="size-4" />
              Scramble Again
            </Button>
          </div>
        </div>
      );

    case "text-roll":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <TextRoll
              key={key}
              className="text-3xl font-extrabold tracking-tight text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Enterprise Grade Motion
            </TextRoll>
          </div>
          <div className="flex justify-center">
            <Button size="sm" variant="outline" onClick={restart} className="gap-2 text-xs">
              <RefreshCw className="size-3.5" />
              Re-Roll Text
            </Button>
          </div>
        </div>
      );

    case "spinning-text":
      return (
        <div className="space-y-6">
          <div className="min-h-[220px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed relative">
            <div className="relative flex items-center justify-center">
              <SpinningText
                radius={4.5}
                fontSize={0.8}
                duration={10}
                className="font-mono uppercase font-bold text-primary"
              >
                • NEXT.JS 16 • MOTION PRIMITIVES • REACT 19 •
              </SpinningText>
              <div className="size-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                <Sparkles className="size-6" />
              </div>
            </div>
          </div>
        </div>
      );

    case "text-shimmer-wave":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <TextShimmerWave
              duration={1.8}
              spread={1.5}
              className="text-xl md:text-2xl font-bold text-foreground text-center"
            >
              Fluid Sinusoidal Shimmer Across Elements
            </TextShimmerWave>
          </div>
        </div>
      );

    case "animated-number":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <div className="text-4xl md:text-5xl font-extrabold font-mono tracking-tight text-foreground">
              $<AnimatedNumber value={numberVal} springOptions={{ stiffness: 60, damping: 14 }} />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="sm" variant="outline" onClick={() => setNumberVal((v) => v - 5000)} className="gap-1">
              <Minus className="size-3.5" /> $5,000
            </Button>
            <Button size="sm" variant="outline" onClick={() => setNumberVal((v) => v + 5000)} className="gap-1">
              <Plus className="size-3.5" /> $5,000
            </Button>
            <Button size="sm" variant="outline" onClick={() => setNumberVal(Math.floor(Math.random() * 90000) + 10000)} className="gap-1">
              <RefreshCw className="size-3.5" /> Randomize
            </Button>
          </div>
        </div>
      );

    case "sliding-number":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <div className="p-4 px-8 rounded-2xl bg-card border shadow-xs flex items-center gap-2">
              <span className="text-muted-foreground font-mono font-bold text-3xl">#</span>
              <SlidingNumber
                value={slidingVal}
                padStart={true}
                className="font-mono text-4xl font-extrabold text-primary"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button size="sm" variant="outline" onClick={() => setSlidingVal((v) => Math.max(0, v - 100))}>
              -100
            </Button>
            <Button size="sm" variant="outline" onClick={() => setSlidingVal((v) => Math.max(0, v - 1))}>
              -1
            </Button>
            <Button size="sm" variant="default" onClick={() => setSlidingVal((v) => v + 1)}>
              +1
            </Button>
            <Button size="sm" variant="default" onClick={() => setSlidingVal((v) => v + 100)}>
              +100
            </Button>
          </div>
        </div>
      );

    case "magnetic":
      return (
        <div className="space-y-6">
          <div className="min-h-[180px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed gap-6">
            <Magnetic intensity={0.3} range={90}>
              <Button size="lg" className="rounded-xl shadow-lg gap-2 cursor-pointer">
                <Sparkles className="size-4" />
                Magnetic Button
              </Button>
            </Magnetic>

            <Magnetic intensity={0.4} range={100}>
              <div className="size-12 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center shadow-md cursor-pointer">
                <Zap className="size-5" />
              </div>
            </Magnetic>

            <Magnetic intensity={0.25} range={80}>
              <Badge variant="outline" className="px-3 py-1.5 text-xs font-semibold cursor-pointer">
                Hover Around Me
              </Badge>
            </Magnetic>
          </div>
        </div>
      );

    case "tilt":
      return (
        <div className="space-y-6">
          <div className="min-h-[240px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <Tilt rotationFactor={tiltFactor} isReversed={false} className="w-full max-w-sm">
              <Card className="p-6 bg-card/90 backdrop-blur-md shadow-xl border border-border/80 rounded-2xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Briefcase className="size-5" />
                  </div>
                  <Badge variant="secondary">3D Gyro</Badge>
                </div>
                <h4 className="text-lg font-bold">Interactive Parallax Card</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Move your cursor around this surface to experience spatial perspective with spring physics.
                </p>
                <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
                  <span>Rotation: ±{tiltFactor}°</span>
                  <span className="text-primary font-medium flex items-center gap-1">
                    Explore <ArrowRight className="size-3" />
                  </span>
                </div>
              </Card>
            </Tilt>
          </div>
        </div>
      );

    case "spotlight":
      return (
        <div className="space-y-6">
          <div className="min-h-[220px] relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-8 flex flex-col justify-center items-center text-center">
            <Spotlight
              size={260}
              springOptions={{ stiffness: 60, damping: 15 }}
              className="from-blue-500/30 via-blue-500/10 to-transparent"
            />
            <div className="relative z-10 space-y-2">
              <div className="inline-flex size-10 rounded-full bg-blue-500/10 text-blue-400 items-center justify-center border border-blue-500/20 mb-2">
                <Sparkles className="size-5" />
              </div>
              <h4 className="text-xl font-bold text-white tracking-tight">Interactive Spotlight Surface</h4>
              <p className="text-sm text-zinc-400 max-w-md">
                Move your cursor across this dark canvas to reveal dynamic radial spotlight lighting.
              </p>
            </div>
          </div>
        </div>
      );

    case "border-trail":
      return (
        <div className="space-y-6">
          <div className="min-h-[200px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <div className="relative rounded-2xl p-8 bg-card border border-border/80 shadow-md max-w-md w-full overflow-hidden">
              <BorderTrail
                size={80}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="bg-linear-to-r from-blue-500 via-indigo-500 to-pink-500"
              />
              <div className="flex items-center gap-3 mb-2">
                <div className="size-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Processing</span>
              </div>
              <h4 className="text-lg font-bold">Realtime Pipeline Monitor</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Glowing border trail tracks the container perimeter with zero layout shift.
              </p>
            </div>
          </div>
        </div>
      );

    case "glow-effect":
      return (
        <div className="space-y-6">
          <div className="min-h-[200px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <div className="relative rounded-xl p-1 w-full max-w-xs">
              <GlowEffect
                key={`${key}-${glowMode}`}
                colors={["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"]}
                mode={glowMode}
                blur="soft"
                duration={3}
              />
              <div className="relative z-10 p-6 rounded-xl bg-card border shadow-lg text-center space-y-2">
                <h4 className="font-bold text-base">Ambient Glow Card</h4>
                <p className="text-xs text-muted-foreground">Mode: {glowMode}</p>
                <Button size="sm" className="w-full mt-2">Activate License</Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            {(["breathe", "rotate", "pulse", "colorShift"] as const).map((m) => (
              <Button
                key={m}
                size="sm"
                variant={glowMode === m ? "default" : "outline"}
                onClick={() => setGlowMode(m)}
                className="text-xs"
              >
                {m}
              </Button>
            ))}
          </div>
        </div>
      );

    case "cursor":
      return (
        <div className="space-y-6">
          <div className="relative h-64 w-full rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center">
            <Cursor
              attachToParent={true}
              springConfig={{ stiffness: 140, damping: 20 }}
            >
              <div className="size-6 rounded-full bg-primary/80 backdrop-blur-xs ring-4 ring-primary/20 pointer-events-none flex items-center justify-center">
                <div className="size-1.5 rounded-full bg-white" />
              </div>
            </Cursor>
            <div className="text-center space-y-1">
              <p className="text-zinc-200 font-semibold text-lg">Custom Follower Canvas</p>
              <p className="text-xs text-zinc-500">Hover inside this dark region to see spring cursor tracking</p>
            </div>
          </div>
        </div>
      );

    case "dock":
      return (
        <div className="space-y-6">
          <div className="min-h-[160px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <Dock className="p-2 border border-border/80 bg-background/90 rounded-2xl shadow-lg">
              <DockItem>
                <DockIcon>
                  <div className="size-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <DollarSign className="size-5" />
                  </div>
                </DockIcon>
                <DockLabel>Revenue</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon>
                  <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Users className="size-5" />
                  </div>
                </DockIcon>
                <DockLabel>Customers</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon>
                  <div className="size-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                    <Sparkles className="size-5" />
                  </div>
                </DockIcon>
                <DockLabel>Deals</DockLabel>
              </DockItem>
              <DockItem>
                <DockIcon>
                  <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Zap className="size-5" />
                  </div>
                </DockIcon>
                <DockLabel>Automations</DockLabel>
              </DockItem>
            </Dock>
          </div>
        </div>
      );

    case "infinite-slider":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed overflow-hidden">
            <InfiniteSlider speed={40} gap={24} className="w-full">
              {["Stripe", "HubSpot", "Salesforce", "Vercel", "Google Cloud", "Linear", "Supabase"].map((brand) => (
                <div
                  key={brand}
                  className="h-10 px-4 rounded-xl bg-card border shadow-xs flex items-center font-bold text-sm tracking-tight whitespace-nowrap"
                >
                  {brand}
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>
      );

    case "image-comparison":
      return (
        <div className="space-y-6">
          <div className="min-h-[260px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <ImageComparison className="aspect-16/9 w-full max-w-md rounded-2xl border shadow-lg overflow-hidden">
              <ImageComparisonImage
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                alt="Before filter"
                position="left"
              />
              <ImageComparisonImage
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80&sat=-100"
                alt="After grayscale"
                position="right"
              />
              <ImageComparisonSlider />
            </ImageComparison>
          </div>
        </div>
      );

    case "animated-group":
      return (
        <div className="space-y-6">
          <div className="min-h-[180px] p-8 bg-muted/20 border rounded-xl border-dashed">
            <AnimatedGroup
              key={key}
              preset="scale"
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                { title: "Active Pipeline", val: "$2.4M", change: "+12%" },
                { title: "Win Rate", val: "42.8%", change: "+4.2%" },
                { title: "Sales Cycle", val: "18 Days", change: "-3 Days" },
              ].map((item) => (
                <Card key={item.title} className="p-4 bg-card border shadow-xs">
                  <p className="text-xs text-muted-foreground">{item.title}</p>
                  <p className="text-2xl font-bold mt-1">{item.val}</p>
                  <Badge variant="outline" className="text-xs text-emerald-600 mt-2">{item.change}</Badge>
                </Card>
              ))}
            </AnimatedGroup>
          </div>
          <div className="flex justify-center">
            <Button size="sm" variant="outline" onClick={restart} className="gap-2 text-xs">
              <RefreshCw className="size-3.5" /> Re-trigger Stagger
            </Button>
          </div>
        </div>
      );

    case "animated-background":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <div className="p-1 rounded-xl bg-muted/50 border flex items-center gap-1">
              <AnimatedBackground
                defaultValue="overview"
                className="rounded-lg bg-background shadow-xs border border-border/80"
                transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
              >
                {["overview", "analytics", "customers", "deals"].map((tab) => (
                  <button
                    key={tab}
                    data-id={tab}
                    type="button"
                    className="px-4 py-2 text-xs font-semibold capitalize text-foreground transition-colors hover:text-primary cursor-pointer"
                  >
                    {tab}
                  </button>
                ))}
              </AnimatedBackground>
            </div>
          </div>
        </div>
      );

    case "transition-panel":
      return (
        <div className="space-y-6">
          <div className="min-h-[220px] p-6 bg-muted/20 border rounded-xl border-dashed flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b">
              {["1. Account", "2. Plan", "3. Confirm"].map((title, i) => (
                <Button
                  key={title}
                  size="sm"
                  variant={activeStep === i ? "default" : "ghost"}
                  onClick={() => setActiveStep(i)}
                  className="text-xs h-7"
                >
                  {title}
                </Button>
              ))}
            </div>

            <TransitionPanel
              activeIndex={activeStep}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="py-2"
            >
              <div key="step-1" className="space-y-2">
                <h4 className="font-bold text-base">Step 1: Account Information</h4>
                <p className="text-sm text-muted-foreground">Enter company domain and primary administrator credentials.</p>
              </div>
              <div key="step-2" className="space-y-2">
                <h4 className="font-bold text-base">Step 2: Subscription Tier</h4>
                <p className="text-sm text-muted-foreground">Select your seat allocation, add-ons, and payment method.</p>
              </div>
              <div key="step-3" className="space-y-2">
                <h4 className="font-bold text-base">Step 3: Ready to Launch!</h4>
                <p className="text-sm text-muted-foreground">Review your configuration before provisioning infrastructure.</p>
              </div>
            </TransitionPanel>

            <div className="flex justify-between mt-6 pt-4 border-t">
              <Button
                size="sm"
                variant="outline"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
              >
                Previous
              </Button>
              <Button
                size="sm"
                disabled={activeStep === 2}
                onClick={() => setActiveStep((s) => Math.min(2, s + 1))}
              >
                Next Step
              </Button>
            </div>
          </div>
        </div>
      );

    case "scroll-progress":
      return (
        <div className="space-y-6">
          <div className="relative h-48 border rounded-xl overflow-hidden bg-card flex flex-col">
            <ScrollProgress className="top-0 h-1 bg-primary z-10" />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <p className="text-xs font-semibold text-muted-foreground">Scroll down inside this box to see the progress bar in action:</p>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="p-3 bg-muted/40 rounded-lg text-xs">
                  Activity Log Entry #{i + 1} — Synced contact updates from CRM webhook.
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "accordion":
      return (
        <div className="space-y-6">
          <div className="p-6 bg-muted/20 border rounded-xl border-dashed">
            <Accordion defaultValue="q-1">
              <AccordionItem value="q-1">
                <AccordionTrigger>What makes this theme high-converting?</AccordionTrigger>
                <AccordionContent>
                  Apex CRM integrates micro-interactions, responsive spring-physics counters, and high-contrast tokens engineered for modern enterprise applications.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q-2">
                <AccordionTrigger>How does motion v14 differ from earlier versions?</AccordionTrigger>
                <AccordionContent>
                  Motion v14 features zero-overhead bundle footprints, direct React 19 compiler support, and modern hardware-accelerated CSS offset paths.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      );

    case "disclosure":
      return (
        <div className="space-y-6">
          <div className="p-6 bg-muted/20 border rounded-xl border-dashed max-w-md mx-auto">
            <Disclosure className="rounded-xl border p-4 bg-card shadow-xs">
              <DisclosureTrigger className="flex items-center justify-between w-full font-bold text-sm cursor-pointer">
                <span>View Webhook Configuration</span>
                <ChevronDown className="size-4 text-muted-foreground transition-transform" />
              </DisclosureTrigger>
              <DisclosureContent>
                <div className="pt-3 text-xs text-muted-foreground space-y-2 border-t mt-3">
                  <p>Endpoint: <code className="bg-muted px-1 py-0.5 rounded text-foreground">https://api.apex.io/v1/sync</code></p>
                  <p>Secret: <code className="bg-muted px-1 py-0.5 rounded text-foreground">whsec_****************</code></p>
                </div>
              </DisclosureContent>
            </Disclosure>
          </div>
        </div>
      );

    case "dialog":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <Dialog>
              <DialogTrigger>
                <Button className="gap-2">
                  <Sparkles className="size-4" /> Open Spring Dialog
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md p-6 bg-card rounded-2xl border shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold">Export Pipeline Data</DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground mt-1">
                    Your export will include all customer deals, contacts, and closed revenue.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button size="sm">Confirm Export</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      );

    case "morphing-dialog":
      return (
        <div className="space-y-6">
          <div className="min-h-[180px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <MorphingDialog>
              <MorphingDialogTrigger className="rounded-2xl border p-4 bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer max-w-xs w-full">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                    <Sparkles className="size-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Morphing Dialog</h5>
                    <p className="text-xs text-muted-foreground">Click to morph into modal</p>
                  </div>
                </div>
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent className="max-w-lg p-6 bg-card rounded-2xl border shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Expanded Case Study</h3>
                    <MorphingDialogClose />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This card morphed seamlessly from its origin coordinates directly into this modal view without popping or abrupt layout jumping.
                  </p>
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
          </div>
        </div>
      );

    case "morphing-popover":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <MorphingPopover>
              <MorphingPopoverTrigger className="rounded-xl bg-primary px-4 py-2.5 text-primary-foreground font-semibold text-sm shadow-md cursor-pointer">
                Create Fast Deal
              </MorphingPopoverTrigger>
              <MorphingPopoverContent className="w-80 p-5 bg-card rounded-2xl border shadow-2xl space-y-3">
                <h4 className="font-bold text-sm">Quick Deal Creator</h4>
                <input
                  type="text"
                  placeholder="Deal title..."
                  className="w-full text-xs p-2 rounded-lg border bg-muted/30 focus:outline-hidden"
                />
                <Button size="sm" className="w-full text-xs">Save to Pipeline</Button>
              </MorphingPopoverContent>
            </MorphingPopover>
          </div>
        </div>
      );

    case "toolbar-dynamic":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <ToolbarDynamic />
          </div>
        </div>
      );

    case "toolbar-expandable":
      return (
        <div className="space-y-6">
          <div className="min-h-[160px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <ToolbarExpandable />
          </div>
        </div>
      );

    case "button":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex flex-wrap items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="icon" variant="outline"><Sparkles className="size-4" /></Button>
          </div>
        </div>
      );

    case "card":
      return (
        <div className="space-y-6">
          <div className="min-h-[180px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <Card className="w-full max-w-sm shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Revenue Overview</CardTitle>
                <CardDescription>Quarterly metrics summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono">$128,450.00</div>
                <p className="text-xs text-emerald-600 mt-1">+14.2% from last quarter</p>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case "badge":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex flex-wrap items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 bg-emerald-500/10">
              Active Stage
            </Badge>
          </div>
        </div>
      );

    case "tabs":
      return (
        <div className="space-y-6">
          <div className="min-h-[180px] p-8 bg-muted/20 border rounded-xl border-dashed">
            <Tabs defaultValue="account" className="w-full max-w-md mx-auto">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="billing">Billing & Plan</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="p-4 bg-card rounded-xl border mt-3 text-sm">
                Account profile and team administrator settings.
              </TabsContent>
              <TabsContent value="billing" className="p-4 bg-card rounded-xl border mt-3 text-sm">
                Subscription invoices and credit card management.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      );

    case "switch":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
            <div className="flex items-center space-x-3 p-4 bg-card rounded-xl border shadow-xs">
              <Switch id="demo-mode" defaultChecked />
              <label htmlFor="demo-mode" className="text-sm font-medium cursor-pointer">
                Real-time Webhook Streaming
              </label>
            </div>
          </div>
        </div>
      );

    case "avatar":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed gap-4">
            <Avatar className="size-12">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Sarah" />
              <AvatarFallback>SP</AvatarFallback>
            </Avatar>
            <Avatar className="size-10">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Alex" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      );

    case "progress":
      return (
        <div className="space-y-6">
          <div className="min-h-[140px] flex flex-col items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed space-y-4">
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span>Migration Progress</span>
                <span className="text-primary font-bold">78%</span>
              </div>
              <Progress value={78} className="h-2 w-full" />
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="min-h-[140px] flex items-center justify-center p-8 bg-muted/20 border rounded-xl border-dashed">
          <p className="text-sm text-muted-foreground">Interactive demo for {slug} is active.</p>
        </div>
      );
  }
}
