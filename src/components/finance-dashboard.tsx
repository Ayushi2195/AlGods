"use client"

import { CreditCard, DollarSign, ShoppingCart } from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FinanceDashboard() {
  // Current date for time progression calculation
  const currentDate = new Date("2025-04-10"); // Hardcoded to match your local time
  
  // Sample data for Income vs Expenses chart
  const incomeExpensesData = [
    { month: "Apr", income: 4200, expenses: 2400 },
    { month: "May", income: 3800, expenses: 2100 },
    { month: "Jun", income: 4000, expenses: 2800 },
    { month: "Jul", income: 4300, expenses: 2300 },
    { month: "Aug", income: 3900, expenses: 2500 },
    { month: "Sep", income: 4100, expenses: 2700 },
    { month: "Oct", income: 4500, expenses: 2600 },
    { month: "Nov", income: 4800, expenses: 2900 },
    { month: "Dec", income: 5200, expenses: 3100 },
    { month: "Jan", income: 4600, expenses: 2800 },
    { month: "Feb", income: 4700, expenses: 2500 },
    { month: "Mar", income: 4550, expenses: 2345 },
  ]

  // Sample data for Expense Breakdown chart
  const expenseBreakdownData = [
    { name: "Housing", value: 1200, color: "#0ea5e9" },
    { name: "Food", value: 400, color: "#10b981" },
    { name: "Transport", value: 350, color: "#6366f1" },
    { name: "Utilities", value: 150, color: "#f59e0b" },
    { name: "Entertainment", value: 120, color: "#ec4899" },
    { name: "Other", value: 125, color: "#8b5cf6" },
  ]

  // Sample data for Savings Growth chart
  const savingsGrowthData = [
    { month: "Jan", savings: 1500 },
    { month: "Feb", savings: 1700 },
    { month: "Mar", savings: 2205 },
  ]
  
  // Function to convert month name to date object
  const getMonthDate = (monthName: string, day: string) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = months.indexOf(monthName);
    // Adjust year if month is before April (we're in April 2025 currently)
    const year = monthIndex < 3 ? 2025 : 2024; 
    return new Date(year, monthIndex, parseInt(day));
  };
  
  // Function to calculate progress percentage between two dates
  const calculateProgress = (startDate: Date, endDate: Date, currentDate: Date) => {
    // If current date is before start date, return 0
    if (currentDate < startDate) return 0;
    // If current date is after end date, return 100
    if (currentDate > endDate) return 100;
    
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = currentDate.getTime() - startDate.getTime();
    return Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));
  };
  
  // Sample data for recurring expenses and EMI timeline
  const recurringExpensesData = [
    {
      name: "Home Loan EMI",
      amount: 750,
      payments: [
        { month: "Jan", date: "05", status: "paid" },
        { month: "Feb", date: "05", status: "paid" },
        { month: "Mar", date: "05", status: "paid" },
        { month: "Apr", date: "05", status: "due" },
        { month: "May", date: "05", status: "upcoming" },
        { month: "Jun", date: "05", status: "upcoming" },
      ]
    },
    {
      name: "Car Loan EMI",
      amount: 350,
      payments: [
        { month: "Jan", date: "10", status: "paid" },
        { month: "Feb", date: "10", status: "paid" },
        { month: "Mar", date: "10", status: "paid" },
        { month: "Apr", date: "10", status: "upcoming" },
        { month: "May", date: "10", status: "upcoming" },
        { month: "Jun", date: "10", status: "upcoming" },
      ]
    },
    {
      name: "Electricity Bill",
      amount: 120,
      payments: [
        { month: "Jan", date: "15", status: "paid" },
        { month: "Feb", date: "15", status: "paid" },
        { month: "Mar", date: "15", status: "paid" },
        { month: "Apr", date: "15", status: "due" },
        { month: "May", date: "15", status: "upcoming" },
        { month: "Jun", date: "15", status: "upcoming" },
      ]
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-7">
        <CardHeader>
          <CardTitle>Recurring Expenses & EMI Timeline</CardTitle>
          <CardDescription>Track your regular payments month by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recurringExpensesData.map((expense, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      {expense.name.includes("Loan") ? (
                        <CreditCard className="h-4 w-4 text-primary" />
                      ) : (
                        <ShoppingCart className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">{expense.name}</p>
                      <p className="text-sm text-muted-foreground">${expense.amount}/month</p>
                    </div>
                  </div>
                  <div>
                    <Badge variant={
                      expense.payments[3].status === "paid" ? "outline" : 
                      expense.payments[3].status === "due" ? "destructive" : "secondary"
                    }>
                      {expense.payments[3].status === "paid" ? "Paid" : 
                       expense.payments[3].status === "due" ? "Due Now" : "Upcoming"}
                    </Badge>
                  </div>
                </div>
                
                <div className="relative mt-2">
                  {/* Timeline background line */}
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-border"></div>
                  
                  {/* Timeline with continuous day-by-day progress */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-0">
                    {/* Due segments highlighted in red - we'll override the gray background */}
                    {expense.payments.map((payment, idx) => {
                      // Skip the last one as there's no segment after it
                      if (idx === expense.payments.length - 1) return null;
                      
                      // Get the next payment in sequence
                      const nextPayment = expense.payments[idx + 1];
                      
                      // Calculate segment width (each segment is between two dots)
                      const segmentWidth = `calc(100% / ${expense.payments.length - 1})`;
                      
                      // Determine if this is a due segment or upcoming segment
                      const isDueSegment = nextPayment.status === "due";
                      
                      // Only render segments that need to be highlighted in red
                      // (green progress and gray background are rendered separately)
                      if (!isDueSegment) {
                        return null; // Gray background covers everything that's not highlighted
                      } else {
                        // Calculate position for the red highlighted segment
                        const leftPosition = `calc(${idx} * ${segmentWidth})`;
                        
                        return (
                          <div
                            key={`segment-${idx}`}
                            className="h-1.5 absolute top-0 bg-red-200"
                            style={{
                              left: leftPosition,
                              width: segmentWidth,
                              zIndex: 5
                            }}
                          />
                        );
                      }
                    })}
                    
                    {/* First render a full background track */}
                    <div 
                      className="h-1.5 absolute top-0 left-0 right-0 bg-gray-200" 
                      style={{ zIndex: 0 }}
                    />
                    
                    {/* Now render the continuous progress bar */}
                    {(() => {
                      // Find the last paid payment
                      const lastPaidIndex = expense.payments.reduce((maxIdx, payment, idx) => 
                        payment.status === "paid" ? idx : maxIdx, -1);
                      
                      // If nothing is paid yet, don't show progress
                      if (lastPaidIndex === -1) return null;
                      
                      // Get current month details
                      const currentMonth = new Date("2025-04-10").getMonth(); // April = 3 (0-indexed)
                      const currentDay = new Date("2025-04-10").getDate(); // 10th day
                      const daysInMonth = new Date(2025, currentMonth + 1, 0).getDate(); // Days in April
                      
                      // Calculate how many days have passed in the current month (as fraction)
                      const monthProgress = currentDay / daysInMonth;
                      
                      // Calculate segment width
                      const segmentWidth = 100 / (expense.payments.length - 1);
                      
                      // Calculate the total width of the progress bar
                      let progressWidth;
                      
                      // If we're in a month that's already fully paid, the progress is up to that point
                      if (lastPaidIndex === expense.payments.length - 1) {
                        // All months are paid
                        progressWidth = 100;
                      } else {
                        // Base width includes all fully paid segments
                        const baseWidth = lastPaidIndex * segmentWidth;
                        
                        // Add the partial progress into the current segment
                        // This assumes we're in the month after the last paid month
                        progressWidth = baseWidth + (segmentWidth * monthProgress);
                      }
                      
                      return (
                        <div
                          className="h-1.5 absolute top-0 bg-green-500"
                          style={{
                            left: 0,
                            width: `${progressWidth}%`,
                            transition: "width 1s ease-in-out",
                            zIndex: 10
                          }}
                        />
                      );
                    })()} 
                    
                    {/* Add the solid red segment for the next due payment */}
                    {(() => {
                      const dueIndex = expense.payments.findIndex(p => p.status === "due");
                      if (dueIndex === -1) return null;
                      
                      // If the due payment is right after the last paid payment, don't render
                      // since it's already covered by the progress bar
                      const lastPaidIndex = expense.payments.reduce((maxIdx, payment, idx) => 
                        payment.status === "paid" ? idx : maxIdx, -1);
                      
                      if (dueIndex <= lastPaidIndex + 1) return null;
                      
                      const prevPaymentIndex = dueIndex - 1;
                      const segmentWidth = `calc(100% / ${expense.payments.length - 1})`;
                      const leftPosition = `calc(${prevPaymentIndex} * ${segmentWidth})`;
                      
                      return (
                        <div
                          className="h-1.5 absolute top-0 bg-red-300"
                          style={{
                            left: leftPosition,
                            width: segmentWidth,
                            zIndex: 6
                          }}
                        />
                      );
                    })()} 
                  </div>
                  
                  {/* Time indicators (dots) */}
                  <div className="relative flex justify-between mt-5 pt-3"> {/* Increased top margin and padding */}
                    {expense.payments.map((payment, idx) => (
                      <div key={idx} className="flex flex-col items-center group relative">
                        {/* Tooltip/Mini Window on Hover */}
                        <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className="bg-popover border rounded-md shadow-md p-2 w-48 text-sm">
                            <div className="mb-1 font-medium">{expense.name}</div>
                            <div className="flex justify-between mb-1">
                              <span className="text-muted-foreground">Due Date:</span>
                              <span>{payment.month} {payment.date}, {payment.month === "Jan" || payment.month === "Feb" || payment.month === "Mar" ? "2025" : "2024"}</span>
                            </div>
                            <div className="flex justify-between mb-1">
                              <span className="text-muted-foreground">Amount:</span>
                              <span>${expense.amount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status:</span>
                              <span className={cn(
                                payment.status === "paid" ? "text-green-500" :
                                payment.status === "due" ? "text-red-500" :
                                "text-muted-foreground"
                              )}>
                                {payment.status === "paid" ? "Paid" : 
                                 payment.status === "due" ? "Due Now" : "Upcoming"}
                              </span>
                            </div>
                            {payment.status !== "paid" && (
                              <div className="flex justify-between mt-1 pt-1 border-t">
                                <span className="text-muted-foreground">Time remaining:</span>
                                <span>
                                  {(() => {
                                    const dueDate = getMonthDate(payment.month, payment.date);
                                    const daysRemaining = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
                                    return daysRemaining > 0 ? `${daysRemaining} days` : "Overdue";
                                  })()}
                                </span>
                              </div>
                            )}
                            {/* Triangle pointer at bottom */}
                            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-t-[6px] border-t-popover border-r-[6px] border-r-transparent"></div>
                          </div>
                        </div>
                        
                        {/* The dot */}
                        <div className={cn(
                          "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border text-xs transition-all duration-200",
                          "cursor-pointer hover:scale-110",
                          payment.status === "paid" ? "border-green-500 bg-green-500 text-white" :
                          payment.status === "due" ? "border-red-500 bg-red-500 text-white" :
                          "border-muted-foreground bg-background text-muted-foreground hover:border-primary"
                        )}>
                          {payment.status === "paid" ? "✓" : payment.status === "due" ? "!" : ""}
                        </div>
                        <span className="mt-1.5 text-xs font-medium">{payment.month}</span>
                        <span className="text-[10px] text-muted-foreground">{payment.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Income vs. Expenses</CardTitle>
          <CardDescription>Monthly comparison for the past year</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incomeExpensesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>By category for current month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {expenseBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Savings Growth</CardTitle>
          <CardDescription>Year-to-date progress</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="savings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Last 5 transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <ShoppingCart className="h-4 w-4 text-primary" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Grocery Store</p>
                <p className="text-xs text-muted-foreground">Mar 28, 2025</p>
              </div>
              <div className="ml-auto font-medium text-red-500">-$85.40</div>
            </div>
            <div className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Salary Deposit</p>
                <p className="text-xs text-muted-foreground">Mar 25, 2025</p>
              </div>
              <div className="ml-auto font-medium text-green-500">+$3,500.00</div>
            </div>
            <div className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Restaurant</p>
                <p className="text-xs text-muted-foreground">Mar 24, 2025</p>
              </div>
              <div className="ml-auto font-medium text-red-500">-$64.20</div>
            </div>
            <div className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <ShoppingCart className="h-4 w-4 text-primary" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Online Shopping</p>
                <p className="text-xs text-muted-foreground">Mar 22, 2025</p>
              </div>
              <div className="ml-auto font-medium text-red-500">-$124.99</div>
            </div>
            <div className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Utility Bill</p>
                <p className="text-xs text-muted-foreground">Mar 20, 2025</p>
              </div>
              <div className="ml-auto font-medium text-red-500">-$142.50</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
