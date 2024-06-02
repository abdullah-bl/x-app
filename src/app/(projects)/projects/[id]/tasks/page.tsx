import { CustomTextarea } from "~/components/custom/textarea"
import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"

export default async function ProjectBudgetsPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="flex gap-6 flex-wrap flex-1 p-2">
      <div className="flex flex-col w-1/3 gap-2">
        <h3 className="text-lg">Add Task</h3>
        <form className="grid gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea name="content" id="content" />
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div className="flex flex-col gap-2 flex-1 w-full">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">Tasks</h3>
          <span>Filter</span>
        </div>
        <div className="grid gap-2 p-2 rounded-lg border">
          <p>example of task</p>
        </div>
      </div>
    </div>
  )
}
