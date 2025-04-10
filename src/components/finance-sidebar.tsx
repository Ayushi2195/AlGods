"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  CreditCard,
  DollarSign,
  HelpCircle,
  Home,
  LineChart,
  MessageSquare,
  PiggyBank,
  Settings,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function FinanceSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <DollarSign className="h-6 w-6 text-primary" />
            <span>FinanceWise</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/dashboard"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/investments"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/investments"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <PiggyBank className="h-4 w-4" />
              Investments
            </Link>
            <Link
              href="/advice"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/advice"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Advice
            </Link>
            <Link
              href="/transactions"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/transactions"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Transactions
            </Link>
            <Link
              href="/reports"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/reports"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Reports
            </Link>
            <Link
              href="/economic-trends"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/economic-trends"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <LineChart className="h-4 w-4" />
              Economic Trends
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <User className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Need Help?</p>
                <p className="text-xs text-muted-foreground">Contact our support team</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="w-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
