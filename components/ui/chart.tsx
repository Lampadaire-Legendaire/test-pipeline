"use client";

import * as React from "react";
import { AreaChart as AreaChartPrimitive, BarChart as BarChartPrimitive, LineChart as LineChartPrimitive, PieChart as PieChartPrimitive, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Area, Bar, Line, Pie, Cell, Legend } from "recharts";
import { cn } from "@/lib/utils";

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[];
}

interface LineChartProps extends ChartProps {
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  yAxisWidth?: number;
}

export function LineChart({
  data,
  categories,
  index,
  colors = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  valueFormatter = (value: number) => `${value}`,
  yAxisWidth = 56,
  className,
  ...props
}: LineChartProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChartPrimitive
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 16,
            left: 16,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey={index}
            className="text-sm text-muted-foreground"
            tickLine={false}
            axisLine={false}
            padding={{ left: 16, right: 16 }}
            minTickGap={8}
          />
          <YAxis
            width={yAxisWidth}
            className="text-sm text-muted-foreground"
            tickLine={false}
            axisLine={false}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload) return null;
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {label}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {payload.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-1">
                            <div
                              className={cn(
                                "h-2 w-2 rounded-full",
                                `bg-${colors[index % colors.length]}`
                              )}
                            />
                            <span className="text-[0.70rem] text-muted-foreground">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-[0.70rem] font-medium">
                            {valueFormatter(item.value as number)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }}
          />
          {categories.map((category, index) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              className={`stroke-${colors[index % colors.length]}`}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                className: `fill-${colors[index % colors.length]}`,
              }}
            />
          ))}
        </LineChartPrimitive>
      </ResponsiveContainer>
    </div>
  );
}

interface BarChartProps extends ChartProps {
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  layout?: "vertical" | "horizontal";
  yAxisWidth?: number;
}

export function BarChart({
  data,
  categories,
  index,
  colors = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  valueFormatter = (value: number) => `${value}`,
  layout = "horizontal",
  yAxisWidth = 56,
  className,
  ...props
}: BarChartProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChartPrimitive
          data={data}
          layout={layout}
          margin={{
            top: 16,
            right: 16,
            bottom: 16,
            left: 16,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          {layout === "horizontal" ? (
            <>
              <XAxis
                dataKey={index}
                className="text-sm text-muted-foreground"
                tickLine={false}
                axisLine={false}
                padding={{ left: 16, right: 16 }}
                minTickGap={8}
              />
              <YAxis
                width={yAxisWidth}
                className="text-sm text-muted-foreground"
                tickLine={false}
                axisLine={false}
                tickFormatter={valueFormatter}
              />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                className="text-sm text-muted-foreground"
                tickLine={false}
                axisLine={false}
                padding={{ left: 16, right: 16 }}
                minTickGap={8}
                tickFormatter={valueFormatter}
              />
              <YAxis
                type="category"
                width={yAxisWidth}
                dataKey={index}
                className="text-sm text-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
            </>
          )}
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload) return null;
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {label}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {payload.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-1">
                            <div
                              className={cn(
                                "h-2 w-2 rounded-full",
                                `bg-${colors[index % colors.length]}`
                              )}
                            />
                            <span className="text-[0.70rem] text-muted-foreground">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-[0.70rem] font-medium">
                            {valueFormatter(item.value as number)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }}
          />
          {categories.map((category, index) => (
            <Bar
              key={category}
              dataKey={category}
              className={`fill-${colors[index % colors.length]}`}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChartPrimitive>
      </ResponsiveContainer>
    </div>
  );
}

interface PieChartProps extends ChartProps {
  category: string;
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
}

export function PieChart({
  data,
  category,
  index,
  colors = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  valueFormatter = (value: number) => `${value}`,
  className,
  ...props
}: PieChartProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChartPrimitive
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 16,
            left: 16,
          }}
        >
          <Pie
            data={data}
            dataKey={category}
            nameKey={index}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            paddingAngle={2}
            className="stroke-background"
            strokeWidth={2}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                className={`fill-${colors[index % colors.length]}`}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload) return null;
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col gap-1">
                    {payload.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-1">
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full",
                              `bg-${colors[index % colors.length]}`
                            )}
                          />
                          <span className="text-[0.70rem] text-muted-foreground">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-[0.70rem] font-medium">
                          {valueFormatter(item.value as number)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            className="text-xs text-muted-foreground"
            formatter={(value) => (
              <span className="text-xs text-muted-foreground">{value}</span>
            )}
          />
        </PieChartPrimitive>
      </ResponsiveContainer>
    </div>
  );
}