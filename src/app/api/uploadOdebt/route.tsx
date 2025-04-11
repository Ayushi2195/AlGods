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
            where: { clerkId: userId },
        });

        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const {
            LenderName,
            lender_phoneNumaber,
            lender_location,
            collateral,
            asset_type,
            quantity,
            asset_value,
            SupportingFiles,
        } = await req.json();

        // Validate required fields
        if (
            !LenderName ||
            !lender_phoneNumaber ||
            !lender_location ||
            !collateral ||
            !asset_type ||
            !quantity ||
            !asset_value
        ) {
            return NextResponse.json(
                { error: "All required fields must be provided" },
                { status: 400 }
            );
        }

        // Get or create Financial Profile
        let financeProfile = await prisma.financialProfile.findUnique({
            where: {
                user_id: existingUser.id,
            },
        });

        if (!financeProfile) {
            financeProfile = await prisma.financialProfile.create({
                data: {
                    user_id: existingUser.id,
                    monthly_income: 0,
                    average_expenditure_per_month: 0,
                    gold_loans: [],
                },
            });
        }


        const newOtherDebt = await prisma.otherDebt.create({
            data: {
                user_id: existingUser.id,
                financialProfileId: financeProfile.id,
                LenderName,
                lender_phoneNumaber,
                lender_location,

                asset_type,
                quantity,
                asset_value,

            },
        });

        return NextResponse.json(
            { message: "Other debt added successfully", otherDebt: newOtherDebt },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error adding other debt:", error);
        return NextResponse.json(
            {
                error: "Failed to add other debt",
                details: error.message,
            },
            { status: 500 }
        );
    }
}
