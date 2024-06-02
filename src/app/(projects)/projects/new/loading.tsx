import { Skeleton } from "~/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="w-full flex gap-4 flex-wrap p-2">
      <div className="w-1/1 text-sm md:w-1/3 w-full flex flex-col gap-2 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900">
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-3 w-[80px]" />
        <div className="flex items-center gap-2">
          <span className="text-sx">
            <Skeleton className="h-6 w-[50px]" />
          </span>
          <span className="text-xs">
            <Skeleton className="h-4 w-[1300px]" />
          </span>
        </div>
      </div>
      <Skeleton className="h-6 w-[250px]" />
      <Skeleton className="h-6 w-[230px]" />
      <Skeleton className="h-6 w-[220px]" />
      <Skeleton className="h-6 w-[210px]" />
    </div>
  )
}
