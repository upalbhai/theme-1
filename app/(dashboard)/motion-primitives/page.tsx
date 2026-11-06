"use client";

import * as React from "react";
import {
  Sparkles,
  Zap,
  MousePointer2,
  Sliders,
  Maximize2,
  RefreshCw,
  Copy,
  Check,
  Layers,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Core Motion Primitives
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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/core/accordion";
import { Dock, DockIcon, DockItem } from "@/components/core/dock";

export default function MotionPrimitivesPage() {
  // State for interactive morphing/scramble demos
  const [morphWord, setMorphWord] = React.useState("Next.js 16");
  const [triggerScramble, setTriggerScramble] = React.useState(false);
  const [counterVal, setCounterVal] = React.useState(128450);
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleMorph = () => {
    setMorphWord((prev) => (prev === "Next.js 16" ? "Motion Primitives" : prev === "Motion Primitives" ? "Tailwind CSS" : "Next.js 16"));
  };

  const randomizeCounter = () => {
    setCounterVal(Math.floor(10000 + Math.random() * 900000));
  };

  return (
    <div className="flex-1 space-y-8 p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-sm">
        <BorderTrail size={120} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="bg-gradient-to-r from-primary via-blue-400 to-indigo-500" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              <span>Motion Primitives by ibelick</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Motion Component Library
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              33 production-ready animated UI primitives powered by <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">motion</code> and Tailwind CSS.
              Fully integrated into Apex Theme with React 19 support.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open("https://github.com/ibelick/motion-primitives", "_blank")}
            >
              GitHub Repo
              <ArrowRight className="size-3.5" />
            </Button>
            <Button
              size="sm"
              className="gap-2"
              onClick={() => window.open("https://motion-primitives.com", "_blank")}
            >
              Docs & Recipes
            </Button>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto h-auto p-1 gap-1">
          <TabsTrigger value="text" className="gap-2 py-2.5">
            <Sparkles className="size-4" />
            <span>Text & Typography</span>
          </TabsTrigger>
          <TabsTrigger value="interactions" className="gap-2 py-2.5">
            <MousePointer2 className="size-4" />
            <span>Micro-Interactions</span>
          </TabsTrigger>
          <TabsTrigger value="numbers" className="gap-2 py-2.5">
            <TrendingUp className="size-4" />
            <span>Numbers & Stats</span>
          </TabsTrigger>
          <TabsTrigger value="layouts" className="gap-2 py-2.5">
            <Layers className="size-4" />
            <span>Layouts & Docks</span>
          </TabsTrigger>
        </TabsList>

        {/* 1. TEXT & TYPOGRAPHY */}
        <TabsContent value="text" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Text Effect */}
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Text Effect</CardTitle>
                  <Badge variant="secondary">TextEffect</Badge>
                </div>
                <CardDescription>Animate text entrance letter-by-letter or word-by-word with spring physics.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div className="min-h-[100px] flex items-center justify-center p-6 bg-muted/30 rounded-xl border border-dashed border-border/80">
                  <TextEffect per="word" as="h3" preset="blur" className="text-xl font-semibold text-center">
                    Empower your product with fluid, spring-based animations.
                  </TextEffect>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <span>Preset: blur | per: word</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => copySnippet(`<TextEffect per="word" preset="blur">Empower your product</TextEffect>`, "text-effect")}
                  >
                    {copiedCode === "text-effect" ? <Check className="size-3 text-emerald-500 mr-1" /> : <Copy className="size-3 mr-1" />}
                    Copy Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Text Shimmer & Shimmer Wave */}
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Text Shimmer & Wave</CardTitle>
                  <Badge variant="secondary">TextShimmer</Badge>
                </div>
                <CardDescription>High-end glossy shimmer highlights across headings and badges.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div className="min-h-[100px] flex flex-col items-center justify-center gap-3 p-6 bg-muted/30 rounded-xl border border-dashed border-border/80">
                  <TextShimmer className="text-xl font-bold tracking-tight">
                    ✦ High-Conversion Design System
                  </TextShimmer>
                  <TextShimmerWave className="text-sm font-medium text-muted-foreground">
                    Sweeping harmonic illumination gradient
                  </TextShimmerWave>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <span>Linear gradient mask shimmer</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => copySnippet(`<TextShimmer>High-Conversion Design System</TextShimmer>`, "text-shimmer")}
                  >
                    {copiedCode === "text-shimmer" ? <Check className="size-3 text-emerald-500 mr-1" /> : <Copy className="size-3 mr-1" />}
                    Copy Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Text Loop */}
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Text Loop</CardTitle>
                  <Badge variant="secondary">TextLoop</Badge>
                </div>
                <CardDescription>Smooth vertical carousel rotating through alternating phrases.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div className="min-h-[100px] flex items-center justify-center p-6 bg-muted/30 rounded-xl border border-dashed border-border/80 text-lg font-semibold">
                  <span className="mr-2">Designed for</span>
                  <TextLoop className="text-primary font-bold underline decoration-primary/40 underline-offset-4">
                    <span>Modern SaaS</span>
                    <span>Fintech Platforms</span>
                    <span>AI Dashboards</span>
                    <span>Enterprise CRMs</span>
                  </TextLoop>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <span>Cycles children seamlessly</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => copySnippet(`<TextLoop>\n  <span>Modern SaaS</span>\n  <span>Fintech Platforms</span>\n</TextLoop>`, "text-loop")}
                  >
                    {copiedCode === "text-loop" ? <Check className="size-3 text-emerald-500 mr-1" /> : <Copy className="size-3 mr-1" />}
                    Copy Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Text Morph & Scramble */}
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Text Morph & Scramble</CardTitle>
                  <Badge variant="secondary">Interactive</Badge>
                </div>
                <CardDescription>Shape morphing characters and matrix-style deciphering effects.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div className="min-h-[100px] flex flex-col items-center justify-center gap-4 p-6 bg-muted/30 rounded-xl border border-dashed border-border/80">
                  <div className="flex items-center gap-3">
                    <TextMorph className="text-2xl font-bold text-foreground">
                      {morphWord}
                    </TextMorph>
                    <Button size="icon" variant="outline" className="size-7" onClick={toggleMorph}>
                      <RefreshCw className="size-3.5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <TextScramble
                      key={String(triggerScramble)}
                      className="font-mono text-sm tracking-wider text-primary"
                    >
                      SECURE_TOKEN_AUTHENTICATED
                    </TextScramble>
                    <Button size="icon" variant="ghost" className="size-7" onClick={() => setTriggerScramble((p) => !p)}>
                      <RefreshCw className="size-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <span>Click refresh to test morph / scramble</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => copySnippet(`<TextMorph>{word}</TextMorph>`, "text-morph")}
                  >
                    {copiedCode === "text-morph" ? <Check className="size-3 text-emerald-500 mr-1" /> : <Copy className="size-3 mr-1" />}
                    Copy Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 2. MICRO-INTERACTIONS */}
        <TabsContent value="interactions" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Magnetic */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Magnetic Physics</CardTitle>
                  <Badge variant="secondary">Magnetic</Badge>
                </div>
                <CardDescription>Pulls target towards cursor with spring physics.</CardDescription>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center bg-muted/30 rounded-xl m-6 border border-dashed border-border/80">
                <Magnetic springOptions={{ bounce: 0.2 }}>
                  <Button className="rounded-full shadow-lg px-6 gap-2">
                    <MousePointer2 className="size-4" />
                    Hover Over Me
                  </Button>
                </Magnetic>
              </CardContent>
            </Card>

            {/* 3D Tilt */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">3D Parallax Tilt</CardTitle>
                  <Badge variant="secondary">Tilt</Badge>
                </div>
                <CardDescription>Dynamic 3D perspective rotation on mouse hover.</CardDescription>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center bg-muted/30 rounded-xl m-6 border border-dashed border-border/80">
                <Tilt rotationFactor={12} isReversed>
                  <div className="w-48 h-28 rounded-xl bg-gradient-to-tr from-primary to-blue-500 p-4 text-white flex flex-col justify-between shadow-md">
                    <span className="text-xs font-semibold uppercase tracking-wider opacity-80">Apex Card</span>
                    <span className="font-mono text-sm">•••• 4892</span>
                  </div>
                </Tilt>
              </CardContent>
            </Card>

            {/* Spotlight */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Spotlight Card</CardTitle>
                  <Badge variant="secondary">Spotlight</Badge>
                </div>
                <CardDescription>Smooth radial glow following mouse position.</CardDescription>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center bg-muted/30 rounded-xl m-6 border border-dashed border-border/80 p-0 overflow-hidden">
                <div className="relative w-full h-full p-6 flex flex-col justify-center items-center">
                  <Spotlight size={180} className="from-primary/25 via-primary/5 to-transparent blur-2xl" />
                  <span className="font-semibold text-sm">Move cursor here</span>
                  <span className="text-xs text-muted-foreground mt-1">Glow tracks your mouse</span>
                </div>
              </CardContent>
            </Card>

            {/* Glow Effect */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Ambient Glow Effect</CardTitle>
                  <Badge variant="secondary">GlowEffect</Badge>
                </div>
                <CardDescription>Rotating or pulsating atmospheric lighting.</CardDescription>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center bg-muted/30 rounded-xl m-6 border border-dashed border-border/80">
                <div className="relative">
                  <GlowEffect
                    colors={['#0066CC', '#34C759', '#AF52DE', '#FF9500']}
                    mode="rotate"
                    blur="soft"
                    duration={4}
                  />
                  <div className="relative px-6 py-3 rounded-lg bg-background border border-border shadow-sm text-sm font-semibold">
                    Glowing Button
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Border Trail */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Border Trail</CardTitle>
                  <Badge variant="secondary">BorderTrail</Badge>
                </div>
                <CardDescription>Continuous luminous tracer running along borders.</CardDescription>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center bg-muted/30 rounded-xl m-6 border border-dashed border-border/80">
                <div className="relative w-48 h-24 rounded-xl border border-border bg-card p-4 flex flex-col justify-center items-center shadow-sm overflow-hidden">
                  <BorderTrail size={80} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="bg-gradient-to-r from-primary via-emerald-400 to-primary" />
                  <span className="text-xs font-semibold">Border Beam</span>
                  <span className="text-[10px] text-muted-foreground">Endless Loop</span>
                </div>
              </CardContent>
            </Card>

            {/* Spinning Text Badge */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Spinning Text</CardTitle>
                  <Badge variant="secondary">SpinningText</Badge>
                </div>
                <CardDescription>Radial curved badge with infinite rotating text.</CardDescription>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center bg-muted/30 rounded-xl m-6 border border-dashed border-border/80">
                <div className="relative flex items-center justify-center">
                  <SpinningText radius={4.5} fontSize={0.75} duration={12} className="font-semibold uppercase tracking-widest text-primary">
                    ★ APEX CRM • MOTION PRIMITIVES •
                  </SpinningText>
                  <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Sparkles className="size-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 3. NUMBERS & STATS */}
        <TabsContent value="numbers" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Animated Number */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Animated Number</CardTitle>
                  <Badge variant="secondary">AnimatedNumber</Badge>
                </div>
                <CardDescription>Interpolates between numbers using spring physics with locale commas.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-36 flex flex-col items-center justify-center p-6 bg-muted/30 rounded-xl border border-dashed border-border/80">
                  <div className="text-4xl md:text-5xl font-bold tracking-tight text-foreground flex items-center">
                    <span>$</span>
                    <AnimatedNumber value={counterVal} />
                  </div>
                  <span className="text-xs text-muted-foreground mt-2">Active ARR metrics</span>
                </div>
                <div className="flex items-center justify-between">
                  <Button size="sm" variant="outline" onClick={randomizeCounter} className="gap-2">
                    <RefreshCw className="size-3.5" />
                    Randomize Value
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => copySnippet(`<AnimatedNumber value={128450} />`, "anim-num")}
                  >
                    {copiedCode === "anim-num" ? <Check className="size-3 text-emerald-500 mr-1" /> : <Copy className="size-3 mr-1" />}
                    Copy Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sliding Number */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Sliding Ticker Number</CardTitle>
                  <Badge variant="secondary">SlidingNumber</Badge>
                </div>
                <CardDescription>Mechanical slot-machine tumbler roll per digit.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-36 flex flex-col items-center justify-center p-6 bg-muted/30 rounded-xl border border-dashed border-border/80">
                  <div className="text-4xl md:text-5xl font-bold tracking-tight text-foreground flex items-center font-mono">
                    <SlidingNumber value={counterVal} />
                  </div>
                  <span className="text-xs text-muted-foreground mt-2">Individual digit tumbler</span>
                </div>
                <div className="flex items-center justify-between">
                  <Button size="sm" variant="outline" onClick={randomizeCounter} className="gap-2">
                    <RefreshCw className="size-3.5" />
                    Randomize Value
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => copySnippet(`<SlidingNumber value={counterVal} />`, "slide-num")}
                  >
                    {copiedCode === "slide-num" ? <Check className="size-3 text-emerald-500 mr-1" /> : <Copy className="size-3 mr-1" />}
                    Copy Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 4. LAYOUTS & DOCKS */}
        <TabsContent value="layouts" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Interactive Dock */}
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">macOS Interactive Dock</CardTitle>
                  <Badge variant="secondary">Dock</Badge>
                </div>
                <CardDescription>Hover over items for smooth magnification scaling.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center items-center min-h-[160px] bg-muted/30 rounded-xl m-6 border border-dashed border-border/80">
                <Dock className="p-2 border border-border/60 bg-background/80 backdrop-blur-md rounded-2xl shadow-lg">
                  <DockItem>
                    <DockIcon>
                      <div className="size-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                        <DollarSign className="size-5" />
                      </div>
                    </DockIcon>
                  </DockItem>
                  <DockItem>
                    <DockIcon>
                      <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <Users className="size-5" />
                      </div>
                    </DockIcon>
                  </DockItem>
                  <DockItem>
                    <DockIcon>
                      <div className="size-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                        <Sparkles className="size-5" />
                      </div>
                    </DockIcon>
                  </DockItem>
                  <DockItem>
                    <DockIcon>
                      <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                        <Zap className="size-5" />
                      </div>
                    </DockIcon>
                  </DockItem>
                </Dock>
              </CardContent>
            </Card>

            {/* Infinite Slider */}
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Infinite Logo / Card Marquee</CardTitle>
                  <Badge variant="secondary">InfiniteSlider</Badge>
                </div>
                <CardDescription>Continuous infinite scrolling marquee loop.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center items-center min-h-[160px] bg-muted/30 rounded-xl m-6 border border-dashed border-border/80 p-4 overflow-hidden">
                <InfiniteSlider speed={40} gap={24}>
                  {["Next.js", "Tailwind CSS", "Motion", "Redux", "TanStack", "Radix UI"].map((tech) => (
                    <div key={tech} className="px-4 py-2 rounded-lg bg-card border border-border shadow-xs text-xs font-semibold whitespace-nowrap">
                      {tech}
                    </div>
                  ))}
                </InfiniteSlider>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
