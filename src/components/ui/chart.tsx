import * as React from "react"
import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: Record<string, any>
  }
>(({ className, config, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex aspect-auto justify-center text-xs", className)}
    {...props}
  />
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = () => {
  // This is a simplified version - in a real app you'd use recharts tooltip
  return null
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    indicator?: "dot" | "line"
    labelFormatter?: (value: any) => string
  }
>(({ className, indicator = "dot", labelFormatter, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-background p-2 shadow-md",
      className
    )}
    {...props}
  />
))
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = ({ content, ...props }: any) => {
  return content ? React.createElement(content, props) : null
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-center gap-4 pt-4", className)}
    {...props}
  />
))
ChartLegendContent.displayName = "ChartLegendContent"

type ChartConfig = Record<string, {
  label: string
  color?: string
}>

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
}
