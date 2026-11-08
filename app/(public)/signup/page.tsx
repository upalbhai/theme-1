"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldCheck, Building2, Users } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
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
                Create your workspace
              </h1>
              <p className="text-xs text-muted-foreground">
                14-day evaluation period for your team. Instant setup.
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="first-name" className="text-xs text-foreground">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Alex"
                    defaultValue="Alex"
                    className="h-9 text-xs rounded-lg bg-background border-border/80"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="last-name" className="text-xs text-foreground">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Rivera"
                    defaultValue="Rivera"
                    className="h-9 text-xs rounded-lg bg-background border-border/80"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-xs text-foreground">Company name</Label>
                <Input
                  id="company"
                  placeholder="Acme Corp"
                  defaultValue="Starlight Technologies"
                  className="h-9 text-xs rounded-lg bg-background border-border/80"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs text-foreground">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="alex@company.com"
                  defaultValue="alex@starlight.io"
                  className="h-9 text-xs rounded-lg bg-background border-border/80"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  defaultValue="password123"
                  className="h-9 text-xs rounded-lg bg-background border-border/80"
                  required
                />
                <p className="text-[11px] text-muted-foreground font-mono">
                  Minimum 8 characters with letters and numbers
                </p>
              </div>

              <Button type="submit" className="w-full h-9 text-xs font-medium rounded-lg gap-2 mt-2 shadow-xs">
                <span>Create Workspace</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </form>

            <div className="pt-2 text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-foreground hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-4">
          <span className="font-mono text-[11px]">Apex CRM v2.0</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground transition-colors">Documentation</Link>
            <Link href="/" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Right Product Context Section */}
      <div className="hidden lg:flex flex-col justify-between bg-muted/20 border-l border-border/60 p-12">
        <div className="flex justify-end">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border/80 text-[11px] font-mono text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span>Pre-configured Environment</span>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-6 w-full">
          <div className="space-y-2">
            <h2 className="text-xl font-medium tracking-tight text-foreground">
              Standardized architecture out of the box
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every workspace is provisioned with pre-wired Redux stores, TanStack Query hooks, and typed schemas for instant customization.
            </p>
          </div>

          {/* Provisioning Configuration Card */}
          <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="text-xs font-medium text-foreground">Default Workspace Stack</span>
              <span className="text-[11px] font-mono text-muted-foreground">Production Ready</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Application Framework</span>
                <span className="font-mono font-medium text-foreground">Next.js 16 (App Router)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Rendering Engine</span>
                <span className="font-mono font-medium text-foreground">React 19 Server Components</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">State Management</span>
                <span className="font-mono font-medium text-foreground">Redux Toolkit + TanStack Query</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Design System</span>
                <span className="font-mono font-medium text-foreground">Tailwind CSS v4 + 33 Primitives</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground">Data Layer</span>
                <span className="font-mono font-medium text-foreground">Mock REST + Webhook Event Bus</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-primary shrink-0" />
              <span>Full TypeScript typecheck with zero compiler warnings</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-primary shrink-0" />
              <span>Static prerendering support across all internal routes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-primary shrink-0" />
              <span>WCAG AA compliant contrast ratios and keyboard traps</span>
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
