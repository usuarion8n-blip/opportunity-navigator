import { Opportunity } from "@/hooks/useOpportunities";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  data: Opportunity[];
}

function formatProfit(value: number | null) {
  if (value === null) return "—";
  return value >= 0
    ? `+${value.toFixed(4)}%`
    : `${value.toFixed(4)}%`;
}

function ProfitCell({ value }: { value: number | null }) {
  if (value === null) return <span className="text-muted-foreground">—</span>;
  const isPositive = value >= 0;
  return (
    <span className={`font-mono font-semibold ${isPositive ? "text-profit" : "text-loss"}`}>
      {formatProfit(value)}
    </span>
  );
}

function formatTime(ts: string | null) {
  if (!ts) return "—";
  try {
    return formatDistanceToNow(new Date(ts), { addSuffix: true, locale: es });
  } catch {
    return "—";
  }
}

export function OpportunitiesTable({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="card-gradient rounded-lg border border-border p-12 text-center">
        <p className="text-muted-foreground text-sm">No hay oportunidades disponibles</p>
      </div>
    );
  }

  return (
    <div className="card-gradient rounded-lg border border-border overflow-hidden glow-border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">Exchange</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">Activo</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">Ruta</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider text-right">Profit %</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider text-right">Profit Est.</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider text-right">Monto Inicio</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider text-right">Monto Final</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider text-right">Fee</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">Tiempo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((opp) => (
              <TableRow key={opp.id} className="border-border hover:bg-secondary/50 transition-colors">
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs border-border text-secondary-foreground">
                    {opp.exchange ?? "—"}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm font-medium">
                  {opp.start_asset ?? "—"}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground max-w-[200px] truncate">
                  {opp.triangle_path ?? "—"}
                </TableCell>
                <TableCell className="text-right">
                  <ProfitCell value={opp.profit_percentage} />
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {opp.estimated_profit != null
                    ? `${opp.estimated_profit.toFixed(4)} ${opp.estimated_profit_currency ?? ""}`
                    : "—"}
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {opp.start_amount?.toFixed(2) ?? "—"}
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {opp.final_amount?.toFixed(2) ?? "—"}
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-muted-foreground">
                  {opp.fee_per_trade?.toFixed(4) ?? "—"}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatTime(opp.created_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
