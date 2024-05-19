import { revalidatePath } from "next/cache"
import { getUserFromCookies } from "~/lib/auth"
import client from "~/lib/client"

export default function DeleteTaskForm({ taskId }: { taskId: string }) {
  async function deleteTask(formData: FormData) {
    "use server"
    try {
      const user = await getUserFromCookies()
      if (!user) throw new Error("Not authenticated")

      const data = Object.fromEntries(formData)
      await client.collection("tasks").delete(data.taskId as string)
      revalidatePath("/tasks")
    } catch (error) {
      console.error(error)
      throw new Error("Failed to delete task")
    }
  }
  return (
    <form action={deleteTask}>
      <input type="hidden" name="taskId" value={taskId} hidden />
      <button type="submit" className="text-red-500 text-sm">
        Delete
      </button>
    </form>
  )
}
