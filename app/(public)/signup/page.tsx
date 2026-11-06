"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { TextEffect } from "@/components/core/text-effect";
import { Magnetic } from "@/components/core/magnetic";
import { Tilt } from "@/components/core/tilt";
import { BorderTrail } from "@/components/core/border-trail";
import { AnimatedGroup } from "@/components/core/animated-group";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Form Section */}
      <div className="flex flex-col justify-center items-center p-8 bg-background relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          <div className="relative rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md p-8 shadow-xs overflow-hidden">
            <BorderTrail size={100} transition={{ duration: 7, repeat: Infinity, ease: "linear" }} className="bg-gradient-to-r from-primary via-emerald-400 to-primary" />

            <div className="text-center sm:text-left mb-6">
              <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground shadow-md">
                  <Sparkles className="size-4" />
                </div>
                <span className="font-bold text-xl tracking-tight">Apex CRM</span>
              </Link>
              
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                <TextEffect per="char" preset="fade" as="span">
                  Create an account
                </TextEffect>
              </h1>
              <p className="text-sm text-muted-foreground">
                Start your 14-day free trial. No credit card required.
              </p>
            </div>

            <div className="grid gap-5">
              <Button variant="outline" className="w-full h-10 gap-2 border-border bg-background hover:bg-accent font-medium text-xs">
                Sign up with GitHub
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground text-[10px]">
                    Or register with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSignup} className="grid gap-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="first-name" className="text-xs">First name</Label>
                    <Input id="first-name" placeholder="John" defaultValue="John" className="h-10 text-sm" required />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="last-name" className="text-xs">Last name</Label>
                    <Input id="last-name" placeholder="Doe" defaultValue="Doe" className="h-10 text-sm" required />
                  </div>
                </div>
                
                <div className="grid gap-1.5">
                  <Label htmlFor="email" className="text-xs">Work Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    defaultValue="john.doe@company.com"
                    className="h-10 text-sm"
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="password" className="text-xs">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    defaultValue="password123"
                    className="h-10 text-sm"
                    required
                  />
                  <p className="text-[10px] text-muted-foreground mt-0.5">Must be at least 8 characters and contain a number or symbol.</p>
                </div>
                <Magnetic springOptions={{ bounce: 0.1 }}>
                  <Button type="submit" className="w-full h-10 gap-2 mt-1 shadow-sm">
                    Create Account
                    <ArrowRight className="size-4" />
                  </Button>
                </Magnetic>
              </form>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6 border-t border-border/50 pt-5">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Feature/Banner Section */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-primary/5 dark:bg-primary/10 border-l border-border/50 relative overflow-hidden p-12">
        <div className="relative z-10 max-w-lg w-full">
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            Everything you need to scale your SaaS
          </h2>
          
          <AnimatedGroup preset="blur-slide" className="space-y-5">
            {[
              "Enterprise-grade Data Tables with Sorting & Filtering",
              "Advanced Redux & TanStack Query State Management",
              "Pre-built CRM Dashboard & Analytics Views",
              "33 Fluid Motion Primitives integrated natively",
              "Beautifully customized shadcn/ui components"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="mt-0.5 h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="size-3.5" />
                </div>
                <p className="text-base text-muted-foreground font-medium">{feature}</p>
              </div>
            ))}
          </AnimatedGroup>

          <Tilt rotationFactor={6} isReverse className="mt-12">
            <div className="p-6 rounded-2xl bg-background border border-border shadow-xs">
              <p className="italic text-muted-foreground text-sm mb-4 leading-relaxed">
                "This template saved us 3 months of frontend development time. The motion physics, state setup, and UI are absolutely stunning right out of the box."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500" />
                <div>
                  <p className="font-semibold text-xs">Sarah Jenkins</p>
                  <p className="text-[11px] text-muted-foreground">CTO at Nexus AI</p>
                </div>
              </div>
            </div>
          </Tilt>
        </div>
      </div>
    </div>
  );
}
