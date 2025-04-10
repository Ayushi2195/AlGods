import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

interface UserData {
    fullname: string;
    lastName: string;
    username: string;
    role: string;
    mobile_number: string;
    country: string;
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
        const { fullname, username, role, mobile_number, country } = body;

        if (!fullname || !username || !role || !mobile_number || !country) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Username already exists" }, { status: 400 });
        }

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
        return NextResponse.json(
            { error: `Error occurred: ${error.message}` },
            { status: 500 }
        );
    }
}
