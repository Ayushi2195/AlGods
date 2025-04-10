import Link from "next/link"
import { ArrowRight, ArrowUpRight, DollarSign, LineChart, PiggyBank, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <DollarSign className="h-6 w-6 text-primary" />
          <span>FinFlow</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <Link href="/investments" className="text-sm font-medium hover:underline underline-offset-4">
            Investments
          </Link>
          <Link href="/advice" className="text-sm font-medium hover:underline underline-offset-4">
            Advice
          </Link>
        </nav>
        <Button size="sm">Sign In</Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Take Control of Your Financial Future
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Track your income, manage expenses, and get personalized investment advice all in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button size="lg" className="gap-1.5">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/advice">
                    <Button size="lg" variant="outline" className="gap-1.5">
                      Get Financial Advice
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <img
                  src="/placeholder.svg?height=550&width=450"
                  alt="Financial Dashboard Preview"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  width={550}
                  height={450}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your finances effectively
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <LineChart className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Income & Expense Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Monitor your income and expenses in real-time with intuitive dashboards and reports.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Economic Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Stay informed with the latest economic trends and market insights to make better financial
                    decisions.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/trends">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <PiggyBank className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Investment Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get personalized investment recommendations based on your financial goals and risk tolerance.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/investments">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-muted-foreground">© 2025 FinanceWise. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
