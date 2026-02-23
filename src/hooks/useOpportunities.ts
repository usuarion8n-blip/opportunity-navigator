import { useQuery } from "@tanstack/react-query";

export interface Opportunity {
  id: number;
  created_at: string;
  exchange: string | null;
  start_asset: string | null;
  triangle_path: string | null;
  profit_percentage: number | null;
  estimated_profit: number | null;
  estimated_profit_currency: string | null;
  multiplier: number | null;
  notional_amount: number | null;
  fee_per_trade: number | null;
  legs: any;
  timestamp: string | null;
  timestamp_ms: number | null;
  final_amount: number | null;
  start_amount: number | null;
}

const API_URL = "http://localhost:3000/api/v1/opportunities";

export function useOpportunities() {
  return useQuery({
    queryKey: ["opportunities"],
    queryFn: async (): Promise<Opportunity[]> => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      return json.data ?? [];
    },
    refetchInterval: 10000,
  });
}
