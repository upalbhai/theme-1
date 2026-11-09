"use client";

import * as React from "react";
import Link from "next/link";
import { CommandMenuTrigger } from "@/components/docs/component-command-menu";
import {
  Sparkles,
  MousePointer2,
  TrendingUp,
  Layers,
  Search,
  Copy,
  Check,
  RefreshCw,
  Code2,
  ChevronRight,
  Sliders,
  DollarSign,
  Users,
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Folder,
  Send,
  Eye,
  SlidersHorizontal,
  ExternalLink,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Motion Primitives
import { TextEffect } from "@/components/core/text-effect";
import { TextShimmer } from "@/components/core/text-shimmer";
import { TextShimmerWave } from "@/components/core/text-shimmer-wave";
import { TextLoop } from "@/components/core/text-loop";
import { TextMorph } from "@/components/core/text-morph";
import { TextScramble } from "@/components/core/text-scramble";
import { TextRoll } from "@/components/core/text-roll";
import { SpinningText } from "@/components/core/spinning-text";
import { AnimatedNumber } from "@/components/core/animated-number";
import { SlidingNumber } from "@/components/core/sliding-number";
import { Magnetic } from "@/components/core/magnetic";
import { Tilt } from "@/components/core/tilt";
import { Spotlight } from "@/components/core/spotlight";
import { BorderTrail } from "@/components/core/border-trail";
import { GlowEffect } from "@/components/core/glow-effect";
import { AnimatedGroup } from "@/components/core/animated-group";
import { AnimatedBackground } from "@/components/core/animated-background";
import { InfiniteSlider } from "@/components/core/infinite-slider";
import { ImageComparison } from "@/components/core/image-comparison";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/core/accordion";
import { Dock, DockIcon, DockItem } from "@/components/core/dock";
import { TransitionPanel } from "@/components/core/transition-panel";
import { Timeline, TimelineItem, TimelineSeparator, TimelineNode, TimelineConnector, TimelineContent } from "@/components/ui/timeline";

export default function ComponentsDirectoryPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Dynamic preview states
  const [morphWord, setMorphWord] = React.useState("Next.js 16");
  const [scrambleKey, setScrambleKey] = React.useState(0);
  const [numValue, setNumValue] = React.useState(94820);
  const [activePanelTab, setActivePanelTab] = React.useState(0);
  const [switchState, setSwitchState] = React.useState(true);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    { id: "all", label: "All Components", count: 28 },
    { id: "text", label: "Text & Typography", count: 8 },
    { id: "interactions", label: "Micro-Interactions", count: 6 },
    { id: "numbers", label: "Numbers & Data", count: 3 },
    { id: "surfaces", label: "Surfaces & Navigation", count: 6 },
    { id: "ui", label: "Standard UI & Forms", count: 5 },
  ];

  return (
    <div className="flex-1 space-y-8 p-6 md:p-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-xs">
        <BorderTrail size={120} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="bg-gradient-to-r from-primary via-blue-400 to-indigo-500" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <span>Full Component Design System</span>
              </div>
              <a
                href="https://github.com/ibelick/motion-primitives"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60 px-3 py-1 text-xs font-medium transition-colors"
              >
                <span>Motion Primitives by @ibelick</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Component Library & Usage
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Explore our unified collection of animated motion primitives from <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">motion-primitives</code> alongside production UI components. Complete with live interactive demos and copy-paste code snippets.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <CommandMenuTrigger className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground bg-background/90 hover:bg-background border border-border/80 rounded-xl shadow-xs transition-colors cursor-pointer w-full sm:w-56" />

            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Filter cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background/80"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border/60">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${selectedCategory === cat.id
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat.id ? "bg-primary-foreground/20 text-primary-foreground" : "bg-background text-muted-foreground"
                }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* COMPONENT CARDS GRID */}
      <div className="space-y-12">
        {/* 1. TEXT & TYPOGRAPHY SECTION */}
        {(selectedCategory === "all" || selectedCategory === "text") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-primary" />
              <h2 className="text-xl font-bold tracking-tight">Text & Typography Primitives</h2>
              <Badge variant="outline" className="text-xs ml-auto">8 Components</Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Text Effect */}
              <ComponentCard
                title="TextEffect"
                badge="motion/core"
                description="Per-word or per-character spring-animated entrance transitions."
                codeSnippet={`import { TextEffect } from "@/components/core/text-effect";

<TextEffect per="word" preset="blur" as="h1">
  Empower your SaaS with fluid, spring-based animations.
</TextEffect>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-text-effect"
              >
                <div className="min-h-[90px] flex items-center justify-center p-4 bg-muted/30 rounded-lg text-center">
                  <TextEffect per="word" as="h3" preset="blur" className="text-lg font-semibold">
                    Empower your product with fluid, spring-based animations.
                  </TextEffect>
                </div>
              </ComponentCard>

              {/* Text Shimmer & Shimmer Wave */}
              <ComponentCard
                title="TextShimmer & Wave"
                badge="motion/core"
                description="Luminous gradient sweep across text, badges, and headers."
                codeSnippet={`import { TextShimmer } from "@/components/core/text-shimmer";
import { TextShimmerWave } from "@/components/core/text-shimmer-wave";

<TextShimmer className="text-lg font-bold">
  ✦ Enterprise Design System
</TextShimmer>
<TextShimmerWave>Harmonic wave illumination</TextShimmerWave>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-text-shimmer"
              >
                <div className="min-h-[90px] flex flex-col items-center justify-center gap-2 p-4 bg-muted/30 rounded-lg">
                  <TextShimmer className="text-lg font-bold">
                    ✦ Enterprise Design System
                  </TextShimmer>
                  <TextShimmerWave className="text-xs font-medium text-muted-foreground">
                    Harmonic wave illumination sweep
                  </TextShimmerWave>
                </div>
              </ComponentCard>

              {/* Text Loop */}
              <ComponentCard
                title="TextLoop"
                badge="motion/core"
                description="Smooth vertical carousel rotating through alternating phrases."
                codeSnippet={`import { TextLoop } from "@/components/core/text-loop";

<div className="flex items-center gap-1 font-semibold">
  <span>Optimized for</span>
  <TextLoop className="text-primary font-bold">
    <span>Modern SaaS</span>
    <span>Fintech Portals</span>
    <span>AI Dashboards</span>
  </TextLoop>
</div>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-text-loop"
              >
                <div className="min-h-[90px] flex items-center justify-center p-4 bg-muted/30 rounded-lg text-base font-semibold">
                  <span className="mr-2 text-muted-foreground">Optimized for</span>
                  <TextLoop className="text-primary font-bold underline decoration-primary/30 underline-offset-4">
                    <span>Modern SaaS</span>
                    <span>Fintech Portals</span>
                    <span>AI Dashboards</span>
                    <span>CRM Workspaces</span>
                  </TextLoop>
                </div>
              </ComponentCard>

              {/* Text Morph */}
              <ComponentCard
                title="TextMorph"
                badge="motion/core"
                description="Fluid shape morphing between different strings."
                codeSnippet={`import { TextMorph } from "@/components/core/text-morph";

<TextMorph className="text-xl font-bold">
  {statusText}
</TextMorph>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-text-morph"
              >
                <div className="min-h-[90px] flex items-center justify-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <TextMorph className="text-xl font-bold text-foreground">
                    {morphWord}
                  </TextMorph>
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-7"
                    onClick={() => setMorphWord((prev) => (prev === "Next.js 16" ? "Motion Primitives" : prev === "Motion Primitives" ? "Apex Theme" : "Next.js 16"))}
                  >
                    <RefreshCw className="size-3.5" />
                  </Button>
                </div>
              </ComponentCard>

              {/* Text Scramble */}
              <ComponentCard
                title="TextScramble"
                badge="motion/core"
                description="Hacker matrix-style character deciphering animation."
                codeSnippet={`import { TextScramble } from "@/components/core/text-scramble";

<TextScramble className="font-mono text-sm">
  SECURE_TOKEN_AUTHENTICATED
</TextScramble>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-text-scramble"
              >
                <div className="min-h-[90px] flex items-center justify-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <TextScramble key={scrambleKey} className="font-mono text-sm tracking-wider text-primary">
                    CRYPTO_VERIFIED_KEY_256
                  </TextScramble>
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-7"
                    onClick={() => setScrambleKey((k) => k + 1)}
                  >
                    <RefreshCw className="size-3.5" />
                  </Button>
                </div>
              </ComponentCard>

              {/* Spinning Text */}
              <ComponentCard
                title="SpinningText"
                badge="motion/core"
                description="Radial circular rotating badge animation."
                codeSnippet={`import { SpinningText } from "@/components/core/spinning-text";

<SpinningText radius={4.5} fontSize={0.75} duration={12}>
  ★ APEX CRM • MOTION PRIMITIVES •
</SpinningText>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-spinning-text"
              >
                <div className="min-h-[140px] flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                  <div className="relative flex items-center justify-center size-28">
                    <SpinningText radius={4} fontSize={0.7} duration={10} className="font-semibold uppercase tracking-widest text-primary">
                      ★ APEX THEME • MOTION PRIMITIVES •
                    </SpinningText>

                  </div>
                </div>
              </ComponentCard>
            </div>
          </div>
        )}

        {/* 2. MICRO-INTERACTIONS SECTION */}
        {(selectedCategory === "all" || selectedCategory === "interactions") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-emerald-500" />
              <h2 className="text-xl font-bold tracking-tight">Micro-Interactions & Cursor Physics</h2>
              <Badge variant="outline" className="text-xs ml-auto">6 Components</Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Magnetic */}
              <ComponentCard
                title="Magnetic"
                badge="motion/core"
                description="Pulls elements towards cursor with spring physics."
                codeSnippet={`import { Magnetic } from "@/components/core/magnetic";

<Magnetic springOptions={{ bounce: 0.2 }}>
  <Button className="rounded-full">Hover Over Me</Button>
</Magnetic>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-magnetic"
              >
                <div className="min-h-[120px] flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                  <Magnetic springOptions={{ bounce: 0.2 }}>
                    <Button size="sm" className="rounded-full shadow-md gap-1.5">
                      <MousePointer2 className="size-3.5" />
                      Hover Me
                    </Button>
                  </Magnetic>
                </div>
              </ComponentCard>

              {/* 3D Tilt */}
              <ComponentCard
                title="Tilt"
                badge="motion/core"
                description="3D Parallax perspective tilt tracking pointer movement."
                codeSnippet={`import { Tilt } from "@/components/core/tilt";

<Tilt rotationFactor={12} isReverse>
  <div className="w-48 h-28 rounded-xl bg-primary text-white p-4">
    Card Content
  </div>
</Tilt>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-tilt"
              >
                <div className="min-h-[120px] flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                  <Tilt rotationFactor={10} isReverse>
                    <div className="w-40 h-20 rounded-xl bg-gradient-to-tr from-primary to-blue-500 p-3 text-white flex flex-col justify-between shadow-xs">
                      <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">3D Tilt Card</span>
                      <span className="font-mono text-xs">•••• 8912</span>
                    </div>
                  </Tilt>
                </div>
              </ComponentCard>

              {/* Spotlight */}
              <ComponentCard
                title="Spotlight"
                badge="motion/core"
                description="Cursor-following radial glow beam effect."
                codeSnippet={`import { Spotlight } from "@/components/core/spotlight";

<div className="relative overflow-hidden p-6">
  <Spotlight size={180} className="from-primary/20 blur-2xl" />
  <h3>Interactive Card</h3>
</div>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-spotlight"
              >
                <div className="min-h-[120px] relative overflow-hidden flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                  <Spotlight size={160} fill="rgba(217, 84, 30, 0.45)" />
                  <span className="relative z-10 text-xs font-semibold">Hover to illuminate</span>
                  <span className="relative z-10 text-[10px] text-muted-foreground mt-0.5">Tracks pointer coordinates</span>
                </div>
              </ComponentCard>

              {/* Border Trail */}
              <ComponentCard
                title="BorderTrail"
                badge="motion/core"
                description="Luminous traveling tracer along card borders."
                codeSnippet={`import { BorderTrail } from "@/components/core/border-trail";

<div className="relative rounded-xl border p-4">
  <BorderTrail size={80} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
  <span>Active Trail</span>
</div>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-border-trail"
              >
                <div className="min-h-[120px] flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                  <div className="relative w-36 h-20 rounded-xl border border-border bg-card p-3 flex flex-col justify-center items-center shadow-xs overflow-hidden">
                    <BorderTrail size={60} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="bg-gradient-to-r from-primary to-emerald-400" />
                    <span className="text-xs font-semibold">Border Beam</span>
                    <span className="text-[10px] text-muted-foreground">Infinite Path</span>
                  </div>
                </div>
              </ComponentCard>

              {/* Glow Effect */}
              <ComponentCard
                title="GlowEffect"
                badge="motion/core"
                description="Rotating or breathing ambient back-glow aura."
                codeSnippet={`import { GlowEffect } from "@/components/core/glow-effect";

<div className="relative">
  <GlowEffect colors={['#d9541e', '#e8590c']} mode="rotate" blur="soft" />
  <div className="relative bg-card p-4 rounded-lg">Content</div>
</div>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-glow-effect"
              >
                <div className="min-h-[120px] flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                  <div className="relative">
                    <GlowEffect
                      colors={['#d9541e', '#e8590c', '#f59f00', '#d9541e']}
                      mode="rotate"
                      blur="soft"
                      duration={4}
                    />
                    <div className="relative px-4 py-2 rounded-lg bg-card border border-border text-xs font-semibold">
                      Aura Button
                    </div>
                  </div>
                </div>
              </ComponentCard>

              {/* Image Comparison */}
              <ComponentCard
                title="ImageComparison"
                badge="motion/core"
                description="Interactive before / after split slider."
                codeSnippet={`import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "@/components/core/image-comparison";

<ImageComparison>
  <ImageComparisonImage src="/before.jpg" alt="Before" position="left" />
  <ImageComparisonImage src="/after.jpg" alt="After" position="right" />
  <ImageComparisonSlider />
</ImageComparison>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-image-comp"
              >
                <div className="min-h-[120px] flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-semibold">Before / After Slider</span>
                    <p className="text-[10px] text-muted-foreground">Split comparison with drag handler</p>
                  </div>
                </div>
              </ComponentCard>
            </div>
          </div>
        )}

        {/* 3. NUMBERS & DATA METRICS */}
        {(selectedCategory === "all" || selectedCategory === "numbers") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-blue-500" />
              <h2 className="text-xl font-bold tracking-tight">Numbers & Statistical Animations</h2>
              <Badge variant="outline" className="text-xs ml-auto">3 Components</Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Animated Number */}
              <ComponentCard
                title="AnimatedNumber"
                badge="motion/core"
                description="Smooth spring physics counting with localized comma thousands."
                codeSnippet={`import { AnimatedNumber } from "@/components/core/animated-number";

<div className="text-3xl font-bold flex items-center">
  $ <AnimatedNumber value={89450} />
</div>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-anim-number"
              >
                <div className="min-h-[100px] flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-3xl font-bold tracking-tight text-foreground flex items-center">
                    <span className="mr-0.5">$</span>
                    <AnimatedNumber value={numValue} />
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 text-xs mt-2 text-muted-foreground gap-1"
                    onClick={() => setNumValue(Math.floor(10000 + Math.random() * 900000))}
                  >
                    <RefreshCw className="size-3" />
                    Randomize
                  </Button>
                </div>
              </ComponentCard>

              {/* Sliding Number */}
              <ComponentCard
                title="SlidingNumber"
                badge="motion/core"
                description="Mechanical digit tumbler roll per numeral."
                codeSnippet={`import { SlidingNumber } from "@/components/core/sliding-number";

<div className="text-3xl font-bold font-mono">
  <SlidingNumber value={numValue} />
</div>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-sliding-number"
              >
                <div className="min-h-[100px] flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-3xl font-bold font-mono tracking-tight text-foreground">
                    <SlidingNumber value={numValue} />
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 text-xs mt-2 text-muted-foreground gap-1"
                    onClick={() => setNumValue(Math.floor(10000 + Math.random() * 900000))}
                  >
                    <RefreshCw className="size-3" />
                    Randomize
                  </Button>
                </div>
              </ComponentCard>
            </div>
          </div>
        )}

        {/* 4. SURFACES, LAYOUTS & DOCKS */}
        {(selectedCategory === "all" || selectedCategory === "surfaces") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-purple-500" />
              <h2 className="text-xl font-bold tracking-tight">Surfaces, Layouts & Docks</h2>
              <Badge variant="outline" className="text-xs ml-auto">6 Components</Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* macOS Dock */}
              <ComponentCard
                title="Dock"
                badge="motion/core"
                description="macOS-inspired interactive magnification dock."
                codeSnippet={`import { Dock, DockItem, DockIcon } from "@/components/core/dock";

<Dock className="p-2 bg-background/80 rounded-2xl border">
  <DockItem>
    <DockIcon><DollarSign className="size-5" /></DockIcon>
  </DockItem>
  <DockItem>
    <DockIcon><Users className="size-5" /></DockIcon>
  </DockItem>
</Dock>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-dock"
              >
                <div className="min-h-[100px] flex items-center justify-center p-4 bg-muted/30 rounded-lg">
                  <Dock className="p-1.5 border border-border/80 bg-background/90 rounded-2xl shadow-xs">
                    <DockItem>
                      <DockIcon>
                        <div className="size-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                          <DollarSign className="size-4" />
                        </div>
                      </DockIcon>
                    </DockItem>
                    <DockItem>
                      <DockIcon>
                        <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                          <Users className="size-4" />
                        </div>
                      </DockIcon>
                    </DockItem>
                    <DockItem>
                      <DockIcon>
                        <div className="size-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                          <Sparkles className="size-4" />
                        </div>
                      </DockIcon>
                    </DockItem>
                    <DockItem>
                      <DockIcon>
                        <div className="size-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                          <Zap className="size-4" />
                        </div>
                      </DockIcon>
                    </DockItem>
                  </Dock>
                </div>
              </ComponentCard>

              {/* Infinite Slider */}
              <ComponentCard
                title="InfiniteSlider"
                badge="motion/core"
                description="Continuous looping ticker marquee for logos and tags."
                codeSnippet={`import { InfiniteSlider } from "@/components/core/infinite-slider";

<InfiniteSlider speed={40} gap={16}>
  {items.map(item => <div key={item}>{item}</div>)}
</InfiniteSlider>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-infinite-slider"
              >
                <div className="min-h-[100px] flex items-center justify-center p-4 bg-muted/30 rounded-lg overflow-hidden">
                  <InfiniteSlider speed={35} gap={16}>
                    {["Next.js", "Tailwind CSS", "Motion", "Redux", "TanStack", "Radix"].map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-md bg-card border border-border text-xs font-semibold whitespace-nowrap shadow-2xs">
                        {tech}
                      </span>
                    ))}
                  </InfiniteSlider>
                </div>
              </ComponentCard>

              {/* Timeline */}
              <ComponentCard
                title="Timeline"
                badge="shadcn/ui"
                description="Chronological step timeline with mathematically centered nodes and continuous connectors."
                codeSnippet={`import { 
  Timeline, 
  TimelineItem, 
  TimelineSeparator, 
  TimelineNode, 
  TimelineConnector, 
  TimelineContent 
} from "@/components/ui/timeline";

<Timeline size="sm">
  <TimelineItem>
    <TimelineSeparator>
      <TimelineNode status="completed">
        <Check className="size-3 text-emerald-600" />
      </TimelineNode>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <p className="text-xs font-semibold">Discovery Call</p>
      <p className="text-[11px] text-muted-foreground">Scoping confirmed for Q3.</p>
    </TimelineContent>
  </TimelineItem>
</Timeline>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-timeline"
              >
                <div className="p-3 bg-muted/20 rounded-lg">
                  <Timeline size="sm">
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineNode status="completed">
                          <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                        </TimelineNode>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-foreground">Discovery Call</p>
                          <span className="text-[10px] font-mono text-muted-foreground">10m ago</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">Scoping confirmed for Q3.</p>
                      </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineNode status="active">
                          <Clock className="size-3 text-primary" />
                        </TimelineNode>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-foreground">Architecture Review</p>
                          <span className="text-[10px] font-mono text-muted-foreground">Just now</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">Multi-region failover verified.</p>
                      </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineNode status="pending">
                          <span className="size-1.5 rounded-full bg-muted-foreground/60" />
                        </TimelineNode>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-foreground">Contract Executed</p>
                          <span className="text-[10px] font-mono text-muted-foreground">Scheduled</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">PO procurement awaiting sign-off.</p>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </div>
              </ComponentCard>

              {/* Animated Accordion */}
              <ComponentCard
                title="Accordion"
                badge="motion/core"
                description="Fluid spring collapse/expand with smooth height interpolation."
                codeSnippet={`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/core/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Apex Theme?</AccordionTrigger>
    <AccordionContent>A complete Next.js CRM theme.</AccordionContent>
  </AccordionItem>
</Accordion>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-accordion"
              >
                <div className="min-h-[120px] p-4 bg-muted/30 rounded-lg">
                  <Accordion defaultValue="q1">
                    <AccordionItem value="q1">
                      <AccordionTrigger className="text-xs">
                        What makes this component special?
                      </AccordionTrigger>
                      <AccordionContent className="text-xs">
                        It animates heights with native spring physics without hardcoded max-height limits.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="q2">
                      <AccordionTrigger className="text-xs">
                        Can I customize transitions?
                      </AccordionTrigger>
                      <AccordionContent className="text-xs">
                        Yes, pass custom motion transition definitions directly via props.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </ComponentCard>

              {/* Transition Panel */}
              <ComponentCard
                title="TransitionPanel"
                badge="motion/core"
                description="Animated switching container with directional slide & crossfade."
                codeSnippet={`import { TransitionPanel } from "@/components/core/transition-panel";

<TransitionPanel activeIndex={activeTab}>
  <div>Panel 1 content</div>
  <div>Panel 2 content</div>
</TransitionPanel>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-trans-panel"
              >
                <div className="min-h-[120px] p-4 bg-muted/30 rounded-lg flex flex-col justify-between">
                  <div className="flex gap-2 mb-3">
                    {["Overview", "Settings", "Billing"].map((tab, idx) => (
                      <button
                        key={tab}
                        onClick={() => setActivePanelTab(idx)}
                        className={`text-xs px-2.5 py-1 rounded-md transition-colors ${activePanelTab === idx ? "bg-primary text-primary-foreground font-semibold" : "bg-card border text-muted-foreground"
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <TransitionPanel
                    activeIndex={activePanelTab}
                    className="p-3 bg-card rounded-md border text-xs"
                    variants={{
                      enter: (direction: number) => ({
                        x: direction > 0 ? 40 : -40,
                        opacity: 0,
                      }),
                      center: {
                        x: 0,
                        opacity: 1,
                      },
                      exit: (direction: number) => ({
                        x: direction < 0 ? 40 : -40,
                        opacity: 0,
                      }),
                    }}
                  >
                    {[
                      "Overview Panel: High-level analytics and health indicators.",
                      "Settings Panel: Manage API keys and webhooks.",
                      "Billing Panel: Current active subscription plan details.",
                    ].map((text, i) => (
                      <div key={i}>{text}</div>
                    ))}
                  </TransitionPanel>
                </div>
              </ComponentCard>
            </div>
          </div>
        )}

        {/* 5. STANDARD UI & FORMS */}
        {(selectedCategory === "all" || selectedCategory === "ui") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-amber-500" />
              <h2 className="text-xl font-bold tracking-tight">Standard UI & Form Components</h2>
              <Badge variant="outline" className="text-xs ml-auto">5 Components</Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Buttons */}
              <ComponentCard
                title="Button"
                badge="components/ui/button"
                description="Comprehensive variants: default, secondary, outline, ghost, destructive."
                codeSnippet={`import { Button } from "@/components/ui/button";

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-button"
              >
                <div className="min-h-[100px] flex flex-wrap items-center justify-center gap-2 p-4 bg-muted/30 rounded-lg">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">Secondary</Button>
                  <Button size="sm" variant="outline">Outline</Button>
                  <Button size="sm" variant="destructive">Destructive</Button>
                </div>
              </ComponentCard>

              {/* Badges */}
              <ComponentCard
                title="Badge"
                badge="components/ui/badge"
                description="Status chips and indicators with theme tokens."
                codeSnippet={`import { Badge } from "@/components/ui/badge";

<Badge>Active</Badge>
<Badge variant="outline">Draft</Badge>
<Badge variant="destructive">Failed</Badge>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-badge"
              >
                <div className="min-h-[100px] flex flex-wrap items-center justify-center gap-2 p-4 bg-muted/30 rounded-lg">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Critical</Badge>
                </div>
              </ComponentCard>

              {/* Switch & Toggles */}
              <ComponentCard
                title="Switch & Controls"
                badge="components/ui/switch"
                description="Smooth accessible switch toggles."
                codeSnippet={`import { Switch } from "@/components/ui/switch";

<Switch checked={isEnabled} onCheckedChange={setIsEnabled} />`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-switch"
              >
                <div className="min-h-[100px] flex items-center justify-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <span className="text-xs font-medium">Notifications</span>
                  <Switch checked={switchState} onCheckedChange={setSwitchState} />
                </div>
              </ComponentCard>

              {/* Avatar */}
              <ComponentCard
                title="Avatar"
                badge="components/ui/avatar"
                description="Image avatars with fallback initials."
                codeSnippet={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>AP</AvatarFallback>
</Avatar>`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-avatar"
              >
                <div className="min-h-[100px] flex items-center justify-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">AP</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-emerald-500/10 text-emerald-600 font-semibold text-xs">TC</AvatarFallback>
                  </Avatar>
                </div>
              </ComponentCard>

              {/* Progress */}
              <ComponentCard
                title="Progress"
                badge="components/ui/progress"
                description="Linear animated progress indicators."
                codeSnippet={`import { Progress } from "@/components/ui/progress";

<Progress value={68} />`}
                copiedId={copiedId}
                onCopy={copyCode}
                id="c-progress"
              >
                <div className="min-h-[100px] flex flex-col justify-center p-4 bg-muted/30 rounded-lg space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Task Completion</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </ComponentCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable card container with interactive preview, code drawer, and copy functionality
function ComponentCard({
  title,
  badge,
  description,
  children,
  codeSnippet,
  copiedId,
  onCopy,
  id,
  slug,
}: {
  title: string;
  badge: string;
  description: string;
  children: React.ReactNode;
  codeSnippet: string;
  copiedId: string | null;
  onCopy: (code: string, id: string) => void;
  id: string;
  slug?: string;
}) {
  const [showCode, setShowCode] = React.useState(false);
  const componentSlug =
    slug ||
    (id === "c-anim-number"
      ? "animated-number"
      : id === "c-image-comp"
      ? "image-comparison"
      : id === "c-trans-panel"
      ? "transition-panel"
      : id && id.startsWith("c-")
      ? id.replace(/^c-/, "")
      : "") ||
    title
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return (
    <Card className="flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <Link href={`/components/${componentSlug}`} className="hover:text-primary transition-colors">
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
          </Link>
          <Badge variant="secondary" className="text-[11px] font-mono font-normal">
            {badge}
          </Badge>
        </div>
        <CardDescription className="text-xs leading-relaxed">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Live Preview Area */}
        {children}

        {/* Code Snippet Drawer */}
        {showCode && (
          <div className="relative rounded-lg bg-zinc-950 p-3 text-[11px] font-mono text-zinc-100 overflow-x-auto">
            <pre>{codeSnippet}</pre>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCode((s) => !s)}
            className="inline-flex items-center gap-1 text-xs hover:text-foreground transition-colors font-medium cursor-pointer"
          >
            <Code2 className="size-3.5" />
            <span>{showCode ? "Hide Usage" : "How to use"}</span>
          </button>

          <Link
            href={`/components/${componentSlug}`}
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
          >
            <span>Sub-Route Demo</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs gap-1"
          onClick={() => onCopy(codeSnippet, id)}
        >
          {copiedId === id ? (
            <>
              <Check className="size-3 text-emerald-500" />
              <span className="text-emerald-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
