import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllComponents,
  getComponentBySlug,
  getAdjacentComponents,
} from "@/lib/components-registry";
import { ComponentDemo } from "@/components/docs/component-demo";
import { ComponentCodeViewer } from "@/components/docs/component-code-viewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Code2,
  CheckCircle2,
  Terminal,
  Layers,
  ChevronRight,
  Info,
  BookOpen,
  ExternalLink,
} from "lucide-react";

export function generateStaticParams() {
  return getAllComponents().map((c) => ({
    slug: c.slug,
  }));
}

interface ComponentPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const item = getComponentBySlug(slug);

  if (!item) {
    notFound();
  }

  const { prev, next } = getAdjacentComponents(slug);

  return (
    <div className="space-y-10 pb-16">
      {/* Breadcrumb & Navigation Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/components" className="hover:text-foreground transition-colors">
            Components
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground font-medium">{item.category}</span>
          <ChevronRight className="size-3" />
          <span className="text-primary font-semibold">{item.title}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {item.title}
              </h1>
              <Badge variant="secondary" className="font-mono text-xs uppercase px-2 py-0.5">
                {item.badge}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {item.category}
              </Badge>
            </div>
            <p className="text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {item.badge === "motion/core" && (
              <a
                href="https://github.com/ibelick/motion-primitives"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="outline" className="text-xs gap-1.5">
                  <ExternalLink className="size-3.5" /> ibelick/motion-primitives
                </Button>
              </a>
            )}
            <Link href="/components">
              <Button size="sm" variant="outline" className="text-xs gap-1.5">
                <ArrowLeft className="size-3.5" /> All Components
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 1. INTERACTIVE LIVE DEMO */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight">Interactive Live Demo</h2>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Interactive Playground
          </span>
        </div>

        <Card className="shadow-xs overflow-hidden border-border/80">
          <CardContent className="p-6 md:p-8">
            <ComponentDemo slug={item.slug} />
          </CardContent>
        </Card>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Info className="size-4 text-blue-500" />
          <h2 className="text-lg font-bold tracking-tight">How It Works</h2>
        </div>

        <Card className="bg-muted/20 border-border/80">
          <CardContent className="p-6 space-y-3">
            <p className="text-sm leading-relaxed text-foreground/90">
              {item.howItWorks}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Core Capabilities
              </h4>
              <ul className="grid sm:grid-cols-2 gap-2 text-xs">
                {item.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. CODE IMPLEMENTATION & INSTALLATION */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Code2 className="size-4 text-purple-500" />
          <h2 className="text-lg font-bold tracking-tight">Implementation & Code</h2>
        </div>

        <ComponentCodeViewer
          slug={item.slug}
          importStatement={item.importStatement}
          codeUsage={item.codeUsage}
        />
      </section>

      {/* 4. PROPS & API REFERENCE */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="size-4 text-amber-500" />
          <h2 className="text-lg font-bold tracking-tight">Props & API Reference</h2>
        </div>

        {item.props.length > 0 ? (
          <div className="rounded-2xl border overflow-x-auto bg-card shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b bg-muted/40 font-semibold text-muted-foreground">
                  <th className="p-3.5 pl-5">Prop</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Default</th>
                  <th className="p-3.5 pr-5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-mono">
                {item.props.map((prop) => (
                  <tr key={prop.name} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3.5 pl-5 font-bold text-primary">{prop.name}</td>
                    <td className="p-3.5 text-purple-600 dark:text-purple-400 max-w-xs truncate">
                      {prop.type}
                    </td>
                    <td className="p-3.5 text-muted-foreground">
                      {prop.default ? <code>{prop.default}</code> : "-"}
                    </td>
                    <td className="p-3.5 pr-5 font-sans text-muted-foreground leading-relaxed">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Card className="p-6 text-center text-xs text-muted-foreground">
            This component operates as an autonomous container or extends standard HTML element attributes.
          </Card>
        )}
      </section>

      {/* 5. PREVIOUS & NEXT NAVIGATION */}
      <section className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/components/${prev.slug}`}
            className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors w-full sm:w-1/2 group"
          >
            <div className="size-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
              <ArrowLeft className="size-4" />
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Previous</p>
              <p className="text-sm font-bold truncate">{prev.title}</p>
            </div>
          </Link>
        ) : (
          <div className="w-full sm:w-1/2" />
        )}

        {next ? (
          <Link
            href={`/components/${next.slug}`}
            className="flex items-center justify-end gap-3 p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors w-full sm:w-1/2 group text-right ml-auto"
          >
            <div className="overflow-hidden">
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Next</p>
              <p className="text-sm font-bold truncate">{next.title}</p>
            </div>
            <div className="size-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
              <ArrowRight className="size-4" />
            </div>
          </Link>
        ) : (
          <div className="w-full sm:w-1/2" />
        )}
      </section>
    </div>
  );
}

