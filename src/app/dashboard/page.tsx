"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUp, Calendar, ChevronDown, DollarSign, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

import { FinanceDashboard } from "@/components/finance-dashboard"
import { FinanceSidebar } from "@/components/finance-sidebar"

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month")
  const { toast } = useToast()

  // Form states
  const [incomeAmount, setIncomeAmount] = useState("")
  const [incomeSource, setIncomeSource] = useState("")
  const [incomeDate, setIncomeDate] = useState("")

  const [expenseAmount, setExpenseAmount] = useState("")
  const [expenseCategory, setExpenseCategory] = useState("")
  const [expenseDate, setExpenseDate] = useState("")
  const [expenseDescription, setExpenseDescription] = useState("")

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    toast({
      title: "Income Added",
      description: `$${incomeAmount} from ${incomeSource} has been added to your account.`,
    })

    // Reset form
    setIncomeAmount("")
    setIncomeSource("")
    setIncomeDate("")
  }

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    toast({
      title: "Expense Added",
      description: `$${expenseAmount} for ${expenseDescription} has been added to your expenses.`,
    })

    // Reset form
    setExpenseAmount("")
    setExpenseCategory("")
    setExpenseDate("")
    setExpenseDescription("")
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
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
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
              <DropdownMenuItem onClick={() => setSelectedPeriod("Today")}>Today</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod("This Week")}>This Week</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod("This Month")}>This Month</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod("This Year")}>This Year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,550.00</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    +12.5%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,345.00</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 flex items-center">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    +8.1%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,205.00</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    +18.2%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Expenses</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,250.00</div>
                <p className="text-xs text-muted-foreground">Due in the next 7 days</p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="trends">Economic Trends</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <FinanceDashboard />
            </TabsContent>
            <TabsContent value="income" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Income Sources</CardTitle>
                  <CardDescription>Track your income from various sources</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="flex justify-end mb-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="gap-1">
                          <Plus className="h-4 w-4" /> Add Income
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Income</DialogTitle>
                          <DialogDescription>Enter the details of your income source below.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddIncome}>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="income-amount" className="text-right">
                                Amount
                              </Label>
                              <Input
                                id="income-amount"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="col-span-3"
                                value={incomeAmount}
                                onChange={(e) => setIncomeAmount(e.target.value)}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="income-source" className="text-right">
                                Source
                              </Label>
                              <Input
                                id="income-source"
                                placeholder="Salary, Freelance, etc."
                                className="col-span-3"
                                value={incomeSource}
                                onChange={(e) => setIncomeSource(e.target.value)}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="income-date" className="text-right">
                                Date
                              </Label>
                              <Input
                                id="income-date"
                                type="date"
                                className="col-span-3"
                                value={incomeDate}
                                onChange={(e) => setIncomeDate(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Add Income</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 p-4 text-sm font-medium">
                      <div>Source</div>
                      <div>Amount</div>
                      <div>Frequency</div>
                      <div>Last Received</div>
                    </div>
                    <div className="grid grid-cols-4 p-4 border-t text-sm">
                      <div>Salary</div>
                      <div>$3,500.00</div>
                      <div>Monthly</div>
                      <div>Mar 1, 2025</div>
                    </div>
                    <div className="grid grid-cols-4 p-4 border-t text-sm">
                      <div>Freelance Work</div>
                      <div>$850.00</div>
                      <div>Variable</div>
                      <div>Mar 15, 2025</div>
                    </div>
                    <div className="grid grid-cols-4 p-4 border-t text-sm">
                      <div>Investments</div>
                      <div>$200.00</div>
                      <div>Monthly</div>
                      <div>Mar 5, 2025</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="expenses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Expenses</CardTitle>
                  <CardDescription>Track your upcoming bills and expenses</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="flex justify-end mb-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="gap-1">
                          <Plus className="h-4 w-4" /> Add Expense
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Expense</DialogTitle>
                          <DialogDescription>Enter the details of your expense below.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddExpense}>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="expense-amount" className="text-right">
                                Amount
                              </Label>
                              <Input
                                id="expense-amount"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="col-span-3"
                                value={expenseAmount}
                                onChange={(e) => setExpenseAmount(e.target.value)}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="expense-description" className="text-right">
                                Description
                              </Label>
                              <Input
                                id="expense-description"
                                placeholder="Rent, Groceries, etc."
                                className="col-span-3"
                                value={expenseDescription}
                                onChange={(e) => setExpenseDescription(e.target.value)}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="expense-category" className="text-right">
                                Category
                              </Label>
                              <select
                                id="expense-category"
                                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={expenseCategory}
                                onChange={(e) => setExpenseCategory(e.target.value)}
                                required
                              >
                                <option value="">Select a category</option>
                                <option value="Housing">Housing</option>
                                <option value="Food">Food</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Health">Health</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="expense-date" className="text-right">
                                Due Date
                              </Label>
                              <Input
                                id="expense-date"
                                type="date"
                                className="col-span-3"
                                value={expenseDate}
                                onChange={(e) => setExpenseDate(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Add Expense</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 p-4 text-sm font-medium">
                      <div>Expense</div>
                      <div>Amount</div>
                      <div>Due Date</div>
                      <div>Category</div>
                    </div>
                    <div className="grid grid-cols-4 p-4 border-t text-sm">
                      <div>Rent</div>
                      <div>$1,200.00</div>
                      <div>Apr 1, 2025</div>
                      <div>Housing</div>
                    </div>
                    <div className="grid grid-cols-4 p-4 border-t text-sm">
                      <div>Utilities</div>
                      <div>$150.00</div>
                      <div>Apr 5, 2025</div>
                      <div>Housing</div>
                    </div>
                    <div className="grid grid-cols-4 p-4 border-t text-sm">
                      <div>Car Payment</div>
                      <div>$350.00</div>
                      <div>Apr 15, 2025</div>
                      <div>Transportation</div>
                    </div>
                    <div className="grid grid-cols-4 p-4 border-t text-sm">
                      <div>Groceries</div>
                      <div>$400.00</div>
                      <div>Ongoing</div>
                      <div>Food</div>
                    </div>
                    <div className="grid grid-cols-4 p-4 border-t text-sm">
                      <div>Subscription Services</div>
                      <div>$50.00</div>
                      <div>Apr 10, 2025</div>
                      <div>Entertainment</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Economic Trends</CardTitle>
                  <CardDescription>Current market and economic indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">S&P 500</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold">5,234.78</div>
                        <p className="text-xs text-green-500 flex items-center">
                          <ArrowUp className="mr-1 h-3 w-3" />
                          +1.2% today
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Inflation Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold">2.8%</div>
                        <p className="text-xs text-red-500 flex items-center">
                          <ArrowUp className="mr-1 h-3 w-3" />
                          +0.2% from last month
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Interest Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold">4.5%</div>
                        <p className="text-xs text-muted-foreground">Federal Reserve Rate</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Market Outlook</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      The current economic indicators suggest moderate growth with controlled inflation. The Federal
                      Reserve has indicated they may consider rate cuts later this year if inflation continues to
                      stabilize.
                    </p>
                    <h4 className="font-medium mb-2">Key Trends to Watch:</h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                      <li>Housing market showing signs of stabilization after recent volatility</li>
                      <li>Technology sector continues to lead market growth</li>
                      <li>Energy prices expected to remain stable through summer months</li>
                      <li>Consumer spending remains strong despite inflation concerns</li>
                    </ul>
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
