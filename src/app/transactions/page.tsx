"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, CreditCard, DollarSign, Download, Filter, Search, ShoppingCart } from "lucide-react"

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
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

import { FinanceSidebar } from "@/components/finance-sidebar"

export default function TransactionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Sample transaction data
  const transactions = [
    {
      id: "TX123456",
      date: "Mar 28, 2025",
      description: "Grocery Store",
      category: "Food",
      amount: -85.4,
      type: "expense",
      icon: ShoppingCart,
    },
    {
      id: "TX123457",
      date: "Mar 25, 2025",
      description: "Salary Deposit",
      category: "Income",
      amount: 3500.0,
      type: "income",
      icon: DollarSign,
    },
    {
      id: "TX123458",
      date: "Mar 24, 2025",
      description: "Restaurant",
      category: "Food",
      amount: -64.2,
      type: "expense",
      icon: CreditCard,
    },
    {
      id: "TX123459",
      date: "Mar 22, 2025",
      description: "Online Shopping",
      category: "Shopping",
      amount: -124.99,
      type: "expense",
      icon: ShoppingCart,
    },
    {
      id: "TX123460",
      date: "Mar 20, 2025",
      description: "Utility Bill",
      category: "Housing",
      amount: -142.5,
      type: "expense",
      icon: CreditCard,
    },
    {
      id: "TX123461",
      date: "Mar 18, 2025",
      description: "Gas Station",
      category: "Transportation",
      amount: -45.75,
      type: "expense",
      icon: CreditCard,
    },
    {
      id: "TX123462",
      date: "Mar 15, 2025",
      description: "Freelance Payment",
      category: "Income",
      amount: 850.0,
      type: "income",
      icon: DollarSign,
    },
    {
      id: "TX123463",
      date: "Mar 12, 2025",
      description: "Coffee Shop",
      category: "Food",
      amount: -12.5,
      type: "expense",
      icon: CreditCard,
    },
    {
      id: "TX123464",
      date: "Mar 10, 2025",
      description: "Mobile Phone Bill",
      category: "Utilities",
      amount: -85.0,
      type: "expense",
      icon: CreditCard,
    },
    {
      id: "TX123465",
      date: "Mar 8, 2025",
      description: "Movie Tickets",
      category: "Entertainment",
      amount: -32.0,
      type: "expense",
      icon: CreditCard,
    },
    {
      id: "TX123466",
      date: "Mar 5, 2025",
      description: "Investment Dividend",
      category: "Income",
      amount: 200.0,
      type: "income",
      icon: DollarSign,
    },
    {
      id: "TX123467",
      date: "Mar 3, 2025",
      description: "Gym Membership",
      category: "Health",
      amount: -50.0,
      type: "expense",
      icon: CreditCard,
    },
    {
      id: "TX123468",
      date: "Mar 1, 2025",
      description: "Rent Payment",
      category: "Housing",
      amount: -1200.0,
      type: "expense",
      icon: CreditCard,
    },
  ]

  // Filter transactions based on search query and selected category
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      searchQuery === "" ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All Categories" || transaction.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Get unique categories for the dropdown
  const categories = ["All Categories", ...new Set(transactions.map((t) => t.category))]

  const handleExport = () => {
    toast({
      title: "Transactions Exported",
      description: "Your transactions have been exported to CSV successfully.",
    })
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
            <h1 className="text-lg font-semibold">Transactions</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 md:w-1/3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    {selectedCategory}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter By Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    Showing {filteredTransactions.length} of {transactions.length} transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <transaction.icon className="h-4 w-4 text-primary" />
                              </div>
                              {transaction.description}
                            </div>
                          </TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell
                            className={`text-right font-medium ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {transaction.amount > 0 ? "+" : ""}
                            {transaction.amount.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="income" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Income Transactions</CardTitle>
                  <CardDescription>Showing income transactions only</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions
                        .filter((t) => t.type === "income")
                        .map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                  <transaction.icon className="h-4 w-4 text-primary" />
                                </div>
                                {transaction.description}
                              </div>
                            </TableCell>
                            <TableCell>{transaction.category}</TableCell>
                            <TableCell className="text-right font-medium text-green-500">
                              +{transaction.amount.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="expenses" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Expense Transactions</CardTitle>
                  <CardDescription>Showing expense transactions only</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions
                        .filter((t) => t.type === "expense")
                        .map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                  <transaction.icon className="h-4 w-4 text-primary" />
                                </div>
                                {transaction.description}
                              </div>
                            </TableCell>
                            <TableCell>{transaction.category}</TableCell>
                            <TableCell className="text-right font-medium text-red-500">
                              {transaction.amount.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
