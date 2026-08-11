"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, LayoutDashboard } from "lucide-react";

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

        <div className="w-full max-w-md space-y-8 relative z-10 animate-in slide-in-from-bottom-8 fade-in duration-700">
          <div className="text-center sm:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground shadow-md">
                <Sparkles className="size-4" />
              </div>
              <span className="font-bold text-xl tracking-tight">Apex CRM</span>
            </Link>
            
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <div className="grid gap-6">
            <Button variant="outline" className="w-full h-11 gap-2 border-border bg-background hover:bg-accent font-medium">
              Continue with GitHub
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  defaultValue="admin@apexcrm.com"
                  className="h-11"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs text-primary hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  defaultValue="password123"
                  className="h-11"
                  required
                />
              </div>
              <Button type="submit" className="w-full h-11 gap-2 mt-2">
                Sign In
                <ArrowRight className="size-4" />
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Image/Banner Section */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-muted/30 border-l border-border/50 relative overflow-hidden p-12 text-center">
        {/* Abstract pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-background border border-border shadow-sm mb-8">
            <LayoutDashboard className="size-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Manage your entire business from one place
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join thousands of teams who rely on Apex CRM to track deals, monitor revenue, and manage customer relationships.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-4 text-left">
            <div className="p-4 rounded-xl bg-background border border-border shadow-sm">
              <div className="text-2xl font-bold text-emerald-500 mb-1">4.9/5</div>
              <div className="text-sm font-medium text-muted-foreground">Average rating</div>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border shadow-sm">
              <div className="text-2xl font-bold text-blue-500 mb-1">10k+</div>
              <div className="text-sm font-medium text-muted-foreground">Active teams</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
