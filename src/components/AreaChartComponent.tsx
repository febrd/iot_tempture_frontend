"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Configuration for the chart
const chartConfig = {
  desktop: {
    label: "Humidity",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Props interface
interface ChartProps {
  label: string;
  dataKey: string;
  chartData: any; // Allow any type for flexibility in handling unexpected data
}

export function AreaChartComponent({ label, dataKey, chartData }: ChartProps) {
  const [timeRange, setTimeRange] = React.useState("90d");

  // Ensure chartData is an array; if it's not an array, default to an empty array
  const formattedData = Array.isArray(chartData)
    ? chartData
        .filter(
          (item) =>
            item.timestamp !== null &&
            item.temperature !== null &&
            item.humidity !== null
        )
        .map((item) => ({
          timestamp: item.timestamp ?? "", // Default to empty string if null
          temperature: parseFloat(item.temperature ?? "0"), // Default to 0 if null
          humidity: parseFloat(item.humidity ?? "0"), // Default to 0 if null
        }))
    : []; // If chartData is not an array, use an empty array

  // Optionally, log an error if chartData is not an array (for debugging)
  if (!Array.isArray(chartData)) {
    console.error("Expected chartData to be an array, but got:", chartData);
  }

  // Filter data based on the selected time range
  const filteredData = formattedData?.filter((item) => {
    const date = new Date(item.timestamp);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{label} Chart</CardTitle>
          <CardDescription>
            Showing {label.toLowerCase()} for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:pr-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("id", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                });
              }}
            />
            <YAxis type="number" domain={[0, "dataMax + 10"]} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("id", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    });
                  }}
                  indicator="line"
                  nameKey={label}
                />
              }
            />
            <Area
              dataKey={dataKey}
              type="natural"
              fill="url(#fillColor)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
