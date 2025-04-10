import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/",
])

const isPublicApiRoute = createRouteMatcher([
    "/api/store_user"
])

const isOnboardingRoute = createRouteMatcher([
    "/onboarding"
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
    try {
        const { userId } = await auth();
        
        // Allow access to public routes without authentication
        if (isPublicRoute(req) || isPublicApiRoute(req)) {
            return NextResponse.next();
        }
        
        // If user is not authenticated and trying to access protected route, redirect to sign-in
        if (!userId) {
            return NextResponse.redirect(new URL('/sign-in', req.url));
        }
        
        // Check if user has already completed onboarding
        // Note: We can't directly access localStorage from middleware since it runs on the server
        // Instead, we'll check for a specific cookie that gets set after onboarding
        const onboardingCompleted = req.cookies.get('onboardingCompleted');
        
        // If this is a new user and they're not already on the onboarding page, redirect them
        if (!onboardingCompleted && !isOnboardingRoute(req)) {
            // We'll set a cookie to remember they've been redirected to onboarding
            const response = NextResponse.redirect(new URL('/onboarding', req.url));
            return response;
        }
        
        // User is authenticated and has completed onboarding, allow access to protected routes
        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};