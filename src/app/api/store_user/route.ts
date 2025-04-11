import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

interface UserData {
    fullname: string;
    lastName?: string;
    username: string;
    role: string;
    mobile_number: string;
    country: string;
    bank_accounts: string[];
    loans?: string[];
    profile_info?: {
        age: string;
        gender: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Not authenticated");
        }

        // console.log("User ID api:", userId);


        const clerkUser = await currentUser();
        const email = clerkUser?.emailAddresses[0]?.emailAddress;

        if (!email) {
            return NextResponse.json({ error: "Email not found" }, { status: 400 });
        }

        const body: UserData = await request.json();
        const { fullname, username, mobile_number, country, bank_accounts } = body;
        const role = body.role || "User"; // Set default role if not provided

        if (!fullname || !username || !mobile_number || !country || !bank_accounts) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Username already exists" }, { status: 400 });
        }

        // Create user with the provided data
        const newUser = await prisma.user.create({
            data: {
                email,
                fullname,
                username,
                role,
                mobile_number,
                clerkId: userId,
                isAdmin: role !== "Student",
                country,
                signUpCompleted: true,
                bank_accounts: bank_accounts || [], // This now contains the profile info as JSON
                loans: body.loans || [], // Add loans data if provided
            },
        });

        if (!newUser) {
            return NextResponse.json({ error: "User not created" }, { status: 400 });
        }

        return NextResponse.json(
            { message: "User created successfully", user: newUser },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
