"use client"

import { useState } from "react"
import Link from "next/link"
import { Calculator, Calendar, ChevronDown, DollarSign, FileText, Plus, Receipt, Save } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

import { FinanceSidebar } from "@/components/finance-sidebar"

interface TaxItem {
  id: string
  name: string
  category: string
  amount: number
  dueDate: string
  status: "paid" | "due" | "upcoming"
  description?: string
}

interface TaxDeduction {
  id: string
  name: string
  category: string
  amount: number
  receiptUploaded: boolean
  description?: string
}

export default function TaxManagementPage() {
  const [selectedYear, setSelectedYear] = useState("2025")
  const { toast } = useToast()

  // Form states
  const [taxItemName, setTaxItemName] = useState("")
  const [taxItemCategory, setTaxItemCategory] = useState("")
  const [taxItemAmount, setTaxItemAmount] = useState("")
  const [taxItemDueDate, setTaxItemDueDate] = useState("")
  const [taxItemDescription, setTaxItemDescription] = useState("")

  const [deductionName, setDeductionName] = useState("")
  const [deductionCategory, setDeductionCategory] = useState("")
  const [deductionAmount, setDeductionAmount] = useState("")
  const [deductionDescription, setDeductionDescription] = useState("")

  // Sample tax items data
  const [taxItems, setTaxItems] = useState<TaxItem[]>([
    {
      id: "1",
      name: "Income Tax",
      category: "Income",
      amount: 25000,
      dueDate: "2025-07-31",
      status: "upcoming",
      description: "Annual income tax payment",
    },
    {
      id: "2",
      name: "Property Tax",
      category: "Property",
      amount: 12000,
      dueDate: "2025-04-15",
      status: "paid",
      description: "Annual property tax for residential property",
    },
    {
      id: "3",
      name: "GST Filing",
      category: "Business",
      amount: 8500,
      dueDate: "2025-05-20",
      status: "due",
      description: "Quarterly GST payment",
    },
  ])

  // Sample tax deductions data
  const [taxDeductions, setTaxDeductions] = useState<TaxDeduction[]>([
    {
      id: "1",
      name: "Home Loan Interest",
      category: "Housing",
      amount: 150000,
      receiptUploaded: true,
      description: "Interest paid on home loan",
    },
    {
      id: "2",
      name: "Health Insurance Premium",
      category: "Health",
      amount: 25000,
      receiptUploaded: true,
      description: "Annual health insurance premium",
    },
    {
      id: "3",
      name: "Education Loan Interest",
      category: "Education",
      amount: 35000,
      receiptUploaded: false,
      description: "Interest paid on education loan",
    },
  ])

  // Calculate tax statistics
  const totalTaxLiability = taxItems.reduce((sum, item) => sum + item.amount, 0)
  const totalTaxPaid = taxItems
    .filter(item => item.status === "paid")
    .reduce((sum, item) => sum + item.amount, 0)
  const totalTaxDue = taxItems
    .filter(item => item.status === "due")
    .reduce((sum, item) => sum + item.amount, 0)
  const totalDeductions = taxDeductions.reduce((sum, item) => sum + item.amount, 0)

  // Estimated tax savings (simplified calculation for demo)
  const estimatedTaxSavings = totalDeductions * 0.3

  const handleAddTaxItem = (e: React.FormEvent) => {
    e.preventDefault()
    const newTaxItem: TaxItem = {
      id: Date.now().toString(),
      name: taxItemName,
      category: taxItemCategory,
      amount: parseFloat(taxItemAmount),
      dueDate: taxItemDueDate,
      status: "upcoming",
      description: taxItemDescription,
    }

    setTaxItems([...taxItems, newTaxItem])
    toast({
      title: "Tax Item Added",
      description: `${taxItemName} has been added to your tax items.`,
    })

    // Reset form
    setTaxItemName("")
    setTaxItemCategory("")
    setTaxItemAmount("")
    setTaxItemDueDate("")
    setTaxItemDescription("")
  }

  const handleAddDeduction = (e: React.FormEvent) => {
    e.preventDefault()
    const newDeduction: TaxDeduction = {
      id: Date.now().toString(),
      name: deductionName,
      category: deductionCategory,
      amount: parseFloat(deductionAmount),
      receiptUploaded: false,
      description: deductionDescription,
    }

    setTaxDeductions([...taxDeductions, newDeduction])
    toast({
      title: "Deduction Added",
      description: `${deductionName} has been added to your tax deductions.`,
    })

    // Reset form
    setDeductionName("")
    setDeductionCategory("")
    setDeductionAmount("")
    setDeductionDescription("")
  }

  const handleMarkAsPaid = (id: string) => {
    setTaxItems(
      taxItems.map(item =>
        item.id === id ? { ...item, status: "paid" } : item
      )
    )
    toast({
      title: "Tax Item Updated",
      description: "Tax item has been marked as paid.",
    })
  }

  const handleUploadReceipt = (id: string) => {
    setTaxDeductions(
      taxDeductions.map(item =>
        item.id === id ? { ...item, receiptUploaded: true } : item
      )
    )
    toast({
      title: "Receipt Uploaded",
      description: "Receipt has been uploaded successfully.",
    })
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <FinanceSidebar />
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Link href="/dashboard" className="lg:hidden">
            <DollarSign className="h-6 w-6" />
            <span className="sr-only">Dashboard</span>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Tax Management</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto flex gap-1">
                {selectedYear}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Tax Year</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedYear("2023")}>2023</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedYear("2024")}>2024</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedYear("2025")}>2025</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Tax Liability</CardDescription>
                <CardTitle className="text-2xl">₹{totalTaxLiability.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">For FY {selectedYear}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Tax Paid</CardDescription>
                <CardTitle className="text-2xl text-green-600">₹{totalTaxPaid.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {((totalTaxPaid / totalTaxLiability) * 100).toFixed(1)}% of total liability
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Tax Due</CardDescription>
                <CardTitle className="text-2xl text-red-600">₹{totalTaxDue.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {((totalTaxDue / totalTaxLiability) * 100).toFixed(1)}% of total liability
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Estimated Tax Savings</CardDescription>
                <CardTitle className="text-2xl text-blue-600">₹{estimatedTaxSavings.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Based on current deductions</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="tax-items" className="mt-6">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="tax-items">Tax Items</TabsTrigger>
              <TabsTrigger value="deductions">Deductions & Savings</TabsTrigger>
            </TabsList>
            <TabsContent value="tax-items" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Tax Items</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex gap-1">
                      <Plus className="h-4 w-4" />
                      Add Tax Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Tax Item</DialogTitle>
                      <DialogDescription>
                        Add a new tax item to track your tax liabilities.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddTaxItem}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="tax-name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="tax-name"
                            value={taxItemName}
                            onChange={(e) => setTaxItemName(e.target.value)}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="tax-category" className="text-right">
                            Category
                          </Label>
                          <Select
                            value={taxItemCategory}
                            onValueChange={setTaxItemCategory}
                            required
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Income">Income Tax</SelectItem>
                              <SelectItem value="Property">Property Tax</SelectItem>
                              <SelectItem value="Business">Business Tax</SelectItem>
                              <SelectItem value="GST">GST</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="tax-amount" className="text-right">
                            Amount (₹)
                          </Label>
                          <Input
                            id="tax-amount"
                            type="number"
                            value={taxItemAmount}
                            onChange={(e) => setTaxItemAmount(e.target.value)}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="tax-due-date" className="text-right">
                            Due Date
                          </Label>
                          <Input
                            id="tax-due-date"
                            type="date"
                            value={taxItemDueDate}
                            onChange={(e) => setTaxItemDueDate(e.target.value)}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="tax-description" className="text-right">
                            Description
                          </Label>
                          <Textarea
                            id="tax-description"
                            value={taxItemDescription}
                            onChange={(e) => setTaxItemDescription(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Tax Item</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Tax Payment Timeline - Similar to the EMI progress bar in finance-dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle>Tax Payment Timeline</CardTitle>
                  <CardDescription>Track your tax payment status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {taxItems.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{item.amount.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">
                              Due: {new Date(item.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        {/* Payment status indicator */}
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${item.status === 'paid' ? 'bg-green-500' : item.status === 'due' ? 'bg-red-500' : 'bg-gray-400'}`}
                              style={{ width: item.status === 'paid' ? '100%' : '0%' }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${item.status === 'paid' ? 'text-green-600' : item.status === 'due' ? 'text-red-600' : 'text-gray-600'}`}>
                            {item.status === 'paid' ? 'Paid' : item.status === 'due' ? 'Due' : 'Upcoming'}
                          </span>
                        </div>
                        
                        {item.status !== 'paid' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => handleMarkAsPaid(item.id)}
                          >
                            Mark as Paid
                          </Button>
                        )}
                        <Separator className="mt-4" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="deductions" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Tax Deductions</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex gap-1">
                      <Plus className="h-4 w-4" />
                      Add Deduction
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Tax Deduction</DialogTitle>
                      <DialogDescription>
                        Add a new tax deduction to maximize your tax savings.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddDeduction}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="deduction-name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="deduction-name"
                            value={deductionName}
                            onChange={(e) => setDeductionName(e.target.value)}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="deduction-category" className="text-right">
                            Category
                          </Label>
                          <Select
                            value={deductionCategory}
                            onValueChange={setDeductionCategory}
                            required
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Housing">Housing</SelectItem>
                              <SelectItem value="Health">Health Insurance</SelectItem>
                              <SelectItem value="Education">Education</SelectItem>
                              <SelectItem value="Investment">Investments</SelectItem>
                              <SelectItem value="Donation">Donations</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="deduction-amount" className="text-right">
                            Amount (₹)
                          </Label>
                          <Input
                            id="deduction-amount"
                            type="number"
                            value={deductionAmount}
                            onChange={(e) => setDeductionAmount(e.target.value)}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="deduction-description" className="text-right">
                            Description
                          </Label>
                          <Textarea
                            id="deduction-description"
                            value={deductionDescription}
                            onChange={(e) => setDeductionDescription(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Deduction</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Deductions & Savings</CardTitle>
                  <CardDescription>Track your eligible tax deductions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {taxDeductions.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{item.amount.toLocaleString()}</p>
                            <p className="text-sm text-green-600">
                              Est. Savings: ₹{(item.amount * 0.3).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm">{item.description}</p>
                          {item.receiptUploaded ? (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                              <FileText className="h-3 w-3 mr-1" />
                              Receipt Uploaded
                            </span>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs"
                              onClick={() => handleUploadReceipt(item.id)}
                            >
                              <Receipt className="h-3 w-3 mr-1" />
                              Upload Receipt
                            </Button>
                          )}
                        </div>
                        <Separator className="mt-4" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tax Saving Recommendations</CardTitle>
                  <CardDescription>Personalized tax saving opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-blue-50">
                      <div className="flex items-start gap-4">
                        <Calculator className="h-10 w-10 text-blue-600" />
                        <div>
                          <h3 className="font-medium">Maximize Section 80C Deductions</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            You can save up to ₹46,800 more in taxes by investing an additional ₹1,50,000 in tax-saving instruments like ELSS, PPF, or NPS.
                          </p>
                          <Button variant="link" className="px-0 mt-2 h-auto">
                            Explore Investment Options
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-green-50">
                      <div className="flex items-start gap-4">
                        <Save className="h-10 w-10 text-green-600" />
                        <div>
                          <h3 className="font-medium">Health Insurance Premium</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Increase your health insurance coverage to claim additional deductions under Section 80D and save up to ₹15,600 in taxes.
                          </p>
                          <Button variant="link" className="px-0 mt-2 h-auto">
                            Compare Health Insurance Plans
                          </Button>
                        </div>
                      </div>
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
