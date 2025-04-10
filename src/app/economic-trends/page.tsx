"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  DollarSign,
  ExternalLink,
  Globe,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function EconomicTrendsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("1 Year")
  const { toast } = useToast()

  // Sample data for stock market trends
  const stockMarketData = [
    { date: "Apr 2024", sp500: 5100, nasdaq: 16200, dowJones: 38500 },
    { date: "May 2024", sp500: 5150, nasdaq: 16400, dowJones: 38700 },
    { date: "Jun 2024", sp500: 5200, nasdaq: 16600, dowJones: 39000 },
    { date: "Jul 2024", sp500: 5180, nasdaq: 16500, dowJones: 38900 },
    { date: "Aug 2024", sp500: 5220, nasdaq: 16700, dowJones: 39100 },
    { date: "Sep 2024", sp500: 5250, nasdaq: 16800, dowJones: 39300 },
    { date: "Oct 2024", sp500: 5230, nasdaq: 16750, dowJones: 39200 },
    { date: "Nov 2024", sp500: 5270, nasdaq: 16900, dowJones: 39400 },
    { date: "Dec 2024", sp500: 5300, nasdaq: 17000, dowJones: 39600 },
    { date: "Jan 2025", sp500: 5320, nasdaq: 17100, dowJones: 39700 },
    { date: "Feb 2025", sp500: 5280, nasdaq: 17050, dowJones: 39650 },
    { date: "Mar 2025", sp500: 5235, nasdaq: 16950, dowJones: 39500 },
  ]

  // Sample data for economic indicators
  const economicIndicatorsData = [
    { date: "Q1 2024", gdpGrowth: 2.1, inflation: 2.6, unemployment: 3.8 },
    { date: "Q2 2024", gdpGrowth: 2.3, inflation: 2.7, unemployment: 3.7 },
    { date: "Q3 2024", gdpGrowth: 2.2, inflation: 2.8, unemployment: 3.6 },
    { date: "Q4 2024", gdpGrowth: 2.4, inflation: 2.9, unemployment: 3.5 },
    { date: "Q1 2025", gdpGrowth: 2.3, inflation: 2.8, unemployment: 3.6 },
  ]

  // Sample data for interest rates
  const interestRateData = [
    { date: "Apr 2024", fedRate: 4.75, mortgage30yr: 6.5, treasuryYield: 4.2 },
    { date: "May 2024", fedRate: 4.75, mortgage30yr: 6.4, treasuryYield: 4.1 },
    { date: "Jun 2024", fedRate: 4.75, mortgage30yr: 6.3, treasuryYield: 4.0 },
    { date: "Jul 2024", fedRate: 4.5, mortgage30yr: 6.2, treasuryYield: 3.9 },
    { date: "Aug 2024", fedRate: 4.5, mortgage30yr: 6.1, treasuryYield: 3.8 },
    { date: "Sep 2024", fedRate: 4.5, mortgage30yr: 6.0, treasuryYield: 3.7 },
    { date: "Oct 2024", fedRate: 4.25, mortgage30yr: 5.9, treasuryYield: 3.6 },
    { date: "Nov 2024", fedRate: 4.25, mortgage30yr: 5.8, treasuryYield: 3.5 },
    { date: "Dec 2024", fedRate: 4.25, mortgage30yr: 5.7, treasuryYield: 3.4 },
    { date: "Jan 2025", fedRate: 4.0, mortgage30yr: 5.6, treasuryYield: 3.3 },
    { date: "Feb 2025", fedRate: 4.0, mortgage30yr: 5.5, treasuryYield: 3.2 },
    { date: "Mar 2025", fedRate: 4.0, mortgage30yr: 5.4, treasuryYield: 3.1 },
  ]

  // Current market indicators
  const marketIndicators = [
    { name: "S&P 500", value: 5234.78, change: 1.2, trend: "up" },
    { name: "NASDAQ", value: 16950.12, change: 1.5, trend: "up" },
    { name: "Dow Jones", value: 39500.45, change: 0.8, trend: "up" },
    { name: "10-Year Treasury", value: 3.1, change: -0.2, trend: "down" },
    { name: "Gold (oz)", value: 2350.6, change: 0.5, trend: "up" },
    { name: "Oil (barrel)", value: 78.25, change: -1.2, trend: "down" },
  ]

  const handleExternalResources = () => {
    toast({
      title: "External Resources",
      description: "Opening external financial resources in a new tab.",
    })
    // In a real app, this would open a new tab with external resources
    window.open("https://www.bloomberg.com", "_blank")
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
            <h1 className="text-lg font-semibold">Economic Trends</h1>
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
                <DropdownMenuItem onClick={() => setSelectedPeriod("1 Month")}>1 Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("3 Months")}>3 Months</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("6 Months")}>6 Months</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("1 Year")}>1 Year</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("5 Years")}>5 Years</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {marketIndicators.map((indicator, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{indicator.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">{indicator.value}</div>
                  <p
                    className={`text-xs flex items-center ${indicator.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {indicator.trend === "up" ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {indicator.trend === "up" ? "+" : ""}
                    {indicator.change}%
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Tabs defaultValue="market" className="space-y-4">
            <TabsList>
              <TabsTrigger value="market">Market Trends</TabsTrigger>
              <TabsTrigger value="economic">Economic Indicators</TabsTrigger>
              <TabsTrigger value="interest">Interest Rates</TabsTrigger>
              <TabsTrigger value="outlook">Market Outlook</TabsTrigger>
            </TabsList>
            <TabsContent value="market" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Stock Market Trends</CardTitle>
                  <CardDescription>Major indices over the past {selectedPeriod.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[400px] w-full">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-muted-foreground">Chart data is loading. Please check back in a moment.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Sectors Performance</CardTitle>
                    <CardDescription>Year-to-date performance by sector</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[300px] w-full">
                      <div className="flex h-full w-full items-center justify-center">
                        <p className="text-muted-foreground">Chart data is loading. Please check back in a moment.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Market Volatility</CardTitle>
                    <CardDescription>VIX index over time</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[300px] w-full">
                      <div className="flex h-full w-full items-center justify-center">
                        <p className="text-muted-foreground">Chart data is loading. Please check back in a moment.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="economic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Economic Indicators</CardTitle>
                  <CardDescription>Key economic metrics over time</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[400px] w-full">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-muted-foreground">Chart data is loading. Please check back in a moment.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Consumer Sentiment</CardTitle>
                    <CardDescription>Consumer confidence index</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[300px] w-full">
                      <div className="flex h-full w-full items-center justify-center">
                        <p className="text-muted-foreground">Chart data is loading. Please check back in a moment.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Housing Market</CardTitle>
                    <CardDescription>Home price index and sales</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[300px] w-full">
                      <div className="flex h-full w-full items-center justify-center">
                        <p className="text-muted-foreground">Chart data is loading. Please check back in a moment.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="interest" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Interest Rate Trends</CardTitle>
                  <CardDescription>Key interest rates over time</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[400px] w-full">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-muted-foreground">Chart data is loading. Please check back in a moment.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Federal Reserve Policy</CardTitle>
                    <CardDescription>Recent and projected Fed actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-2">Recent Actions</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>March 2025: Federal Funds Rate maintained at 4.0%</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>January 2025: Rate cut of 0.25% to 4.0%</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>October 2024: Rate cut of 0.25% to 4.25%</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>July 2024: Rate cut of 0.25% to 4.5%</span>
                          </li>
                        </ul>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-2">Projected Path</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          The Federal Reserve has indicated it may consider additional rate cuts later this year if
                          inflation continues to stabilize. Market expectations:
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>June 2025: Potential 0.25% cut to 3.75%</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>September 2025: Potential 0.25% cut to 3.5%</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>December 2025: Potential 0.25% cut to 3.25%</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Impact on Borrowing Costs</CardTitle>
                    <CardDescription>How interest rates affect different loans</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-2">Mortgage Impact</h3>
                        <p className="text-sm text-muted-foreground">
                          The recent decline in mortgage rates from 6.5% to 5.4% over the past year has improved home
                          affordability. On a $400,000 mortgage:
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                          <div className="font-medium">At 6.5%:</div>
                          <div>$2,528/month</div>
                          <div className="font-medium">At 5.4%:</div>
                          <div>$2,247/month</div>
                          <div className="font-medium">Monthly Savings:</div>
                          <div className="text-green-500">$281/month</div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-2">Other Loan Types</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Auto Loans (60-month)</span>
                              <span className="font-medium">5.2%</span>
                            </div>
                            <div className="text-xs text-muted-foreground">Down 0.8% from last year</div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Credit Cards (Average APR)</span>
                              <span className="font-medium">19.8%</span>
                            </div>
                            <div className="text-xs text-muted-foreground">Down 0.5% from last year</div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Personal Loans</span>
                              <span className="font-medium">8.5%</span>
                            </div>
                            <div className="text-xs text-muted-foreground">Down 1.2% from last year</div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Home Equity Lines</span>
                              <span className="font-medium">7.1%</span>
                            </div>
                            <div className="text-xs text-muted-foreground">Down 0.9% from last year</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="outlook" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Market Outlook</CardTitle>
                  <CardDescription>Analysis and projections for the coming months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Economic Summary</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        The current economic indicators suggest moderate growth with controlled inflation. The Federal
                        Reserve has been gradually reducing interest rates, which has supported both the stock market
                        and housing sector. Consumer sentiment remains strong, and unemployment is at historically low
                        levels.
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            <h4 className="font-medium">Positive Factors</h4>
                          </div>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Strong consumer spending continues to drive economic growth</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Corporate earnings have exceeded expectations in most sectors</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Inflation has stabilized near the Fed's target range</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Labor market remains resilient with low unemployment</span>
                            </li>
                          </ul>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="h-5 w-5 text-red-500" />
                            <h4 className="font-medium">Risk Factors</h4>
                          </div>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Geopolitical tensions could disrupt global supply chains</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>High government debt levels may limit fiscal policy options</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Stock market valuations remain elevated by historical standards</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Housing affordability remains a challenge despite lower rates</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Investment Implications</h3>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-2">Equities</h4>
                          <p className="text-sm text-muted-foreground">
                            The outlook for equities remains cautiously positive. Technology and healthcare sectors are
                            expected to outperform, while energy may face headwinds. Quality companies with strong
                            balance sheets and consistent earnings are favored in the current environment.
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-2">Fixed Income</h4>
                          <p className="text-sm text-muted-foreground">
                            With interest rates stabilizing and potentially declining further, bonds may offer both
                            income and some capital appreciation. Short to intermediate-term bonds and high-quality
                            corporate debt are attractive in this environment.
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-2">Real Estate</h4>
                          <p className="text-sm text-muted-foreground">
                            Lower mortgage rates are supporting the housing market, though affordability remains a
                            challenge in many regions. Commercial real estate is showing signs of recovery, particularly
                            in industrial and residential sectors.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-muted-foreground mb-4">
                      For more detailed economic analysis and investment recommendations, please consult with your
                      financial advisor.
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Last updated: March 28, 2025</p>
                      <Button variant="outline" size="sm" className="gap-1" onClick={handleExternalResources}>
                        <Globe className="h-4 w-4" />
                        <span>External Resources</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
