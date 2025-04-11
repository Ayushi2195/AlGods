// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//     try {
//         const { userId } = await auth();

//         if (!userId) {
//             return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//         }

//         const existingUser = await prisma.user.findUnique({
//             where: {
//                 clerkId: userId,
//             },
//         });

//         if (!existingUser) {
//             return NextResponse.json({ error: "User not found" }, { status: 404 });
//         }

//         const {
//             amount,
//             interest_rate,
//             tenure_months,
//             start_date,
//             end_date,
//             loan_type,
//             organization,
//             status, ///  it will obviously present
//             remarks,
//         } = await req.json();


//         if (
//             !amount ||
//             !interest_rate ||
//             !tenure_months ||
//             !start_date ||
//             !end_date ||
//             !loan_type ||
//             !organization
//         ) {
//             return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 });
//         }

//         const newLoan = await prisma.loan.create({
//             data: {
//                 user_id: existingUser.id,
//                 amount,
//                 interest_rate,
//                 tenure_months,
//                 start_date: new Date(start_date),
//                 end_date: new Date(end_date),
//                 loan_type,
//                 organization,
//                 status,
//                 remarks,
//                 financialProfileId,
//             },
//         });

//         return NextResponse.json(
//             { message: "Loan uploaded successfully", loan: newLoan },
//             { status: 201 }
//         );
//     } catch (error: any) {
//         console.error("Error uploading loan:", error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }



import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                clerkId: userId,
            },
        });

        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const {
            amount,
            interest_rate,
            tenure_months,
            start_date,
            end_date,
            loan_type,
            organization,
            status,
            remarks,

        } = await req.json();

        if (
            !amount ||
            !interest_rate ||
            !tenure_months ||
            !start_date ||
            !end_date ||
            !loan_type ||
            !organization
        ) {
            return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 });
        }

        const financeProfilecheck = await prisma.financialProfile.findUnique({
            where: {
                user_id: existingUser.id,
            },
        })
        let finance_id;
        if (financeProfilecheck) {
            finance_id = financeProfilecheck.id;
        }
        else {
            const newFinancialProfile = await prisma.financialProfile.create({
                data: {
                    user_id: existingUser.id,
                    monthly_income: 0,
                    average_expenditure_per_month: 0,
                    gold_loans: [],

                },
            });

            if (!newFinancialProfile) {
                return NextResponse.json({ error: "Error creating financial profile" }, { status: 500 });
            }
            finance_id = newFinancialProfile.id;
        }



        // Create the loan entry
        const newLoan = await prisma.loan.create({
            data: {
                user_id: existingUser.id,
                amount,
                interest_rate,
                tenure_months,
                start_date: new Date(start_date),
                end_date: new Date(end_date),
                loan_type,
                organization,
                status,
                remarks,
                financialProfileId: finance_id,
            },
        });

        // Calculate EMI amount (equal monthly installment)
        const monthlyRate = interest_rate / 100 / 12;
        const emiAmount =
            (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure_months)) /
            (Math.pow(1 + monthlyRate, tenure_months) - 1);

        // Create EMI entries
        const emis = [];
        const startDate = new Date(start_date);

        for (let i = 0; i < tenure_months; i++) {
            const dueDate = new Date(startDate);
            dueDate.setMonth(dueDate.getMonth() + i); // Add i months

            emis.push({
                amount: parseFloat(emiAmount.toFixed(2)),
                due_date: dueDate,
                loan_id: newLoan.id,
                user_id: existingUser.id,
            });
        }

        const emiResult = await prisma.emi.createMany({
            data: emis,
            skipDuplicates: true, // want to avoid inserting duplicates
        });

        if (emiResult.count !== emis.length) {
            return NextResponse.json(
                { message: "Error while creating EMI entry" },
                { status: 202 })
        }


        return NextResponse.json(
            { message: "Loan and EMIs created successfully", loan: newLoan },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error uploading loan and creating EMIs:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
