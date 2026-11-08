export type ComponentCategory =
  | "Typography"
  | "Numbers"
  | "Micro-Interactions"
  | "Surfaces & Layouts"
  | "Overlays & Disclosures"
  | "UI Primitives";

export type ComponentProp = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

export type ComponentItem = {
  slug: string;
  title: string;
  category: ComponentCategory;
  categorySlug: string;
  badge: "motion/core" | "shadcn/ui";
  description: string;
  howItWorks: string;
  importStatement: string;
  codeUsage: string;
  features: string[];
  props: ComponentProp[];
};

export const COMPONENTS_REGISTRY: ComponentItem[] = [
  // 1. TYPOGRAPHY
  {
    slug: "text-effect",
    title: "Text Effect",
    category: "Typography",
    categorySlug: "typography",
    badge: "motion/core",
    description: "Animate text with staggering per-word, per-character, or per-line using customizable motion presets.",
    howItWorks: "TextEffect splits strings into individual words, characters, or lines using React fragment tokens. Each token is wrapped in a Motion component configured with spring and tween variants. When triggered, a staggered transition cascades through the token array, producing smooth cinematic reveals.",
    importStatement: `import { TextEffect } from "@/components/core/text-effect";`,
    codeUsage: `<TextEffect
  per="word"
  preset="fade-in-blur"
  as="h1"
  className="text-3xl font-bold tracking-tight"
>
  High-converting CRM & Customer Portal
</TextEffect>`,
    features: [
      "Stagger per word, character, or line",
      "Built-in presets: fade, fade-in-blur, slide, scale",
      "Full control over spring and duration timing",
      "Supports semantic HTML tags (h1, p, span, div)",
      "Accessible screen-reader text preservation",
    ],
    props: [
      { name: "children", type: "string", description: "The text content to animate." },
      { name: "per", type: "'word' | 'char' | 'line'", default: "'word'", description: "Granularity of text tokenization." },
      { name: "as", type: "keyof JSX.IntrinsicElements", default: "'p'", description: "Semantic wrapper element." },
      { name: "preset", type: "'fade' | 'slide' | 'scale' | 'fade-in-blur'", default: "'fade'", description: "Pre-configured entrance animation preset." },
      { name: "delay", type: "number", default: "0", description: "Initial delay before cascade begins (in seconds)." },
      { name: "className", type: "string", description: "Optional CSS classes applied to container." },
    ],
  },
  {
    slug: "text-shimmer",
    title: "Text Shimmer",
    category: "Typography",
    categorySlug: "typography",
    badge: "motion/core",
    description: "Ambient, continuous gradient light sweep across text elements for badges and highlights.",
    howItWorks: "TextShimmer creates a dynamic background linear-gradient with background-clip: text. Framer motion continuously interpolates the background-position coordinate across a looping keyframe curve, creating a radiant reflection effect.",
    importStatement: `import { TextShimmer } from "@/components/core/text-shimmer";`,
    codeUsage: `<TextShimmer
  as="span"
  duration={2.5}
  spread={2}
  className="text-sm font-semibold tracking-wide"
>
  ✦ Powered by Next.js 16 & Motion v14
</TextShimmer>`,
    features: [
      "Smooth CSS background-clip keyframe shimmer",
      "Configurable duration, sweep spread, and color intensity",
      "Adapts seamlessly to dark and light mode palette tokens",
      "Zero layout shift, lightweight DOM footprint",
    ],
    props: [
      { name: "children", type: "string", description: "Text content to shimmer." },
      { name: "as", type: "keyof JSX.IntrinsicElements", default: "'p'", description: "Rendered HTML element." },
      { name: "duration", type: "number", default: "2", description: "Loop period in seconds." },
      { name: "spread", type: "number", default: "2", description: "Gradient highlight width multiplier." },
      { name: "className", type: "string", description: "Tailwind classes for font size, weight, and base color." },
    ],
  },
  {
    slug: "text-loop",
    title: "Text Loop",
    category: "Typography",
    categorySlug: "typography",
    badge: "motion/core",
    description: "Seamless vertical ticker cycling smoothly through rotating words or phrases.",
    howItWorks: "Utilizes AnimatePresence in mode='popLayout'. A state interval increments the active word index, triggering an exit transition for the previous phrase while the incoming phrase slides in using spring physics.",
    importStatement: `import { TextLoop } from "@/components/core/text-loop";`,
    codeUsage: `<span className="inline-flex items-center gap-1.5 font-bold">
  Build
  <TextLoop interval={3} className="text-primary font-mono">
    <span>SaaS Dashboards</span>
    <span>CRM Pipelines</span>
    <span>Analytics Apps</span>
  </TextLoop>
</span>`,
    features: [
      "Vertical sliding transitions with spring damping",
      "Customizable interval duration",
      "Preserves surrounding inline text flow",
      "Zero layout jump with popLayout AnimatePresence mode",
    ],
    props: [
      { name: "children", type: "React.ReactNode[]", description: "List of items to rotate through." },
      { name: "interval", type: "number", default: "2", description: "Time spent on each item in seconds." },
      { name: "transition", type: "Transition", description: "Custom spring or tween transition config." },
      { name: "className", type: "string", description: "CSS styling for the rotating viewport." },
    ],
  },
  {
    slug: "text-morph",
    title: "Text Morph",
    category: "Typography",
    categorySlug: "typography",
    badge: "motion/core",
    description: "Fluid character morphing and glyph transformations between dynamic text states.",
    howItWorks: "TextMorph parses matching characters between previous and next strings using unique layout IDs. Characters that persist morph smoothly across coordinates, while distinct characters fade and scale in with spring timing.",
    importStatement: `import { TextMorph } from "@/components/core/text-morph";`,
    codeUsage: `<TextMorph className="text-2xl font-mono font-bold text-primary">
  {currentWord}
</TextMorph>`,
    features: [
      "Character-level layoutId morphing transitions",
      "Ideal for state transitions, status badges, and dynamic counters",
      "Native font kerning and layout tracking",
    ],
    props: [
      { name: "children", type: "string", description: "Text content to morph." },
      { name: "as", type: "keyof JSX.IntrinsicElements", default: "'p'", description: "Root HTML tag." },
      { name: "className", type: "string", description: "Typography classes." },
    ],
  },
  {
    slug: "text-scramble",
    title: "Text Scramble",
    category: "Typography",
    categorySlug: "typography",
    badge: "motion/core",
    description: "Cyberpunk/terminal style character decryption scrambling effect.",
    howItWorks: "Randomly cycles characters from a cipher set (alphanumeric, symbols) at high frequency while progressively resolving characters to their final target glyph from left to right.",
    importStatement: `import { TextScramble } from "@/components/core/text-scramble";`,
    codeUsage: `<TextScramble
  as="span"
  duration={1.2}
  characterSet="01ABCDEF!@#$%"
  className="font-mono text-lg font-bold text-emerald-600"
>
  ENCRYPTED_PIPELINE_OK
</TextScramble>`,
    features: [
      "Customizable character sets (matrix, hex, alphabet, symbols)",
      "Configurable scramble speed and total duration",
      "Triggerable on hover, click, or viewport entry",
    ],
    props: [
      { name: "children", type: "string", description: "Final target text." },
      { name: "duration", type: "number", default: "0.8", description: "Duration in seconds." },
      { name: "speed", type: "number", default: "0.04", description: "Step interval per glyph." },
      { name: "characterSet", type: "string", description: "Characters used during scramble phase." },
      { name: "trigger", type: "boolean", default: "true", description: "Trigger scrambling when state changes." },
    ],
  },
  {
    slug: "text-roll",
    title: "Text Roll",
    category: "Typography",
    categorySlug: "typography",
    badge: "motion/core",
    description: "Slot-machine style 3D rolling typography animation.",
    howItWorks: "Duplicates each character into an inner two-row cylinder. When triggered or hovered, the container rotates vertically by -100% on the Y axis with staggered character delays.",
    importStatement: `import { TextRoll } from "@/components/core/text-roll";`,
    codeUsage: `<TextRoll className="text-xl font-bold tracking-tight hover:text-primary">
  Apex Enterprise Design System
</TextRoll>`,
    features: [
      "Hover or auto-animated rolling slot effect",
      "Staggered cascade across character array",
      "Dual-layer vertical perspective rotation",
    ],
    props: [
      { name: "children", type: "string", description: "Text content." },
      { name: "duration", type: "number", default: "0.5", description: "Animation duration per character." },
      { name: "className", type: "string", description: "CSS styling." },
    ],
  },
  {
    slug: "spinning-text",
    title: "Spinning Text",
    category: "Typography",
    categorySlug: "typography",
    badge: "motion/core",
    description: "Circular rotating typography badge rendered along a geometric circular path.",
    howItWorks: "Calculates angular offsets for each character around a 360-degree circle radius, applying continuous rotation keyframes via Framer Motion.",
    importStatement: `import { SpinningText } from "@/components/core/spinning-text";`,
    codeUsage: `<SpinningText
  radius={5}
  fontSize={0.85}
  duration={12}
  className="font-mono uppercase font-bold text-primary"
>
  • NEXT.JS 16 • MOTION PRIMITIVES • REACT 19 •
</SpinningText>`,
    features: [
      "Circular text orientation with custom radius",
      "Configurable spin speed and direction",
      "Center-hole slot for avatar, logo, or icon embedding",
    ],
    props: [
      { name: "children", type: "string", description: "Text to wrap circularly." },
      { name: "radius", type: "number", default: "5", description: "Radius in rem units." },
      { name: "duration", type: "number", default: "10", description: "Rotation period in seconds." },
      { name: "reverse", type: "boolean", default: "false", description: "Spin counter-clockwise." },
    ],
  },
  {
    slug: "text-shimmer-wave",
    title: "Text Shimmer Wave",
    category: "Typography",
    categorySlug: "typography",
    badge: "motion/core",
    description: "Wave-propagating luminance shimmer rippling through sentences.",
    howItWorks: "Deconstructs characters and orchestrates a traveling sinusoidal luminance wave using motion values and staggered delays.",
    importStatement: `import { TextShimmerWave } from "@/components/core/text-shimmer-wave";`,
    codeUsage: `<TextShimmerWave
  duration={1.5}
  spread={1.5}
  className="text-lg font-semibold text-foreground"
>
  Realtime CRM Synchronization Active
</TextShimmerWave>`,
    features: [
      "Sinusoidal luminance ripple",
      "Staggered character propagation",
      "Smooth infinite loop",
    ],
    props: [
      { name: "children", type: "string", description: "Text content." },
      { name: "duration", type: "number", default: "1", description: "Wave cycle length in seconds." },
      { name: "spread", type: "number", default: "1", description: "Luminance dispersion factor." },
    ],
  },

  // 2. NUMBERS
  {
    slug: "animated-number",
    title: "Animated Number",
    category: "Numbers",
    categorySlug: "numbers",
    badge: "motion/core",
    description: "Smooth spring-physics rolling numeric counter for financial KPIs, stats, and metrics.",
    howItWorks: "Uses motion's useSpring and useMotionValue to smoothly interpolate numeric values across frame updates. An onChange listener updates a local formatted string state so numbers roll naturally with realistic deceleration.",
    importStatement: `import { AnimatedNumber } from "@/components/core/animated-number";`,
    codeUsage: `<div className="text-3xl font-bold font-mono tracking-tight">
  $<AnimatedNumber value={128450} springOptions={{ stiffness: 60, damping: 15 }} />
</div>`,
    features: [
      "Spring physics with zero stutter or linear stiffness",
      "Custom decimal places and number formatting",
      "Lightweight, no heavy charting dependencies",
      "Instant responsiveness when value state updates",
    ],
    props: [
      { name: "value", type: "number", description: "Target number to animate towards." },
      { name: "springOptions", type: "SpringOptions", description: "Stiffness, damping, and mass options." },
      { name: "className", type: "string", description: "Typography styles." },
    ],
  },
  {
    slug: "sliding-number",
    title: "Sliding Number",
    category: "Numbers",
    categorySlug: "numbers",
    badge: "motion/core",
    description: "Vertical odometer-style sliding column digits for high-precision live metrics.",
    howItWorks: "Decomposes the number into an array of individual digits. Each column houses digits 0-9 inside a vertical flex container shifted via translateY based on the current digit index.",
    importStatement: `import { SlidingNumber } from "@/components/core/sliding-number";`,
    codeUsage: `<SlidingNumber
  value={4892}
  padStart={true}
  className="font-mono text-2xl font-bold text-primary"
/>`,
    features: [
      "Independent column animation per decimal place",
      "Zero layout shift with monospaced digit columns",
      "Supports leading zero padding",
    ],
    props: [
      { name: "value", type: "number", description: "Target number." },
      { name: "padStart", type: "boolean", default: "false", description: "Pad with leading zeros." },
      { name: "className", type: "string", description: "CSS class names." },
    ],
  },

  // 3. MICRO-INTERACTIONS & CARDS
  {
    slug: "magnetic",
    title: "Magnetic",
    category: "Micro-Interactions",
    categorySlug: "interactions",
    badge: "motion/core",
    description: "Physics-based magnetic pull cursor interaction for high-impact buttons and badges.",
    howItWorks: "Measures container coordinates via bounding box on mouse move. Computes delta offsets between cursor and element center, applying a fraction of the offset to the child using spring physics. Snaps back to zero on mouse leave.",
    importStatement: `import { Magnetic } from "@/components/core/magnetic";`,
    codeUsage: `<Magnetic intensity={0.3} range={80}>
  <Button size="lg" className="rounded-xl shadow-lg">
    Launch Experience
  </Button>
</Magnetic>`,
    features: [
      "Customizable pull intensity and trigger proximity range",
      "Gentle spring recovery on mouse leave",
      "Works with buttons, badges, avatars, and icons",
    ],
    props: [
      { name: "children", type: "React.ReactElement", description: "Child element to magnetize." },
      { name: "intensity", type: "number", default: "0.2", description: "Pull multiplier factor (0 to 1)." },
      { name: "range", type: "number", default: "100", description: "Active activation radius in pixels." },
      { name: "springOptions", type: "SpringOptions", description: "Spring transition config." },
    ],
  },
  {
    slug: "tilt",
    title: "Tilt",
    category: "Micro-Interactions",
    categorySlug: "interactions",
    badge: "motion/core",
    description: "Interactive 3D parallax gyroscope tilt effect on hover for cards and surfaces.",
    howItWorks: "Tracks normalized mouse coordinates relative to container dimensions (-0.5 to 0.5). Drives rotateX and rotateY motion values transformed with 3D perspective to produce realistic spatial tilt.",
    importStatement: `import { Tilt } from "@/components/core/tilt";`,
    codeUsage: `<Tilt rotationFactor={12} isReversed={false} className="rounded-2xl">
  <Card className="p-6 bg-card/80 backdrop-blur-md shadow-xl border">
    <h3 className="font-bold text-lg">3D Interactive Card</h3>
    <p className="text-muted-foreground text-sm">Hover over me to feel spatial depth.</p>
  </Card>
</Tilt>`,
    features: [
      "Hardware-accelerated CSS 3D transform perspective",
      "Adjustable rotation angle limits and reversal",
      "Glides back smoothly to resting plane on leave",
    ],
    props: [
      { name: "children", type: "React.ReactNode", description: "Card content." },
      { name: "rotationFactor", type: "number", default: "15", description: "Maximum tilt rotation in degrees." },
      { name: "isReversed", type: "boolean", default: "false", description: "Invert tilt direction." },
      { name: "springOptions", type: "SpringOptions", description: "Spring parameters." },
    ],
  },
  {
    slug: "spotlight",
    title: "Spotlight",
    category: "Micro-Interactions",
    categorySlug: "interactions",
    badge: "motion/core",
    description: "Dynamic radial spotlight beam following mouse cursor across container surfaces.",
    howItWorks: "Attaches pointer listeners to parent bounds, updating X and Y motion values used inside a CSS radial-gradient overlay mask. Creates a flashlight or studio lighting effect across dark surfaces.",
    importStatement: `import { Spotlight } from "@/components/core/spotlight";`,
    codeUsage: `<div className="relative overflow-hidden rounded-2xl border bg-zinc-950 p-8">
  <Spotlight
    size={300}
    springOptions={{ stiffness: 60, damping: 15 }}
    fill="rgba(59, 130, 246, 0.15)"
  />
  <h3 className="text-xl font-bold text-white">Enterprise Dark Surface</h3>
</div>`,
    features: [
      "Configurable spotlight radius and color fill",
      "Smooth spring dampening for fluid cursor trailing",
      "High performance using CSS custom properties",
    ],
    props: [
      { name: "size", type: "number", default: "200", description: "Radius of light circle in px." },
      { name: "fill", type: "string", default: "'rgba(255, 255, 255, 0.1)'", description: "Spotlight gradient color." },
      { name: "springOptions", type: "SpringOptions", description: "Spring smoothing parameters." },
    ],
  },
  {
    slug: "border-trail",
    title: "Border Trail",
    category: "Micro-Interactions",
    categorySlug: "interactions",
    badge: "motion/core",
    description: "Glowing neon border trail tracing continuously around container perimeters.",
    howItWorks: "Uses CSS offset-path to trace a high-intensity radial gradient beam along the border perimeter of a container using linear motion progression.",
    importStatement: `import { BorderTrail } from "@/components/core/border-trail";`,
    codeUsage: `<div className="relative rounded-2xl p-6 bg-card border overflow-hidden">
  <BorderTrail
    size={80}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"
  />
  <h4 className="font-semibold">Featured Pipeline</h4>
</div>`,
    features: [
      "Runs smoothly around any rectangular or rounded geometry",
      "Customizable trail length (size) and gradient colors",
      "Hardware-accelerated CSS offset-path execution",
    ],
    props: [
      { name: "size", type: "number", default: "60", description: "Length of the glowing trail in pixels." },
      { name: "transition", type: "Transition", description: "Motion transition defining speed and easing." },
      { name: "className", type: "string", description: "Gradient colors for the trail." },
    ],
  },
  {
    slug: "glow-effect",
    title: "Glow Effect",
    category: "Micro-Interactions",
    categorySlug: "interactions",
    badge: "motion/core",
    description: "Ambient, pulsing blur glow backlight for buttons, active cards, and hero elements.",
    howItWorks: "Renders a background blur layer using multi-stop radial gradient discs animated in scale and opacity, creating an organic pulsating aura.",
    importStatement: `import { GlowEffect } from "@/components/core/glow-effect";`,
    codeUsage: `<div className="relative rounded-xl p-1">
  <GlowEffect
    colors={["#3b82f6", "#8b5cf6", "#ec4899"]}
    mode="breathe"
    blur="soft"
    duration={3}
  />
  <Button className="relative z-10 w-full">Upgrade to Pro</Button>
</div>`,
    features: [
      "Breathe, rotate, and pulse animation modes",
      "Custom multi-color gradient array",
      "Soft and high-blur intensity settings",
    ],
    props: [
      { name: "colors", type: "string[]", description: "Array of hex or rgb color stops." },
      { name: "mode", type: "'rotate' | 'pulse' | 'breathe' | 'colorCycle'", default: "'breathe'", description: "Glow animation style." },
      { name: "duration", type: "number", default: "3", description: "Animation cycle duration." },
      { name: "blur", type: "'soft' | 'medium' | 'strong'", default: "'medium'", description: "Gaussian blur intensity." },
    ],
  },
  {
    slug: "cursor",
    title: "Cursor",
    category: "Micro-Interactions",
    categorySlug: "interactions",
    badge: "motion/core",
    description: "Custom animated cursor element with fluid spring lag and hover reactivity.",
    howItWorks: "Hides default cursor on target surface. Injects a spring-smoothed follower element updated on mousemove with customizable spring physics and expand-on-hover states.",
    importStatement: `import { Cursor } from "@/components/core/cursor";`,
    codeUsage: `<div className="relative h-64 w-full rounded-2xl bg-zinc-900 overflow-hidden flex items-center justify-center">
  <Cursor
    attachToParent={true}
    springConfig={{ stiffness: 120, damping: 20 }}
  >
    <div className="size-5 rounded-full bg-primary/80 backdrop-blur-xs ring-4 ring-primary/20" />
  </Cursor>
  <p className="text-zinc-400 font-medium">Hover over this canvas</p>
</div>`,
    features: [
      "Can attach globally to window or confine to parent container",
      "Spring smoothing removes jitter",
      "Customizable cursor avatars, badges, or tooltip labels",
    ],
    props: [
      { name: "children", type: "React.ReactNode", description: "Cursor visual element." },
      { name: "attachToParent", type: "boolean", default: "false", description: "Confine cursor within parent bounds." },
      { name: "springConfig", type: "SpringOptions", description: "Spring stiffness and damping." },
    ],
  },
  {
    slug: "in-view",
    title: "InView",
    category: "Micro-Interactions",
    categorySlug: "interactions",
    badge: "motion/core",
    description: "Trigger animations with precision viewport intersection detection and once/repeat modes.",
    howItWorks: "Uses motion's useInView hook on an attached element ref. When the element enters the viewport with configurable thresholds, animates from hidden to visible variant states.",
    importStatement: `import { InView } from "@/components/core/in-view";`,
    codeUsage: `<InView
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  viewOptions={{ margin: "0px 0px -100px 0px" }}
>
  <Card className="p-6">Animated on viewport entrance</Card>
</InView>`,
    features: [
      "Scroll-triggered entrance animations",
      "Configurable viewport margin offsets and thresholds",
      "Supports once: true or continuous entrance/exit",
    ],
    props: [
      { name: "children", type: "ReactNode", description: "Elements to animate when in viewport." },
      { name: "variants", type: "{ hidden: Variant; visible: Variant }", description: "Motion variants." },
      { name: "transition", type: "Transition", description: "Transition config." },
      { name: "once", type: "boolean", default: "false", description: "Animate only once on first scroll enter." },
    ],
  },

  // 4. SURFACES & LAYOUTS
  {
    slug: "dock",
    title: "Dock",
    category: "Surfaces & Layouts",
    categorySlug: "surfaces",
    badge: "motion/core",
    description: "macOS-inspired interactive magnification dock with realistic spring physics.",
    howItWorks: "Computes proximity distance from mouse X coordinate to each DockItem center. Feeds distance into useTransform and useSpring to scale nearby items smoothly, replicating the iconic macOS dock.",
    importStatement: `import { Dock, DockItem, DockIcon, DockLabel } from "@/components/core/dock";`,
    codeUsage: `<Dock className="p-2 border bg-background/80 backdrop-blur-md rounded-2xl shadow-lg">
  <DockItem>
    <DockIcon><Home className="size-5" /></DockIcon>
    <DockLabel>Home</DockLabel>
  </DockItem>
  <DockItem>
    <DockIcon><Users className="size-5" /></DockIcon>
    <DockLabel>Customers</DockLabel>
  </DockItem>
  <DockItem>
    <DockIcon><Settings className="size-5" /></DockIcon>
    <DockLabel>Settings</DockLabel>
  </DockItem>
</Dock>`,
    features: [
      "Smooth proximity magnification curve",
      "Hover tooltips with DockLabel",
      "Resilient SSR fallback values",
      "Customizable magnification factor and distance radius",
    ],
    props: [
      { name: "magnification", type: "number", default: "80", description: "Max scaled icon size on hover in px." },
      { name: "distance", type: "number", default: "150", description: "Proximity range influencing magnification." },
      { name: "panelHeight", type: "number", default: "64", description: "Default dock baseline height." },
      { name: "spring", type: "SpringOptions", description: "Spring dynamics for scaling." },
    ],
  },
  {
    slug: "infinite-slider",
    title: "Infinite Slider",
    category: "Surfaces & Layouts",
    categorySlug: "surfaces",
    badge: "motion/core",
    description: "Continuous looping ticker marquee for partner logos, tech stacks, and badges.",
    howItWorks: "Clones children into duplicated tracks animated continuously along the X axis by -50%. On completion, loop wraps seamlessly without any visible seam or jitter.",
    importStatement: `import { InfiniteSlider } from "@/components/core/infinite-slider";`,
    codeUsage: `<InfiniteSlider duration={20} gap={24} reverse={false}>
  <div className="h-10 px-4 rounded-lg bg-muted flex items-center font-semibold">Stripe</div>
  <div className="h-10 px-4 rounded-lg bg-muted flex items-center font-semibold">HubSpot</div>
  <div className="h-10 px-4 rounded-lg bg-muted flex items-center font-semibold">Salesforce</div>
  <div className="h-10 px-4 rounded-lg bg-muted flex items-center font-semibold">Next.js</div>
</InfiniteSlider>`,
    features: [
      "Pure linear continuous loop",
      "Configurable scroll speed, direction, and gap",
      "Pause on hover support",
    ],
    props: [
      { name: "children", type: "React.ReactNode", description: "Items to scroll." },
      { name: "duration", type: "number", default: "25", description: "Time to complete one loop in seconds." },
      { name: "gap", type: "number", default: "24", description: "Spacing between elements in px." },
      { name: "reverse", type: "boolean", default: "false", description: "Scroll from left to right." },
    ],
  },
  {
    slug: "image-comparison",
    title: "Image Comparison",
    category: "Surfaces & Layouts",
    categorySlug: "surfaces",
    badge: "motion/core",
    description: "Interactive split-screen before and after comparison slider with draggable handle.",
    howItWorks: "Stacks two images inside a shared container. The top image is clipped using CSS clip-path or absolute width driven by drag gestures on a vertical divider handle.",
    importStatement: `import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "@/components/core/image-comparison";`,
    codeUsage: `<ImageComparison className="aspect-video w-full rounded-2xl border overflow-hidden">
  <ImageComparisonImage
    src="/images/before.jpg"
    alt="Before"
    position="left"
  />
  <ImageComparisonImage
    src="/images/after.jpg"
    alt="After"
    position="right"
  />
  <ImageComparisonSlider />
</ImageComparison>`,
    features: [
      "Touch and drag slider handle",
      "Interactive comparison line with chevron icons",
      "Keyboard arrow navigation support",
    ],
    props: [
      { name: "defaultValue", type: "number", default: "50", description: "Starting position percentage." },
      { name: "enableHover", type: "boolean", default: "false", description: "Track cursor hover without dragging." },
      { name: "className", type: "string", description: "Container classes." },
    ],
  },
  {
    slug: "animated-group",
    title: "Animated Group",
    category: "Surfaces & Layouts",
    categorySlug: "surfaces",
    badge: "motion/core",
    description: "Staggered entrance orchestration for lists, cards, and grid items.",
    howItWorks: "Applies parent-child variant propagation with staggerChildren. Children automatically inherit staggered entry timing without manual index calculation.",
    importStatement: `import { AnimatedGroup } from "@/components/core/animated-group";`,
    codeUsage: `<AnimatedGroup
  preset="scale"
  className="grid grid-cols-1 md:grid-cols-3 gap-4"
>
  <Card className="p-4">Card 1</Card>
  <Card className="p-4">Card 2</Card>
  <Card className="p-4">Card 3</Card>
</AnimatedGroup>`,
    features: [
      "Built-in presets: fade, slide, scale, blur, blur-slide",
      "Customizable stagger timing and initial delays",
      "Works with any list, grid, or flex child elements",
    ],
    props: [
      { name: "children", type: "React.ReactNode", description: "Items to stagger." },
      { name: "preset", type: "'fade' | 'slide' | 'scale' | 'blur' | 'blur-slide'", default: "'fade'", description: "Staggered animation preset." },
      { name: "className", type: "string", description: "Layout container classes." },
    ],
  },
  {
    slug: "animated-background",
    title: "Animated Background",
    category: "Surfaces & Layouts",
    categorySlug: "surfaces",
    badge: "motion/core",
    description: "Sliding pill highlight that tracks active tabs, links, or navigation items.",
    howItWorks: "Uses Framer Motion layoutId on a shared background highlight pill. As active tab focus or hover shifts, the pill morphs and slides between targets with spring physics.",
    importStatement: `import { AnimatedBackground } from "@/components/core/animated-background";`,
    codeUsage: `<AnimatedBackground
  defaultValue="overview"
  className="rounded-lg bg-primary/10"
  transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
>
  {["overview", "analytics", "reports"].map((tab) => (
    <button key={tab} data-id={tab} className="px-4 py-2 text-sm font-medium">
      {tab}
    </button>
  ))}
</AnimatedBackground>`,
    features: [
      "Smooth layoutId spring interpolation",
      "Zero DOM overhead, single shared background indicator",
      "Supports click and hover tracking modes",
    ],
    props: [
      { name: "children", type: "React.ReactNode", description: "Buttons or links with data-id attributes." },
      { name: "defaultValue", type: "string", description: "Initial active data-id." },
      { name: "className", type: "string", description: "Styling for the moving pill indicator." },
    ],
  },
  {
    slug: "transition-panel",
    title: "Transition Panel",
    category: "Surfaces & Layouts",
    categorySlug: "surfaces",
    badge: "motion/core",
    description: "Smooth height-animated stepper tabs for multi-step wizards and views.",
    howItWorks: "Wraps view transitions in an auto-resizing motion container. As active index changes, the container height animates smoothly to match the new panel's intrinsic height.",
    importStatement: `import { TransitionPanel } from "@/components/core/transition-panel";`,
    codeUsage: `<TransitionPanel
  activeIndex={currentStep}
  transition={{ duration: 0.35, ease: "easeInOut" }}
>
  <div>Step 1: Account Setup</div>
  <div>Step 2: Team Members</div>
  <div>Step 3: Billing</div>
</TransitionPanel>`,
    features: [
      "Eliminates abrupt layout height jumps between steps",
      "Smooth directional sliding entrance and exit",
      "Perfect for onboarding wizards, checkouts, and tabs",
    ],
    props: [
      { name: "activeIndex", type: "number", description: "Index of currently active panel." },
      { name: "children", type: "React.ReactNode[]", description: "Panels to transition between." },
      { name: "transition", type: "Transition", description: "Motion transition config." },
    ],
  },
  {
    slug: "scroll-progress",
    title: "Scroll Progress",
    category: "Surfaces & Layouts",
    categorySlug: "surfaces",
    badge: "motion/core",
    description: "Real-time scroll position indicator bar with spring smoothing.",
    howItWorks: "Hooks into motion's useScroll to measure target container or window scroll progress (0 to 1). Transforms progress into scaleX on a fixed accent bar using useSpring.",
    importStatement: `import { ScrollProgress } from "@/components/core/scroll-progress";`,
    codeUsage: `<ScrollProgress
  className="top-0 h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 z-50"
  springOptions={{ stiffness: 280, damping: 30 }}
/>`,
    features: [
      "Smooth spring dampening",
      "Tracks entire window or specific container element",
      "Zero layout impact, GPU-accelerated transform scaleX",
    ],
    props: [
      { name: "className", type: "string", description: "Color and positioning classes." },
      { name: "springOptions", type: "SpringOptions", description: "Spring dynamics config." },
    ],
  },
  {
    slug: "progressive-blur",
    title: "Progressive Blur",
    category: "Surfaces & Layouts",
    categorySlug: "surfaces",
    badge: "motion/core",
    description: "Multi-stop gradient frosted glass blur transition for overlays and hero imagery.",
    howItWorks: "Renders stacked linear-gradient layers with calculated alpha stops and backdrop blur filters to produce an ultra-smooth, continuous frosted glass depth gradient.",
    importStatement: `import { ProgressiveBlur } from "@/components/core/progressive-blur";`,
    codeUsage: `<div className="relative h-64 w-full rounded-2xl overflow-hidden">
  <img src="/photo.jpg" alt="Scene" className="size-full object-cover" />
  <ProgressiveBlur
    direction="bottom"
    blurLayers={8}
    blurIntensity={0.25}
    className="absolute inset-x-0 bottom-0 h-32"
  />
</div>`,
    features: [
      "Natural frosted depth without harsh line edges",
      "Configurable blur intensity and gradient direction (top, bottom, left, right)",
      "Zero JavaScript animation overhead, pure CSS filter layers",
    ],
    props: [
      { name: "direction", type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: "Direction of blur progression." },
      { name: "blurLayers", type: "number", default: "8", description: "Number of layered gradient stops." },
      { name: "blurIntensity", type: "number", default: "0.25", description: "Blur strength coefficient." },
    ],
  },
  {
    slug: "carousel",
    title: "Carousel (Motion)",
    category: "Surfaces & Layouts",
    categorySlug: "surfaces",
    badge: "motion/core",
    description: "Fluid gesture-driven carousel with spring inertia release and pagination.",
    howItWorks: "Combines touch and pointer drag gestures with Framer Motion spring physics. Calculates current index from drag release delta and animates to the snapped item.",
    importStatement: `import { Carousel, CarouselContent, CarouselItem, CarouselNavigation, CarouselIndicator } from "@/components/core/carousel";`,
    codeUsage: `<Carousel className="w-full max-w-lg mx-auto">
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselNavigation />
  <CarouselIndicator />
</Carousel>`,
    features: [
      "Smooth drag gestures with velocity-aware inertia",
      "Built-in indicator dots and chevron navigation",
      "Responsive min-width column sizing",
    ],
    props: [
      { name: "children", type: "ReactNode", description: "Carousel layout components." },
      { name: "initialIndex", type: "number", default: "0", description: "Starting slide index." },
      { name: "disableDrag", type: "boolean", default: "false", description: "Disable drag gestures." },
    ],
  },
  {
    slug: "kanban",
    title: "Kanban Board",
    category: "Surfaces & Layouts",
    categorySlug: "surfaces",
    badge: "motion/core",
    description: "Interactive drag-and-drop Kanban board supporting cross-column transfers, card reordering, and customizable render slots.",
    howItWorks: "Utilizes native HTML5 drag and drop events combined with React state transitions. Tracks active drag items and target insertion slots, recalculating column items immutably upon drop with smooth visual feedback.",
    importStatement: `import { KanbanBoard, type KanbanColumn, type ItemMoveEvent } from "@/components/ui/kanban";`,
    codeUsage: `<KanbanBoard
  columns={columns}
  onColumnsChange={setColumns}
  onItemMove={({ item, targetColumnId }) => {
    console.log("Moved", item.title, "to", targetColumnId);
  }}
  renderColumnHeader={(col, count) => (
    <div className="font-semibold text-xs">{col.title} ({count})</div>
  )}
  renderItem={(deal) => (
    <Card className="p-3 bg-card shadow-xs">
      <p className="font-medium text-xs">{deal.title}</p>
      <p className="text-sm font-bold">\${deal.value.toLocaleString()}</p>
    </Card>
  )}
/>`,
    features: [
      "Zero-dependency HTML5 drag-and-drop compatible with React 19",
      "Full cross-column transfer and within-column card reordering",
      "Customizable renderItem, renderColumnHeader, and renderColumnFooter render props",
      "Visual drop insertion indicator line and ghost drag styling",
      "Accessible keyboard and mobile stage mover fallback support",
    ],
    props: [
      { name: "columns", type: "KanbanColumn<T>[]", description: "Array of column objects containing title and items array." },
      { name: "onColumnsChange", type: "(columns: KanbanColumn<T>[]) => void", description: "Callback triggered when columns state changes after a drop." },
      { name: "onItemMove", type: "(event: ItemMoveEvent<T>) => void", description: "Callback triggered with moved item, source, and target column info." },
      { name: "renderItem", type: "(item: T, column: KanbanColumn<T>, index: number) => ReactNode", description: "Custom card item renderer." },
      { name: "renderColumnHeader", type: "(column: KanbanColumn<T>, count: number) => ReactNode", description: "Optional custom column header renderer." },
      { name: "renderColumnFooter", type: "(column: KanbanColumn<T>) => ReactNode", description: "Optional custom column footer renderer." },
    ],
  },

  // 5. OVERLAYS & DISCLOSURES
  {
    slug: "accordion",
    title: "Accordion",
    category: "Overlays & Disclosures",
    categorySlug: "overlays",
    badge: "motion/core",
    description: "Spring-animated collapsible accordion items with smooth height transitions.",
    howItWorks: "Maintains active value in context. AccordionContent dynamically calculates height: auto using AnimatePresence with spring damping to prevent text clipping.",
    importStatement: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/core/accordion";`,
    codeUsage: `<Accordion defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What makes this theme high-converting?</AccordionTrigger>
    <AccordionContent>
      Optimized contrast, micro-interactions, and instant feedback.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    features: [
      "Spring-physics height animation without jank",
      "Animated rotating chevron trigger",
      "Keyboard accessible and screen-reader compliant",
    ],
    props: [
      { name: "defaultValue", type: "string", description: "Initial expanded item value." },
      { name: "expandedValue", type: "string", description: "Controlled expanded value." },
      { name: "onValueChange", type: "(value: string | undefined) => void", description: "Change callback." },
    ],
  },
  {
    slug: "disclosure",
    title: "Disclosure",
    category: "Overlays & Disclosures",
    categorySlug: "overlays",
    badge: "motion/core",
    description: "Single collapsible disclosure panel with smooth spring height animation.",
    howItWorks: "Manages open state with AnimatePresence. Renders motion.div with height 0 to height auto transition, handling overflow clipping during animation.",
    importStatement: `import { Disclosure, DisclosureTrigger, DisclosureContent } from "@/components/core/disclosure";`,
    codeUsage: `<Disclosure className="rounded-xl border p-4 bg-card">
  <DisclosureTrigger className="flex justify-between w-full font-semibold">
    <span>View Advanced Configuration</span>
    <ChevronDown className="size-4 group-data-[state=open]:hidden" />
    <ChevronUp className="size-4 hidden group-data-[state=open]:block" />
  </DisclosureTrigger>
  <DisclosureContent>
    <div className="pt-3 text-sm text-muted-foreground">
      Advanced options and API keys go here.
    </div>
  </DisclosureContent>
</Disclosure>`,
    features: [
      "Standalone collapsible block",
      "Customizable spring transition curves",
      "Accessible ARIA aria-expanded attributes",
    ],
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "defaultOpen", type: "boolean", default: "false", description: "Uncontrolled starting state." },
      { name: "className", type: "string", description: "Wrapper class." },
    ],
  },
  {
    slug: "dialog",
    title: "Dialog",
    category: "Overlays & Disclosures",
    categorySlug: "overlays",
    badge: "shadcn/ui",
    description: "Accessible modal dialog built with @base-ui/react, featuring focus trapping, backdrop blur, and accessible portals.",
    howItWorks: "Combines accessible portal rendering with backdrop transitions. Fully accessible with automatic focus management and keyboard dismissal.",
    importStatement: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";`,
    codeUsage: `<Dialog>
  <DialogTrigger render={<Button>Open Dialog</Button>} />
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>Are you sure you want to continue?</DialogDescription>
    </DialogHeader>
    <div className="flex justify-end gap-2 mt-4">
      <DialogClose render={<Button variant="outline">Cancel</Button>} />
      <Button>Confirm</Button>
    </div>
  </DialogContent>
</Dialog>`,
    features: [
      "Spring scale and opacity entrance",
      "Backdrop click and ESC key dismiss",
      "Focus trap and accessible ARIA attributes",
    ],
    props: [
      { name: "open", type: "boolean", description: "Controlled state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Open handler." },
    ],
  },
  {
    slug: "morphing-dialog",
    title: "Morphing Dialog",
    category: "Overlays & Disclosures",
    categorySlug: "overlays",
    badge: "motion/core",
    description: "Fluid layoutId morphing from inline card or image directly into a full modal dialog.",
    howItWorks: "Assigns matching unique layoutId between the trigger container and modal container. Clicking the card expands its geometry seamlessly across coordinates into modal state.",
    importStatement: `import { MorphingDialog, MorphingDialogTrigger, MorphingDialogContent, MorphingDialogContainer, MorphingDialogClose } from "@/components/core/morphing-dialog";`,
    codeUsage: `<MorphingDialog>
  <MorphingDialogTrigger className="rounded-xl border p-4 bg-card cursor-pointer">
    <div className="font-semibold">Click to expand details</div>
  </MorphingDialogTrigger>
  <MorphingDialogContainer>
    <MorphingDialogContent className="max-w-lg p-6 bg-card rounded-2xl border">
      <h2 className="text-xl font-bold">Expanded Case Study</h2>
      <MorphingDialogClose />
    </MorphingDialogContent>
  </MorphingDialogContainer>
</MorphingDialog>`,
    features: [
      "Seamless layoutId spatial transformation",
      "No sudden dialog popping, intuitive visual continuity",
      "Ideal for gallery previews, user cards, and deal summaries",
    ],
    props: [
      { name: "children", type: "React.ReactNode", description: "Dialog structure." },
      { name: "transition", type: "Transition", description: "Custom morphing spring physics." },
    ],
  },
  {
    slug: "morphing-popover",
    title: "Morphing Popover",
    category: "Overlays & Disclosures",
    categorySlug: "overlays",
    badge: "motion/core",
    description: "Floating popover that morphs smoothly from a trigger button shape.",
    howItWorks: "Uses shared layoutId animation between the collapsed trigger button and the open popover container, smoothly morphing width, height, and border-radius.",
    importStatement: `import { MorphingPopover, MorphingPopoverTrigger, MorphingPopoverContent } from "@/components/core/morphing-popover";`,
    codeUsage: `<MorphingPopover>
  <MorphingPopoverTrigger className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
    Add Task
  </MorphingPopoverTrigger>
  <MorphingPopoverContent className="w-80 p-4 bg-popover rounded-xl border shadow-xl">
    <h4 className="font-medium mb-2">Create New Task</h4>
  </MorphingPopoverContent>
</MorphingPopover>`,
    features: [
      "Geometry morphing from button to container",
      "Click outside dismissal",
      "Smooth layout transitions",
    ],
    props: [
      { name: "children", type: "React.ReactNode", description: "Popover components." },
    ],
  },
  {
    slug: "toolbar-dynamic",
    title: "Toolbar Dynamic",
    category: "Overlays & Disclosures",
    categorySlug: "overlays",
    badge: "motion/core",
    description: "Adaptive toolbar that dynamically expands to accommodate search inputs and actions.",
    howItWorks: "Animates its width from 98px to 300px when the search icon is clicked, revealing an inline search input with click-outside collapse.",
    importStatement: `import { ToolbarDynamic } from "@/components/core/toolbar-dynamic";`,
    codeUsage: `<ToolbarDynamic />`,
    features: [
      "Dynamic width animation with spring physics",
      "Automatic click-outside collapse",
      "Integrated search field and profile action",
    ],
    props: [],
  },
  {
    slug: "toolbar-expandable",
    title: "Toolbar Expandable",
    category: "Overlays & Disclosures",
    categorySlug: "overlays",
    badge: "motion/core",
    description: "Collapsible dock-like multi-tool action bar with flyout content panels.",
    howItWorks: "Measures panel height dynamically via useMeasure and renders expandable card drawers for active tools with smooth spring easing.",
    importStatement: `import { ToolbarExpandable } from "@/components/core/toolbar-expandable";`,
    codeUsage: `<ToolbarExpandable />`,
    features: [
      "Dynamic panel height measurement with react-use-measure",
      "Multiple tool flyouts (User, Messages, Wallet)",
      "Compact resting pill state",
    ],
    props: [],
  },

  // 6. UI PRIMITIVES
  {
    slug: "button",
    title: "Button",
    category: "UI Primitives",
    categorySlug: "primitives",
    badge: "shadcn/ui",
    description: "Versatile button component supporting multiple visual variants, sizes, and icon addons.",
    howItWorks: "Built with class-variance-authority (CVA) mapped to design tokens. Supports standard button actions and accessible focus rings.",
    importStatement: `import { Button } from "@/components/ui/button";`,
    codeUsage: `<Button variant="default" size="default">
  Click Me
</Button>`,
    features: [
      "Variants: default, secondary, outline, destructive, ghost, link",
      "Sizes: default, sm, lg, icon",
      "Disabled and loading state styling",
    ],
    props: [
      { name: "variant", type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'", default: "'default'", description: "Visual variant." },
      { name: "size", type: "'default' | 'sm' | 'lg' | 'icon'", default: "'default'", description: "Button dimensions." },
    ],
  },
  {
    slug: "card",
    title: "Card",
    category: "UI Primitives",
    categorySlug: "primitives",
    badge: "shadcn/ui",
    description: "Foundational container surface with structured Header, Title, Description, and Content slots.",
    howItWorks: "Modular card surface implementing border, background tokens, and semantic layout typography.",
    importStatement: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";`,
    codeUsage: `<Card>
  <CardHeader>
    <CardTitle>Total Revenue</CardTitle>
    <CardDescription>Monthly recurring revenue</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">$45,231.89</div>
  </CardContent>
</Card>`,
    features: [
      "Structured compound component design",
      "Clean border and shadow tokens",
      "Perfect base for Tilt, Spotlight, or GlowEffect",
    ],
    props: [
      { name: "className", type: "string", description: "Classes." },
      { name: "children", type: "React.ReactNode", description: "Card parts." },
    ],
  },
  {
    slug: "badge",
    title: "Badge",
    category: "UI Primitives",
    categorySlug: "primitives",
    badge: "shadcn/ui",
    description: "Compact status indicator pill for tags, categories, and pipeline stages.",
    howItWorks: "CVA-driven inline pill with tokenized border and color states.",
    importStatement: `import { Badge } from "@/components/ui/badge";`,
    codeUsage: `<Badge variant="outline" className="border-emerald-500/30 text-emerald-600 bg-emerald-500/10">
  Active Deal
</Badge>`,
    features: [
      "Variants: default, secondary, destructive, outline",
      "Subtle rounded pill styling",
    ],
    props: [
      { name: "variant", type: "'default' | 'secondary' | 'destructive' | 'outline'", default: "'default'", description: "Style variant." },
    ],
  },
  {
    slug: "tabs",
    title: "Tabs",
    category: "UI Primitives",
    categorySlug: "primitives",
    badge: "shadcn/ui",
    description: "Accessible tabbed interface for organizing partitioned view states.",
    howItWorks: "Accessible tab panel primitives supporting keyboard arrow navigation and active state styling.",
    importStatement: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";`,
    codeUsage: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account details here.</TabsContent>
  <TabsContent value="password">Password settings here.</TabsContent>
</Tabs>`,
    features: [
      "Keyboard arrow navigation",
      "Controlled and uncontrolled modes",
      "Can pair with AnimatedBackground for sliding pill indicator",
    ],
    props: [
      { name: "defaultValue", type: "string", description: "Default tab value." },
      { name: "value", type: "string", description: "Controlled tab value." },
    ],
  },
  {
    slug: "switch",
    title: "Switch",
    category: "UI Primitives",
    categorySlug: "primitives",
    badge: "shadcn/ui",
    description: "Accessible binary control toggle for user preferences and settings.",
    howItWorks: "Radio/checkbox compliant switch component with smooth thumb sliding animation.",
    importStatement: `import { Switch } from "@/components/ui/switch";`,
    codeUsage: `<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <label htmlFor="airplane-mode">Airplane Mode</label>
</div>`,
    features: [
      "Smooth thumb sliding transition",
      "Keyboard accessible with Space key toggle",
      "Form and state integration",
    ],
    props: [
      { name: "checked", type: "boolean", description: "Controlled checked state." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "State change callback." },
    ],
  },
  {
    slug: "avatar",
    title: "Avatar",
    category: "UI Primitives",
    categorySlug: "primitives",
    badge: "shadcn/ui",
    description: "User profile image display with automatic fallback to text initials.",
    howItWorks: "Attempts to load image source with smooth fade-in; if network fails, falls back instantly to text initials.",
    importStatement: `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";`,
    codeUsage: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
    features: [
      "Graceful error handling with fallback slots",
      "Multiple size options",
      "Clean rounded geometries",
    ],
    props: [
      { name: "src", type: "string", description: "Image URL." },
      { name: "alt", type: "string", description: "Accessible alt description." },
    ],
  },
  {
    slug: "progress",
    title: "Progress",
    category: "UI Primitives",
    categorySlug: "primitives",
    badge: "shadcn/ui",
    description: "Deterministic progress bar for file uploads, capacity meters, and tasks.",
    howItWorks: "Calculates translateX on an inner indicator bar corresponding to completion percentage.",
    importStatement: `import { Progress } from "@/components/ui/progress";`,
    codeUsage: `<Progress value={68} className="w-[60%]" />`,
    features: [
      "Smooth width interpolation",
      "Customizable height and background accent tracks",
      "ARIA role='progressbar' compliant",
    ],
    props: [
      { name: "value", type: "number", description: "Current percentage (0-100)." },
    ],
  },
];

export function getAllComponents(): ComponentItem[] {
  return COMPONENTS_REGISTRY;
}

export function getComponentBySlug(slug: string): ComponentItem | undefined {
  return COMPONENTS_REGISTRY.find((c) => c.slug === slug);
}

export function getComponentsByCategory(category: ComponentCategory): ComponentItem[] {
  return COMPONENTS_REGISTRY.filter((c) => c.category === category);
}

export function getCategories(): ComponentCategory[] {
  return [
    "Typography",
    "Numbers",
    "Micro-Interactions",
    "Surfaces & Layouts",
    "Overlays & Disclosures",
    "UI Primitives",
  ];
}

export function getAdjacentComponents(currentSlug: string): {
  prev: ComponentItem | null;
  next: ComponentItem | null;
} {
  const index = COMPONENTS_REGISTRY.findIndex((c) => c.slug === currentSlug);
  if (index === -1) return { prev: null, next: null };

  const prev = index > 0 ? COMPONENTS_REGISTRY[index - 1] : null;
  const next = index < COMPONENTS_REGISTRY.length - 1 ? COMPONENTS_REGISTRY[index + 1] : null;

  return { prev, next };
}
