import type { ChartData, ChartOptions } from "chart.js";

export interface ChartProps {
  options: ChartOptions<"bar">;
  data: ChartData<"bar">;
}
