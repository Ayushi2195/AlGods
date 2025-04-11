import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

interface UserData {
    fullname: string;
    username: string;
    role: string;
    mobile_number: string;
    country: string;
    bank_accounts: string[];
}

export async function POST(request: NextRequest) {
    try {
        console.log("we are here")

        const { userId } = await auth();
        if (!userId) {
            throw new Error("Not authenticated");
        }

        const clerkUser = await currentUser();
        if (!clerkUser) {
            return NextResponse.json({ error: "Clerk user not found" }, { status: 400 });
        }

        console.log("Clerk user object:", clerkUser);

        const email = clerkUser?.emailAddresses?.[0]?.emailAddress;
        if (!email) {
            return NextResponse.json({ error: "Email not found in Clerk user object" }, { status: 400 });
        }

        const body: UserData = await request.json();
        const { fullname, username, mobile_number, country, bank_accounts } = body;


        if (
            !fullname ||
            !username ||

            !mobile_number ||
            !country ||
            !Array.isArray(bank_accounts)
        ) {
            return NextResponse.json({ error: "All fields are required and bank_accounts must be an array" }, { status: 400 });
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email },
                ],
            },
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
                mobile_number,

                country,
                bank_accounts,


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
