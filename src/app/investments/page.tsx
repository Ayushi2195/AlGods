"use client"

import Link from "next/link"
import { ArrowRight, ChevronDown, DollarSign, Filter, Info, Search, SlidersHorizontal } from "lucide-react"

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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

import { FinanceSidebar } from "@/components/finance-sidebar"

export default function InvestmentsPage() {
  const { toast } = useToast()

  const handleLearnMore = (investment: string) => {
    toast({
      title: `${investment} Details`,
      description: "Opening detailed information about this investment option.",
    })
    // In a real app, this would navigate to a detailed page
  }

  const handleFilter = (filterType: string) => {
    toast({
      title: "Filter Applied",
      description: `Filtering investments by ${filterType}.`,
    })
    // In a real app, this would apply the filter
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      <FinanceSidebar />
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Link href="/" className="lg:hidden">
            <DollarSign className="h-6 w-6" />
            <span className="sr-only">FinanceWise</span>
          </Link>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">Investment Recommendations</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => toast({ title: "Search", description: "Search functionality coming soon." })}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                toast({ title: "Advanced Filters", description: "Advanced filtering options coming soon." })
              }
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Recommended Investments</h2>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleFilter("Risk Level")}>Risk Level</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilter("Investment Type")}>Investment Type</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilter("Expected Return")}>Expected Return</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilter("Time Horizon")}>Time Horizon</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
              <TabsTrigger value="etfs">ETFs</TabsTrigger>
              <TabsTrigger value="bonds">Bonds</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>S&P 500 Index Fund</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Info className="h-4 w-4" />
                              <span className="sr-only">Info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Tracks the performance of the 500 largest publicly traded companies in the US.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>ETF • Low Risk</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expected Annual Return:</span>
                        <span className="font-medium">8-10%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expense Ratio:</span>
                        <span className="font-medium">0.03%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Minimum Investment:</span>
                        <span className="font-medium">$1</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gap-1" onClick={() => handleLearnMore("S&P 500 Index Fund")}>
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Total Bond Market ETF</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Info className="h-4 w-4" />
                              <span className="sr-only">Info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Provides broad exposure to U.S. investment grade bonds with varying maturities.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>ETF • Very Low Risk</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expected Annual Return:</span>
                        <span className="font-medium">3-5%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expense Ratio:</span>
                        <span className="font-medium">0.05%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Minimum Investment:</span>
                        <span className="font-medium">$1</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gap-1" onClick={() => handleLearnMore("Total Bond Market ETF")}>
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Technology Sector ETF</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Info className="h-4 w-4" />
                              <span className="sr-only">Info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Focuses on companies in the technology sector including software, hardware, and
                              semiconductors.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>ETF • Medium Risk</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expected Annual Return:</span>
                        <span className="font-medium">10-15%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expense Ratio:</span>
                        <span className="font-medium">0.10%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Minimum Investment:</span>
                        <span className="font-medium">$1</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gap-1" onClick={() => handleLearnMore("Technology Sector ETF")}>
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Dividend Growth Fund</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Info className="h-4 w-4" />
                              <span className="sr-only">Info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Focuses on companies with a history of increasing dividend payments over time.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>Mutual Fund • Low-Medium Risk</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expected Annual Return:</span>
                        <span className="font-medium">7-9%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expense Ratio:</span>
                        <span className="font-medium">0.08%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Minimum Investment:</span>
                        <span className="font-medium">$3,000</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gap-1" onClick={() => handleLearnMore("Dividend Growth Fund")}>
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Emerging Markets ETF</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Info className="h-4 w-4" />
                              <span className="sr-only">Info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Invests in companies from developing economies with high growth potential.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>ETF • High Risk</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expected Annual Return:</span>
                        <span className="font-medium">8-12%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expense Ratio:</span>
                        <span className="font-medium">0.11%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Minimum Investment:</span>
                        <span className="font-medium">$1</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gap-1" onClick={() => handleLearnMore("Emerging Markets ETF")}>
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Real Estate Investment Trust</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Info className="h-4 w-4" />
                              <span className="sr-only">Info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Invests in income-producing real estate properties across various sectors.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>REIT • Medium Risk</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expected Annual Return:</span>
                        <span className="font-medium">6-8%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expense Ratio:</span>
                        <span className="font-medium">0.12%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Minimum Investment:</span>
                        <span className="font-medium">$1,000</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gap-1" onClick={() => handleLearnMore("Real Estate Investment Trust")}>
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="stocks" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Stock recommendations would go here */}
                <Card>
                  <CardHeader>
                    <CardTitle>Blue Chip Stock Portfolio</CardTitle>
                    <CardDescription>Stocks • Medium Risk</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      A curated selection of established, financially sound companies with reliable dividend histories.
                    </p>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expected Annual Return:</span>
                        <span className="font-medium">7-10%</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleLearnMore("Blue Chip Stock Portfolio")}>
                      View Recommendations
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="etfs" className="space-y-4">
              {/* ETF recommendations would go here */}
            </TabsContent>
            <TabsContent value="bonds" className="space-y-4">
              {/* Bond recommendations would go here */}
            </TabsContent>
            <TabsContent value="crypto" className="space-y-4">
              {/* Crypto recommendations would go here */}
            </TabsContent>
          </Tabs>
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Investment Profile</CardTitle>
                <CardDescription>Based on your financial goals and risk tolerance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Risk Tolerance: Moderate</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You're willing to accept some market fluctuations for potentially higher returns, but still
                      prioritize stability.
                    </p>
                    <h3 className="text-lg font-medium mb-2">Time Horizon: 10-15 years</h3>
                    <p className="text-sm text-muted-foreground">
                      Your longer investment timeline allows for some higher-risk investments while maintaining a
                      balanced portfolio.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Recommended Asset Allocation</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Stocks/Equities</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "60%" }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Bonds/Fixed Income</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "30%" }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Alternative Investments</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          toast({
                            title: "Profile Update",
                            description: "Investment profile update form will open shortly.",
                          })
                        }}
                      >
                        Update Investment Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
