"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, LayoutDashboard } from "lucide-react";
import { TextEffect } from "@/components/core/text-effect";
import { Magnetic } from "@/components/core/magnetic";
import { Tilt } from "@/components/core/tilt";
import { BorderTrail } from "@/components/core/border-trail";
import { AnimatedNumber } from "@/components/core/animated-number";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
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
            <BorderTrail size={100} transition={{ duration: 7, repeat: Infinity, ease: "linear" }} className="bg-gradient-to-r from-primary via-blue-400 to-primary" />

            <div className="text-center sm:text-left mb-6">
              <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground shadow-md">
                  <Sparkles className="size-4" />
                </div>
                <span className="font-bold text-xl tracking-tight">Apex CRM</span>
              </Link>
              
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                <TextEffect per="char" preset="fade" as="span">
                  Welcome back
                </TextEffect>
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your dashboard
              </p>
            </div>

            <div className="grid gap-5">
              <Button variant="outline" className="w-full h-10 gap-2 border-border bg-background hover:bg-accent font-medium text-xs">
                Continue with GitHub
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground text-[10px]">
                    Or continue with
                  </span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="email" className="text-xs">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    defaultValue="admin@apexcrm.com"
                    className="h-10 text-sm"
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs">Password</Label>
                    <Link href="#" className="text-xs text-primary hover:underline font-medium">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    defaultValue="password123"
                    className="h-10 text-sm"
                    required
                  />
                </div>
                <Magnetic springOptions={{ bounce: 0.1 }}>
                  <Button type="submit" className="w-full h-10 gap-2 mt-1 shadow-sm">
                    Sign In
                    <ArrowRight className="size-4" />
                  </Button>
                </Magnetic>
              </form>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Image/Banner Section */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-muted/30 border-l border-border/50 relative overflow-hidden p-12 text-center">
        <div className="relative z-10 max-w-lg">
          <Tilt rotationFactor={8} isReverse className="inline-block mb-6">
            <div className="p-4 rounded-2xl bg-background border border-border shadow-md">
              <LayoutDashboard className="size-8 text-primary" />
            </div>
          </Tilt>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Manage your entire business from one place
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Join thousands of teams who rely on Apex CRM to track deals, monitor revenue, and manage customer relationships.
          </p>
          
          <div className="mt-10 grid grid-cols-2 gap-4 text-left">
            <Tilt rotationFactor={6} isReverse>
              <div className="p-4 rounded-xl bg-background border border-border shadow-xs">
                <div className="text-2xl font-bold text-emerald-500 mb-0.5">4.9/5</div>
                <div className="text-xs font-medium text-muted-foreground">Average customer rating</div>
              </div>
            </Tilt>
            <Tilt rotationFactor={6} isReverse>
              <div className="p-4 rounded-xl bg-background border border-border shadow-xs">
                <div className="text-2xl font-bold text-blue-500 mb-0.5 flex items-center">
                  <AnimatedNumber value={10400} />
                  <span>+</span>
                </div>
                <div className="text-xs font-medium text-muted-foreground">Active teams worldwide</div>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </div>
  );
}
