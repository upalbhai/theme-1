"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

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

        <div className="w-full max-w-md space-y-8 relative z-10 animate-in slide-in-from-bottom-8 fade-in duration-700">
          <div className="text-center sm:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground shadow-md">
                <Sparkles className="size-4" />
              </div>
              <span className="font-bold text-xl tracking-tight">Apex CRM</span>
            </Link>
            
            <h1 className="text-3xl font-bold tracking-tight mb-2">Create an account</h1>
            <p className="text-muted-foreground">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          <div className="grid gap-6">
            <Button variant="outline" className="w-full h-11 gap-2 border-border bg-background hover:bg-accent font-medium">
              Sign up with GitHub
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or register with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSignup} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="John" defaultValue="John" className="h-11" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Doe" defaultValue="Doe" className="h-11" required />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  defaultValue="john.doe@company.com"
                  className="h-11"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  defaultValue="password123"
                  className="h-11"
                  required
                />
                <p className="text-[10px] text-muted-foreground mt-1">Must be at least 8 characters and contain a number or symbol.</p>
              </div>
              <Button type="submit" className="w-full h-11 gap-2 mt-2">
                Create Account
                <ArrowRight className="size-4" />
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8 border-t border-border/50 pt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Feature/Banner Section */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-primary/5 dark:bg-primary/10 border-l border-border/50 relative overflow-hidden p-12">
        <div className="relative z-10 max-w-lg w-full">
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            Everything you need to scale your SaaS
          </h2>
          
          <div className="space-y-6">
            {[
              "Enterprise-grade Data Tables with Sorting & Filtering",
              "Advanced Redux & TanStack Query State Management",
              "Pre-built CRM Dashboard & Analytics Views",
              "Beautifully customized shadcn/ui components"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="mt-1 h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="size-4" />
                </div>
                <p className="text-lg text-muted-foreground font-medium">{feature}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 rounded-2xl bg-background border border-border shadow-sm">
            <p className="italic text-muted-foreground mb-4">
              "This template saved us 3 months of frontend development time. The code is exceptionally clean and the UI is absolutely stunning right out of the box."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500" />
              <div>
                <p className="font-semibold text-sm">Sarah Jenkins</p>
                <p className="text-xs text-muted-foreground">CTO at Nexus AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
