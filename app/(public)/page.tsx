"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, LayoutDashboard, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Navbar */}
      <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20">
              <Sparkles className="size-4" />
            </div>
            <span className="font-bold text-lg tracking-tight">Apex Theme</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link href="/signup">
              <Button size="sm" className="gap-2">
                Get Started
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-24 md:py-32 px-4 text-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
          <Sparkles className="size-4" />
          <span>v2.0 is now live</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
          The Next-Gen Admin Theme for Modern SaaS.
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-in slide-in-from-bottom-12 fade-in duration-700 delay-200">
          A beautifully designed, enterprise-grade admin template built with Next.js 14, Tailwind CSS, and shadcn/ui. Ships with Redux & TanStack Query built-in.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in slide-in-from-bottom-16 fade-in duration-700 delay-300">
          <Link href="/dashboard">
            <Button size="lg" className="h-12 px-8 text-base gap-2 rounded-full">
              Live Preview
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full border-border hover:bg-accent">
              Purchase Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to build faster</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Skip the boilerplate and focus on building features. Our theme comes packed with production-ready components and state management.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: LayoutDashboard,
                title: "Premium Components",
                desc: "Built on top of shadcn/ui and Base UI with custom sleek styles and animations."
              },
              {
                icon: Shield,
                title: "Redux Toolkit Ready",
                desc: "Pre-configured store, slices, and typed hooks for scalable state management."
              },
              {
                icon: Zap,
                title: "TanStack Query Built-in",
                desc: "Advanced data fetching, caching, and mutation setups ready to connect to your API."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
