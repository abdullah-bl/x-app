import { MagicWandIcon } from "@radix-ui/react-icons"
import { Suspense } from "react"
import { Back } from "~/components/custom/back"
import CreateProjectForm from "~/components/forms/create-project"
import { Skeleton } from "~/components/ui/skeleton"

export default function NewProjectPage() {
  return (
    <div className="w-full flex gap-4 flex-wrap p-2">
      <div className="w-1/1 text-sm md:w-1/4 w-full flex flex-col gap-2 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900">
        <Back />
        <h3>Instructions:</h3>
        <p>Fill out the form</p>
        <div className="flex items-center gap-2">
          <span className="text-sx">
            <MagicWandIcon />
          </span>
          <span className="text-xs">
            Click the magic wand to generate a description use AI
          </span>
        </div>
      </div>
      <Suspense fallback={<Skeleton className="h-6 w-[250px]" />}>
        <CreateProjectForm />
      </Suspense>
    </div>
  )
}
