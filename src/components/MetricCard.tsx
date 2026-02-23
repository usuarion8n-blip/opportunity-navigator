import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  variant?: "default" | "profit" | "warning" | "info";
}

const variantStyles = {
  default: "text-foreground",
  profit: "text-profit",
  warning: "text-warning",
  info: "text-info",
};

export function MetricCard({ title, value, subtitle, icon, variant = "default" }: MetricCardProps) {
  return (
    <div className="card-gradient rounded-lg border border-border p-5 glow-border">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        <span className="text-muted-foreground">{icon}</span>
      </div>
      <p className={`text-2xl font-bold font-mono ${variantStyles[variant]}`}>
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
}
