import { revalidatePath } from "next/cache"
import { getUserFromCookies } from "~/lib/auth"
import client from "~/lib/client"

export default function DeleteFileForm({
  fileId,
  projectId,
}: {
  fileId: string
  projectId: string
}) {
  async function deleteFile(formData: FormData) {
    "use server"
    try {
      const user = await getUserFromCookies()
      if (!user) throw new Error("Not authenticated")

      const data = Object.fromEntries(formData)
      await client.collection("files").delete(data.fileId as string)
      revalidatePath(`/projects/${projectId}/files`)
    } catch (error) {
      console.error(error)
      throw new Error("Failed to delete task")
    }
  }
  return (
    <form action={deleteFile}>
      <input type="hidden" name="fileId" value={fileId} hidden />
      <button type="submit" className="text-red-500 text-sm">
        Delete
      </button>
    </form>
  )
}
