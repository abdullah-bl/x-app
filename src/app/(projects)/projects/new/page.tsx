import { MagicWandIcon } from "@radix-ui/react-icons"
import { Suspense } from "react"
import { Back } from "~/components/custom/back"
import CreateProjectForm from "~/components/forms/create-project"
import Container from "~/components/layout/container"
import { PageHeader } from "~/components/layout/header"
import { Skeleton } from "~/components/ui/skeleton"

export default function NewProjectPage() {
  return (
    <Container>
      <PageHeader showBackButton title="New Project" />
      <div className="flex gap-2 flex-wrap">
        <CreateProjectForm />

        <div className="w-1/1 text-sm md:w-1/4 w-full flex flex-col gap-2 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900">
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
      </div>
    </Container>
  )
}
