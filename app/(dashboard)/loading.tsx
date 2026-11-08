export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse p-2">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-lg bg-muted/60" />
          <div className="h-4 w-72 rounded-md bg-muted/40" />
        </div>
        <div className="h-9 w-28 rounded-lg bg-muted/60" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-card border border-border/60 p-4 space-y-3">
            <div className="h-4 w-24 rounded bg-muted/50" />
            <div className="h-6 w-32 rounded bg-muted/70" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 h-72 rounded-xl bg-card border border-border/60 p-6" />
        <div className="h-72 rounded-xl bg-card border border-border/60 p-6" />
      </div>
    </div>
  );
}

