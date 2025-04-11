"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { DollarSign, ArrowRight, ArrowUpRight, LineChart, PiggyBank, TrendingUp, CheckCircle2, Plus, Trash2, Calendar } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface BankAccount {
  accountNumber: string;
}

interface Loan {
  amount: string;
  interestRate: string;
  duration: string;
  startDate: string;
  endDate: string;
  loanType: string;
  bankName: string;
  remarks: string;
  collateral: string;
  assetType: string;
  assetValue: string;
}

export default function OnboardingPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Track which page of the form we're on

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    mobile_number: "",
    country: "",
    bankAccounts: [{ accountNumber: "" }] as BankAccount[],
  });

  const [loans, setLoans] = useState<Loan[]>([
    {
      amount: "",
      interestRate: "",
      duration: "",
      startDate: "",
      endDate: "",
      loanType: "",
      bankName: "",
      remarks: "",
      collateral: "",
      assetType: "",
      assetValue: ""
    }
  ]);
  // Redirect if not signed in
  if (isLoaded && !isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBankAccountChange = (index: number, field: keyof BankAccount, value: string) => {
    setFormData((prev) => {
      const updatedAccounts = [...prev.bankAccounts];
      updatedAccounts[index] = {
        ...updatedAccounts[index],
        [field]: value
      };
      return {
        ...prev,
        bankAccounts: updatedAccounts
      };
    });
  };

  const addBankAccount = () => {
    setFormData((prev) => ({
      ...prev,
      bankAccounts: [...prev.bankAccounts, { accountNumber: "" }]
    }));
  };

  const removeBankAccount = (index: number) => {
    if (formData.bankAccounts.length <= 1) return; // Keep at least one bank account
    setFormData((prev) => ({
      ...prev,
      bankAccounts: prev.bankAccounts.filter((_, i) => i !== index)
    }));
  };

  const handleLoanChange = (index: number, field: keyof Loan, value: string) => {
    setFormData((prev) => {
      const updatedLoans = [...loans];
      updatedLoans[index] = {
        ...updatedLoans[index],
        [field]: value
      };
      return {
        ...prev,
        loans: updatedLoans
      };
    });
  };

  const addLoan = () => {
    setLoans((prevLoans) => [
      ...prevLoans,
      {
        amount: "",
        interestRate: "",
        duration: "",
        startDate: "",
        endDate: "",
        loanType: "",
        bankName: "",
        remarks: "",
        collateral: "",
        assetType: "",
        assetValue: ""
      }
    ]);
  };

  const removeLoan = (index: number) => {
    if (loans.length <= 1) return; // Keep at least one loan form
    setLoans((prevLoans) => prevLoans.filter((_, i) => i !== index));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    console.log("Next step function called");

    if (step === 1) {
      console.log("Current form data:", formData);

      if (!formData.fullname || !formData.username || !formData.mobile_number || !formData.country) {
        console.log("Missing required fields");
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }


      const invalidBankAccount = formData.bankAccounts.some(
        account => !account.accountNumber
      );

      if (invalidBankAccount) {
        console.log("Invalid bank account");
        toast({
          title: "Error",
          description: "Please fill in all bank account details",
          variant: "destructive",
        });
        return;
      }

      console.log("Moving to step 2");
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submission started");
    setLoading(true);

    try {
      const apiData = {
        fullname: formData.fullname,
        username: formData.username,
        mobile_number: formData.mobile_number,
        country: formData.country,
        bank_accounts: formData.bankAccounts.map(account => account.accountNumber), // now string[]
      };

      console.log("Submitting form data:", apiData);

      const response = await fetch(`${BASE_URL}/api/store_user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });
      console.log("API response status:", response);
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      console.log("API response:", responseData);



      // Show success message
      toast({
        title: "Success",
        description: "Your profile has been created successfully!",
      });

      // Set a cookie to mark onboarding as completed
      // This cookie will be checked by the middleware
      // document.cookie = "onboardingCompleted=true; path=/; max-age=31536000";

      // Force redirect to dashboard immediately
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Blurred Home Screen Background */}
      <div className="absolute inset-0 z-0">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 opacity-50">
          <div className="flex items-center gap-2 font-semibold">
            <DollarSign className="h-6 w-6 text-primary" />
            <span>FinFlow</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <span className="text-sm font-medium">Dashboard</span>
            <span className="text-sm font-medium">Investments</span>
            <span className="text-sm font-medium">Advice</span>
          </nav>
        </header>

        {/* Main Content - Blurred */}
        <main className="flex-1 filter blur-md">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Take Control of Your Financial Future
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      FinFlow helps you track your finances, manage expenses, and make smarter investment decisions.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background rounded-lg border p-6 shadow-sm">
                      <LineChart className="h-10 w-10 text-primary" />
                      <h3 className="mt-4 text-xl font-bold">Track Expenses</h3>
                      <p className="mt-2 text-muted-foreground">
                        Monitor your spending habits and identify areas to save.
                      </p>
                    </div>
                    <div className="bg-background rounded-lg border p-6 shadow-sm">
                      <PiggyBank className="h-10 w-10 text-primary" />
                      <h3 className="mt-4 text-xl font-bold">Save Smarter</h3>
                      <p className="mt-2 text-muted-foreground">
                        Set savings goals and track your progress over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Onboarding Form - Centered with backdrop filter */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
        <Toaster />
        <Card className="w-full max-w-4xl bg-white/95 backdrop-blur-sm shadow-xl border-0 max-h-[90vh] overflow-auto">
          <CardHeader className="bg-white/90 rounded-t-lg sticky top-0 z-10">
            <div className="flex justify-between items-center mb-2">
              <CardTitle className="text-2xl text-black">
                {step === 1 ? 'Complete Your Profile' : 'Optional: Loan Information'}
              </CardTitle>
              <div className="flex items-center space-x-1">
                <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
              </div>
            </div>
            <CardDescription className="text-gray-700">
              {step === 1
                ? 'Step 1: Personal Information (Required)'
                : 'Step 2: Loan Details (Optional)'}
            </CardDescription>
          </CardHeader>

          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); nextStep(); } : handleSubmit}>
            <CardContent className="space-y-6 bg-white/90 p-6">
              {step === 1 ? (

                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-800">Username *</Label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Choose a username"
                        className="bg-white text-gray-800 border-gray-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullname" className="text-gray-800">Full Name *</Label>
                      <Input
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="bg-white text-gray-800 border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="mobile_number" className="text-gray-800">Mobile Number *</Label>
                      <Input
                        id="mobile_number"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        placeholder="Enter your mobile number"
                        className="bg-white text-gray-800 border-gray-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-gray-800">Country *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => handleSelectChange("country", value)}
                        required
                      >
                        <SelectTrigger className="bg-white text-gray-800 border-gray-300">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-800">
                          <SelectItem value="india">India</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-800 text-lg font-medium">Bank Accounts *</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addBankAccount}
                        className="flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" /> Add Account
                      </Button>
                    </div>

                    {formData.bankAccounts.map((account, index) => (
                      <div key={index} className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Account #{index + 1}</h3>
                          {formData.bankAccounts.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBankAccount(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`account-number-${index}`} className="text-gray-800">Account Number</Label>
                            <Input
                              id={`account-number-${index}`}
                              value={account.accountNumber}
                              onChange={(e) => handleBankAccountChange(index, 'accountNumber', e.target.value)}
                              placeholder="Enter account number"
                              className="bg-white text-gray-800 border-gray-300"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                // Step 2: Loan Information (Optional)
                <>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Loan Information (Optional)</h2>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addLoan}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" /> Add Loan
                    </Button>
                  </div>

                  <p className="text-gray-600 text-sm">You can skip this section if you don't have any loans.</p>

                  {loans.map((loan, index) => (
                    <div key={index} className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Loan #{index + 1}</h3>
                        {loans.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLoan(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`loan-amount-${index}`} className="text-gray-800">Loan Amount</Label>
                          <Input
                            id={`loan-amount-${index}`}
                            value={loan.amount}
                            onChange={(e) => handleLoanChange(index, 'amount', e.target.value)}
                            placeholder="Enter loan amount"
                            className="bg-white text-gray-800 border-gray-300"
                            type="number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`interest-rate-${index}`} className="text-gray-800">Interest Rate (%)</Label>
                          <Input
                            id={`interest-rate-${index}`}
                            value={loan.interestRate}
                            onChange={(e) => handleLoanChange(index, 'interestRate', e.target.value)}
                            placeholder="Enter interest rate"
                            className="bg-white text-gray-800 border-gray-300"
                            type="number"
                            step="0.01"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`duration-${index}`} className="text-gray-800">Duration (months)</Label>
                          <Input
                            id={`duration-${index}`}
                            value={loan.duration}
                            onChange={(e) => handleLoanChange(index, 'duration', e.target.value)}
                            placeholder="Enter loan duration"
                            className="bg-white text-gray-800 border-gray-300"
                            type="number"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`start-date-${index}`} className="text-gray-800">Start Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                              id={`start-date-${index}`}
                              value={loan.startDate}
                              onChange={(e) => handleLoanChange(index, 'startDate', e.target.value)}
                              placeholder="YYYY-MM-DD"
                              className="bg-white text-gray-800 border-gray-300 pl-10"
                              type="date"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`end-date-${index}`} className="text-gray-800">End Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                              id={`end-date-${index}`}
                              value={loan.endDate}
                              onChange={(e) => handleLoanChange(index, 'endDate', e.target.value)}
                              placeholder="YYYY-MM-DD"
                              className="bg-white text-gray-800 border-gray-300 pl-10"
                              type="date"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`loan-type-${index}`} className="text-gray-800">Loan Type</Label>
                          <Select
                            value={loan.loanType}
                            onValueChange={(value) => handleLoanChange(index, 'loanType', value)}
                          >
                            <SelectTrigger className="bg-white text-gray-800 border-gray-300">
                              <SelectValue placeholder="Select loan type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-gray-800">
                              <SelectItem value="personal">Personal Loan</SelectItem>
                              <SelectItem value="home">Home Loan</SelectItem>
                              <SelectItem value="car">Car Loan</SelectItem>
                              <SelectItem value="education">Education Loan</SelectItem>
                              <SelectItem value="business">Business Loan</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`bank-name-${index}`} className="text-gray-800">Bank/Lender Name</Label>
                          <Input
                            id={`bank-name-${index}`}
                            value={loan.bankName}
                            onChange={(e) => handleLoanChange(index, 'bankName', e.target.value)}
                            placeholder="Enter bank or lender name"
                            className="bg-white text-gray-800 border-gray-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`remarks-${index}`} className="text-gray-800">Remarks</Label>
                        <Textarea
                          id={`remarks-${index}`}
                          value={loan.remarks}
                          onChange={(e) => handleLoanChange(index, 'remarks', e.target.value)}
                          placeholder="Any additional notes about this loan"
                          className="bg-white text-gray-800 border-gray-300 min-h-[80px]"
                        />
                      </div>

                      <Separator className="my-4" />

                      <h4 className="font-medium text-gray-800">Collateral Information</h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2 md:col-span-1">
                          <Label htmlFor={`collateral-${index}`} className="text-gray-800">Collateral</Label>
                          <Input
                            id={`collateral-${index}`}
                            value={loan.collateral}
                            onChange={(e) => handleLoanChange(index, 'collateral', e.target.value)}
                            placeholder="Describe the collateral"
                            className="bg-white text-gray-800 border-gray-300"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-1">
                          <Label htmlFor={`asset-type-${index}`} className="text-gray-800">Asset Type</Label>
                          <Select
                            value={loan.assetType}
                            onValueChange={(value) => handleLoanChange(index, 'assetType', value)}
                          >
                            <SelectTrigger className="bg-white text-gray-800 border-gray-300">
                              <SelectValue placeholder="Select asset type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-gray-800">
                              <SelectItem value="property">Property</SelectItem>
                              <SelectItem value="vehicle">Vehicle</SelectItem>
                              <SelectItem value="gold">Gold</SelectItem>
                              <SelectItem value="stocks">Stocks/Securities</SelectItem>
                              <SelectItem value="fixed-deposit">Fixed Deposit</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 md:col-span-1">
                          <Label htmlFor={`asset-value-${index}`} className="text-gray-800">Asset Value</Label>
                          <Input
                            id={`asset-value-${index}`}
                            value={loan.assetValue}
                            onChange={(e) => handleLoanChange(index, 'assetValue', e.target.value)}
                            placeholder="Enter asset value"
                            className="bg-white text-gray-800 border-gray-300"
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </CardContent>
            <CardFooter className="bg-white/90 rounded-b-lg flex justify-between sticky bottom-0 z-10 border-t border-gray-100 p-6">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="bg-white text-gray-800 border-gray-300"
                >
                  Back
                </Button>
              )}
              {step === 1 ? (
                <Button
                  type="button"
                  className="ml-auto bg-primary hover:bg-primary/90"
                  disabled={loading}
                  onClick={nextStep}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Complete Registration"}
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
