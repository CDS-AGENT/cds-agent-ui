import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Sector,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { PieSectorDataItem } from "recharts/types/polar/Pie"
import {
  ChartContainer,
} from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'

// Mock data for the area chart (diagnosis overview)
const generateDiagnosisAreaData = (days: number) => {
  const data = []
  const today = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Generate more realistic medical data
    const totalDiagnoses = Math.floor(Math.random() * 50) + 30
    const flaggedDiagnoses = Math.floor(totalDiagnoses * 0.15) + Math.floor(Math.random() * 5)
    
    data.push({
      date: date.toISOString().split('T')[0],
      diagnoses: totalDiagnoses,
      flagged: flaggedDiagnoses,
    })
  }
  
  return data
}

const generateTokenData = (days: number) => {
  const data = []
  const today = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Create more realistic patterns with baseline + random variation
    const baseConsumed = 6000 + (Math.sin(i / 7) * 2000) // Weekly pattern
    const baseSaved = 4000 + (Math.sin(i / 7) * 1500)
    
    data.push({
      date: date.toISOString().split('T')[0],
      consumed: Math.floor(baseConsumed + (Math.random() * 3000) - 1500),
      saved: Math.floor(baseSaved + (Math.random() * 2000) - 1000),
    })
  }
  
  return data
}

const reviewCasesData = [
  { name: 'Solved', value: 324, fill: '#22c55e' },
  { name: 'Pending', value: 87, fill: '#f59e0b' },
]

const chartConfig = {
  diagnoses: {
    label: "Total Diagnoses",
    color: "#3b82f6", // Blue color
  },
  flagged: {
    label: "Flagged for Review",
    color: "#ef4444", // Red color
  },
  consumed: {
    label: "Tokens Consumed",
    color: "#f59e0b", // Amber color
  },
  saved: {
    label: "Tokens Saved",
    color: "#22c55e", // Green color
  },
  solved: {
    label: "Solved",
    color: "#22c55e", // Green color
  },
  pending: {
    label: "Pending",
    color: "#f59e0b", // Amber color
  },
  total: {
    label: "Total Cases",
    color: "#6b7280", // Gray color
  },
} satisfies ChartConfig

const recentDiagnoses = [
  { patient: 'John Smith', diagnosis: 'Type 2 Diabetes', date: '2024-08-11', status: 'Completed' },
  { patient: 'Emily Johnson', diagnosis: 'Hypertension', date: '2024-08-11', status: 'Completed' },
  { patient: 'Michael Brown', diagnosis: 'Asthma', date: '2024-08-10', status: 'Completed' },
  { patient: 'Sarah Davis', diagnosis: 'Migraine', date: '2024-08-10', status: 'In Progress' },
  { patient: 'David Wilson', diagnosis: 'Pneumonia', date: '2024-08-09', status: 'Completed' },
]

const flaggedCases = [
  { patient: 'Alice Cooper', reason: 'Unusual symptoms', date: '2024-08-11', status: 'Pending' },
  { patient: 'Bob Miller', reason: 'Conflicting test results', date: '2024-08-10', status: 'In Review' },
  { patient: 'Carol White', reason: 'High-risk patient', date: '2024-08-10', status: 'Pending' },
  { patient: 'Daniel Green', reason: 'Complex case', date: '2024-08-09', status: 'In Review' },
  { patient: 'Eva Martinez', reason: 'Multiple conditions', date: '2024-08-09', status: 'Pending' },
]

interface DashboardProps {
  onPageChange?: (page: string) => void
}

export function Dashboard({ onPageChange }: DashboardProps = {}) {
  const [timeRange, setTimeRange] = useState('30')
  const [activeCase, setActiveCase] = useState('pending')
  const { theme } = useTheme()
  
  const diagnosisAreaData = generateDiagnosisAreaData(parseInt(timeRange))
  const tokenData = generateTokenData(parseInt(timeRange))

  const activeIndex = useMemo(
    () => reviewCasesData.findIndex((item) => item.name.toLowerCase() === activeCase),
    [activeCase]
  )
  
  const caseTypes = useMemo(() => [...reviewCasesData.map((item) => item.name.toLowerCase()), 'total'], [])

  const filteredDiagnosisData = diagnosisAreaData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date()
    const daysToSubtract = parseInt(timeRange)
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your clinical activities and system metrics
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Diagnosis Overview Area Chart - Full Width */}
      <Card className="pt-0">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle>Diagnosis Overview - Interactive</CardTitle>
            <CardDescription>
              Showing total diagnoses and flagged cases over time
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredDiagnosisData}>
                <defs>
                  <linearGradient id="fillDiagnoses" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#3b82f6"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#3b82f6"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillFlagged" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#ef4444"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#ef4444"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
                <YAxis />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length && label) {
                      return (
                        <div className="rounded-lg border bg-background p-3 shadow-lg">
                          <p className="font-medium mb-2 text-sm">
                            {new Date(label as string).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </p>
                          <div className="space-y-1">
                            {payload.map((entry, index) => (
                              <div key={index} className="flex items-center justify-between gap-3 min-w-[200px]">
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: entry.color }}
                                  />
                                  <span className="text-sm font-medium">{entry.name}</span>
                                </div>
                                <span className="text-sm font-bold" style={{ color: entry.color }}>
                                  {entry.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  dataKey="flagged"
                  type="natural"
                  fill="url(#fillFlagged)"
                  stroke="#ef4444"
                  stackId="a"
                  name="Flagged for Review"
                />
                <Area
                  dataKey="diagnoses"
                  type="natural"
                  fill="url(#fillDiagnoses)"
                  stroke="#3b82f6"
                  stackId="a"
                  name="Total Diagnoses"
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Token Usage and Review Cases - Side by Side */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Token Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Token Usage</CardTitle>
            <CardDescription>
              AI tokens consumed vs saved through automation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tokenData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="consumedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.6}/>
                  </linearGradient>
                  <linearGradient id="savedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                <XAxis 
                  dataKey="date" 
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={Math.ceil(tokenData.length / 6)} // Show fewer ticks for readability
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length && label) {
                      return (
                        <div className="rounded-lg border bg-background p-3 shadow-lg">
                          <p className="font-medium mb-2 text-sm">
                            {new Date(label as string).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </p>
                          <div className="space-y-1">
                            {payload.map((entry, index) => {
                              // Map the dataKey to the correct color
                              const getColor = (dataKey: string) => {
                                switch(dataKey) {
                                  case 'consumed': return '#f59e0b'
                                  case 'saved': return '#22c55e'
                                  default: return '#6b7280'
                                }
                              }
                              
                              const color = getColor(entry.dataKey as string)
                              
                              return (
                                <div key={index} className="flex items-center justify-between gap-3 min-w-[180px]">
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="w-3 h-3 rounded-sm flex-shrink-0" 
                                      style={{ backgroundColor: color }}
                                    />
                                    <span className="text-sm font-medium">{entry.name}</span>
                                  </div>
                                  <span className="text-sm font-bold" style={{ color: color }}>
                                    {Number(entry.value).toLocaleString()}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="rect"
                />
                <Bar 
                  dataKey="consumed" 
                  fill="url(#consumedGradient)" 
                  name="Tokens Consumed" 
                  radius={[2, 2, 0, 0]}
                  stroke="#f59e0b"
                  strokeWidth={1}
                />
                <Bar 
                  dataKey="saved" 
                  fill="url(#savedGradient)" 
                  name="Tokens Saved" 
                  radius={[2, 2, 0, 0]}
                  stroke="#22c55e"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Review Cases Pie Chart */}
        <Card>
          <CardHeader className="flex-row items-start space-y-0 pb-0">
            <div className="grid gap-1">
              <CardTitle>Human Review Cases</CardTitle>
              <CardDescription>Case resolution status overview</CardDescription>
            </div>
            <Select value={activeCase} onValueChange={setActiveCase}>
              <SelectTrigger
                className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                aria-label="Select a case type"
              >
                <SelectValue placeholder="Select case" />
              </SelectTrigger>
              <SelectContent align="end" className="rounded-xl">
                {caseTypes.map((key) => {
                  const config = chartConfig[key as keyof typeof chartConfig]
                  if (!config) return null
                  
                  return (
                    <SelectItem
                      key={key}
                      value={key}
                      className="rounded-lg [&_span]:flex"
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className="flex h-3 w-3 shrink-0 rounded-sm"
                          style={{ backgroundColor: config.color }}
                        />
                        {config.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="flex flex-1 justify-center pb-0">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0]
                      const originalIndex = reviewCasesData.findIndex(item => item.name === data.payload.name)
                      const originalValue = reviewCasesData[originalIndex]?.value || 0
                      const totalCases = reviewCasesData.reduce((total, item) => total + item.value, 0)
                      return (
                        <div className="rounded-lg border bg-background p-3 shadow-lg">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-sm" 
                              style={{ backgroundColor: data.payload.fill }}
                            />
                            <span className="font-medium">{data.payload.name}</span>
                          </div>
                          <div className="mt-1">
                            <span className="text-2xl font-bold">{originalValue}</span>
                            <span className="text-sm text-muted-foreground ml-1">cases</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {((originalValue / totalCases) * 100).toFixed(1)}% of total
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Pie
                  data={reviewCasesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  strokeWidth={1}
                  stroke={theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.2)'}
                  {...(activeCase === 'total' 
                    ? { activeIndex: [0, 1] } 
                    : activeIndex >= 0 
                      ? { activeIndex: activeIndex }
                      : {}
                  )}
                  activeShape={({
                    outerRadius = 0,
                    ...props
                  }: PieSectorDataItem) => (
                    <g>
                      <Sector 
                        {...props} 
                        outerRadius={outerRadius + 15}
                        stroke={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.6)'}
                        strokeWidth={1}
                      />
                      <Sector
                        {...props}
                        outerRadius={outerRadius + 20}
                        innerRadius={outerRadius + 18}
                        stroke={theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.4)'}
                        strokeWidth={1}
                      />
                    </g>
                  )}
                >
                  {reviewCasesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                {activeCase === 'total' ? (
                  <>
                    <text
                      x="50%"
                      y="45%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-foreground text-3xl font-bold"
                    >
                      {reviewCasesData.reduce((total, item) => total + item.value, 0).toLocaleString()}
                    </text>
                    <text
                      x="50%"
                      y="55%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-muted-foreground text-sm"
                    >
                      Total Cases
                    </text>
                  </>
                ) : (
                  <>
                    <text
                      x="50%"
                      y="45%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-foreground text-3xl font-bold"
                    >
                      {reviewCasesData[activeIndex]?.value.toLocaleString()}
                    </text>
                    <text
                      x="50%"
                      y="55%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-muted-foreground text-sm"
                    >
                      {reviewCasesData[activeIndex]?.name}
                    </text>
                  </>
                )}
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Diagnoses */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Diagnoses</CardTitle>
            <CardDescription>Last 5 completed diagnoses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDiagnoses.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-1">
                    <p className="font-medium">{item.patient}</p>
                    <p className="text-sm text-muted-foreground">{item.diagnosis}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  }`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => onPageChange?.('diagnosis')}
              >
                View All Diagnoses
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Flagged Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Flagged for Review</CardTitle>
            <CardDescription>Cases requiring human attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {flaggedCases.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-1">
                    <p className="font-medium">{item.patient}</p>
                    <p className="text-sm text-muted-foreground">{item.reason}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Pending' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  }`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => onPageChange?.('flagged')}
              >
                View All Flagged Cases
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
