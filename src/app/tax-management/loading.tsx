import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-8 w-24" />
        </header>
        <main className="flex-1 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array(4).fill(null).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 flex flex-col space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-28" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Skeleton className="h-10 w-full mb-4" />
            <div className="space-y-4">
              {Array(3).fill(null).map((_, i) => (
                <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <Skeleton className="h-6 w-48 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <div className="space-y-4">
                      {Array(3).fill(null).map((_, j) => (
                        <div key={j} className="space-y-2">
                          <div className="flex justify-between">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-5 w-24" />
                          </div>
                          <Skeleton className="h-2 w-full" />
                          <Skeleton className="h-8 w-24" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
