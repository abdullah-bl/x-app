import { Separator } from "@radix-ui/react-dropdown-menu"
import Hero from "~/components/layout/hero"
import { Skeleton } from "~/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="grid gap-6 min-h-full">
      <div className="p-5 rounded-lg  flex items-center justify-center w-full  aspect-[5/1]">
        <div className="flex items-center justify-center space-x-4">
          <h3 className="text-2xl font-medium">
            <Skeleton className="h-6 w-[250px]" />
          </h3>
        </div>
      </div>
      {/* 
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 auto-cols-max grid-flow-row"></div>

      <div className="flex gap-4 flex-col sm:flex-row flex-wrap ">
        <div className="flex-1 flex flex-col gap-2">
          <div dir="auto" className="border rounded-md p-2 grid gap-1">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[250px]" />
              <span className="text-sm">
                <Skeleton className="h-4 w-[50px]" />
              </span>
            </div>
            <p className="text-sm text-zinc-500 whitespace-pre-wrap">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[150px]" />
            </p>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[40px]" />
              <span className="text-sm">
                <Skeleton className="h-4 w-[30px]" />
              </span>
            </div>
          </div>
        </div>
        <div className="sm:w-1/3 flex flex-col gap-2">
          <Skeleton className="h-4 w-[180px]" />
          <Separator className="my-4" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[93px]" />
        </div>
      </div> */}
    </div>
  )
}
