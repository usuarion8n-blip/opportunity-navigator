import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

export function useOpportunities() {
  return useQuery({
    queryKey: ["opportunities"],
    queryFn: async (): Promise<Opportunity[]> => {
      const { data, error } = await supabase
        .from("oportunities_three_levels_third_strategy")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      return (data as Opportunity[]) ?? [];
    },
    refetchInterval: 10000,
  });
}
