import { useOpportunities } from "@/hooks/useOpportunities";
import { MetricCard } from "@/components/MetricCard";
import { OpportunitiesTable } from "@/components/OpportunitiesTable";
import { Activity, TrendingUp, DollarSign, BarChart3 } from "lucide-react";

const Index = () => {
  const { data: opportunities = [], isLoading, error } = useOpportunities();

  const totalOpps = opportunities.length;
  const bestProfit = opportunities.reduce(
    (max, o) => (o.profit_percentage != null && o.profit_percentage > max ? o.profit_percentage : max),
    0
  );
  const avgProfit =
    totalOpps > 0
      ? opportunities.reduce((sum, o) => sum + (o.profit_percentage ?? 0), 0) / totalOpps
      : 0;
  const exchanges = new Set(opportunities.map((o) => o.exchange).filter(Boolean));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-primary/20 flex items-center justify-center">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Triangular Arbitrage</h1>
              <p className="text-xs text-muted-foreground">Third Strategy Monitor</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              Auto-refresh 10s
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Oportunidades"
            value={totalOpps}
            icon={<BarChart3 className="h-4 w-4" />}
            variant="info"
          />
          <MetricCard
            title="Mejor Profit"
            value={`${bestProfit.toFixed(4)}%`}
            icon={<TrendingUp className="h-4 w-4" />}
            variant="profit"
          />
          <MetricCard
            title="Profit Promedio"
            value={`${avgProfit.toFixed(4)}%`}
            icon={<DollarSign className="h-4 w-4" />}
            variant="default"
          />
          <MetricCard
            title="Exchanges"
            value={exchanges.size}
            subtitle={[...exchanges].join(", ") || "—"}
            icon={<Activity className="h-4 w-4" />}
            variant="warning"
          />
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="card-gradient rounded-lg border border-border p-12 text-center">
            <Activity className="h-6 w-6 text-primary animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Cargando oportunidades...</p>
          </div>
        ) : error ? (
          <div className="card-gradient rounded-lg border border-loss/30 p-12 text-center">
            <p className="text-sm text-loss">Error al cargar datos</p>
          </div>
        ) : (
          <OpportunitiesTable data={opportunities} />
        )}
      </main>
    </div>
  );
};

export default Index;
