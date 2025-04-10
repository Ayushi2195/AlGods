"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ChevronDown, DollarSign, Download, FileText, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

import { FinanceSidebar } from "@/components/finance-sidebar"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month")
  const { toast } = useToast()

  // Sample data for year-to-date summary
  const ytdSummary = {
    income: 13050,
    expenses: 7345,
    savings: 5705,
    savingsRate: 43.7,
  }

  const handlePrint = () => {
    toast({
      title: "Print Initiated",
      description: "Preparing to print your financial report.",
    })
    // In a real app, this would trigger the print dialog
    window.print()
  }

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your financial report is being downloaded as a PDF.",
    })
    // In a real app, this would download a PDF report
  }

  const handlePdfDownload = (reportType: string) => {
    toast({
      title: `${reportType} Downloaded`,
      description: "Your report has been downloaded successfully.",
    })
    // In a real app, this would download the specific report
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      <FinanceSidebar />
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Link href="/" className="lg:hidden">
            <DollarSign className="h-6 w-6" />
            <span className="sr-only">FinFlow</span>
          </Link>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">Financial Reports</h1>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  {selectedPeriod}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Time Period</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedPeriod("This Month")}>This Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("Last Month")}>Last Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("This Quarter")}>This Quarter</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("Year to Date")}>Year to Date</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("Last Year")}>Last Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              <span className="sr-only">Print</span>
            </Button>
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${ytdSummary.income.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Year to date</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${ytdSummary.expenses.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Year to date</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${ytdSummary.savings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Year to date</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ytdSummary.savingsRate}%</div>
                <p className="text-xs text-muted-foreground">Of total income</p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
              <TabsTrigger value="income">Income Analysis</TabsTrigger>
              <TabsTrigger value="savings">Savings Report</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Income vs. Expenses Trend</CardTitle>
                    <CardDescription>Monthly comparison for the year</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[300px] w-full">
                      <div className="flex h-full w-full items-center justify-center">
                        <p className="text-muted-foreground">Chart data is loading. Please check back in a moment.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>For {selectedPeriod.toLowerCase()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <div className="flex h-full w-full items-center justify-center">
                        <p className="text-muted-foreground">Chart data is loading. Please check back in a moment.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Spending by Category</CardTitle>
                  <CardDescription>For {selectedPeriod.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-muted-foreground">Chart data is loading. Please check back in a moment.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="spending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Spending Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of your expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    This report provides a detailed analysis of your spending patterns, helping you identify areas where
                    you might be able to reduce expenses.
                  </p>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Top Spending Categories</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Housing</span>
                            <span className="text-sm font-medium">$1,342.50</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "100%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Food</span>
                            <span className="text-sm font-medium">$485.40</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "36%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Transportation</span>
                            <span className="text-sm font-medium">$395.75</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "29%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Spending Insights</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-1">Housing Costs</h4>
                          <p className="text-sm text-muted-foreground">
                            Your housing costs represent 46% of your total expenses, which is slightly above the
                            recommended 30-35%.
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-1">Food Spending</h4>
                          <p className="text-sm text-muted-foreground">
                            Your food spending is within the typical range of 10-15% of total expenses.
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-1">Transportation</h4>
                          <p className="text-sm text-muted-foreground">
                            Transportation costs are at 13% of your budget, which is within the recommended range.
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-1">Discretionary Spending</h4>
                          <p className="text-sm text-muted-foreground">
                            Your entertainment and shopping expenses are well-managed at 9% of your total spending.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="income" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Income Analysis</CardTitle>
                  <CardDescription>Overview of your income sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    This report analyzes your income sources and trends to help you understand your earning patterns.
                  </p>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Income Sources</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Primary Salary</span>
                            <span className="text-sm font-medium">$3,500.00</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "77%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Freelance Work</span>
                            <span className="text-sm font-medium">$850.00</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "19%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Investment Income</span>
                            <span className="text-sm font-medium">$200.00</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "4%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Income Insights</h3>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-1">Income Diversity</h4>
                          <p className="text-sm text-muted-foreground">
                            77% of your income comes from your primary job. Consider diversifying your income sources
                            for greater financial stability.
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-1">Income Growth</h4>
                          <p className="text-sm text-muted-foreground">
                            Your income has grown by 8% compared to the same period last year, which is above the
                            inflation rate.
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-1">Passive Income</h4>
                          <p className="text-sm text-muted-foreground">
                            Only 4% of your income is passive. Consider increasing investments to build more passive
                            income streams.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="savings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Savings Report</CardTitle>
                  <CardDescription>Analysis of your savings and progress toward goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    This report tracks your savings progress and provides insights to help you reach your financial
                    goals faster.
                  </p>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Savings Goals Progress</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Emergency Fund</span>
                            <span className="text-sm font-medium">75% Complete</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "75%" }}></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">$9,000 of $12,000 goal</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Vacation Fund</span>
                            <span className="text-sm font-medium">40% Complete</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "40%" }}></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">$2,000 of $5,000 goal</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Down Payment</span>
                            <span className="text-sm font-medium">15% Complete</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: "15%" }}></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">$7,500 of $50,000 goal</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Savings Insights</h3>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-1">Savings Rate</h4>
                          <p className="text-sm text-muted-foreground">
                            Your current savings rate of 43.7% is excellent! The recommended minimum is 20% of your
                            income.
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-1">Emergency Fund</h4>
                          <p className="text-sm text-muted-foreground">
                            You're on track to complete your emergency fund in 3 months at your current savings rate.
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-1">Retirement Savings</h4>
                          <p className="text-sm text-muted-foreground">
                            Based on your current retirement contributions, you're on track to reach your retirement
                            goal by age 62.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Available Reports</CardTitle>
                  <CardDescription>Download detailed financial reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium">Monthly Summary</h4>
                        <p className="text-sm text-muted-foreground">March 2025</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto"
                        onClick={() => handlePdfDownload("Monthly Summary")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium">Quarterly Report</h4>
                        <p className="text-sm text-muted-foreground">Q1 2025</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto"
                        onClick={() => handlePdfDownload("Quarterly Report")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium">Tax Summary</h4>
                        <p className="text-sm text-muted-foreground">2024 Tax Year</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto"
                        onClick={() => handlePdfDownload("Tax Summary")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
