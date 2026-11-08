"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, CheckCircle2, Lock, ArrowUpRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground">
      {/* Left Form Section */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 font-semibold text-sm">
            <div className="size-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-xs">
              A
            </div>
            <span className="tracking-tight font-bold text-foreground">Apex CRM</span>
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto my-auto py-8">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <h1 className="text-2xl font-medium tracking-tight text-foreground">
                Sign in to your account
              </h1>
              <p className="text-xs text-muted-foreground">
                Enter your credentials to access the internal workspace.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs text-foreground">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="alex@company.com"
                  defaultValue="admin@apexcrm.com"
                  className="h-9 text-xs rounded-lg bg-background border-border/80"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs text-foreground">Password</Label>
                  <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  defaultValue="password123"
                  className="h-9 text-xs rounded-lg bg-background border-border/80"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-9 text-xs font-medium rounded-lg gap-2 mt-2 shadow-xs">
                <span>Sign In to Dashboard</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </form>

            <div className="pt-2 text-center text-xs text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-foreground hover:underline font-medium">
                Create one
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-4">
          <span className="font-mono text-[11px]">Apex CRM v2.0</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground transition-colors">Documentation</Link>
            <Link href="/" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </div>

      {/* Right Product Context Section */}
      <div className="hidden lg:flex flex-col justify-between bg-muted/20 border-l border-border/60 p-12">
        <div className="flex justify-end">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border/80 text-[11px] font-mono text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span>SOC2 Type II Certified</span>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-6 w-full">
          <div className="space-y-2">
            <h2 className="text-xl font-medium tracking-tight text-foreground">
              Operations & revenue intelligence
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Unified workspace for deal pipelines, contract status tracking, customer health metrics, and automated reporting.
            </p>
          </div>

          {/* Mini Live Preview Card */}
          <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="text-xs font-medium text-foreground">Pipeline Health</span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">+14.2% QoQ</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <span className="text-[11px] text-muted-foreground">Weighted ARR</span>
                <p className="text-lg font-bold font-mono tracking-tight text-foreground">$2,480,000</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-muted-foreground">Closed Win Rate</span>
                <p className="text-lg font-bold font-mono tracking-tight text-foreground">42.8%</p>
              </div>
            </div>

            <div className="pt-2 border-t border-border/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Enterprise Deals Closing</span>
                <span className="font-mono font-medium">5 Deals</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-full rounded-full w-[78%]" />
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-primary shrink-0" />
              <span>Real-time optimistic updates with TanStack Query</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-primary shrink-0" />
              <span>33 spring-physics motion primitives built-in</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-primary shrink-0" />
              <span>Redux Toolkit state management architecture</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Apex CRM. All rights reserved.
        </div>
      </div>
    </div>
  );
}
