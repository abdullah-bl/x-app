"use client"

import { useActionState, useEffect } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { uploadFile } from "~/actions/upload"
import { toast } from "sonner"

export function UploadFile({
  targetId,
  targetName,
}: {
  targetId: string
  targetName: "project" | "payment"
}) {
  const [state, dispatch] = useActionState(uploadFile, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (state?.success) {
      console.log(state.message)
      toast.success(state.message)
    } else if (state?.message) {
      console.error(state.message)
      toast.error(state.message, {
        description: state.details.response?.data?.url?.message,
      })
    }
  }, [state])

  return (
    <form className="grid gap-2 border rounded-lg p-4" action={dispatch}>
      <span className="font-medium text-md"> Upload File </span>
      <Label htmlFor="name">Name</Label>
      <Input
        type="text"
        name="name"
        id="name"
        placeholder="Write something..."
        required
      />
      <Label htmlFor="file">Upload File</Label>
      <Input
        type="file"
        name="file"
        id="file"
        required
        accept=".pdf,.docx,.xlsx,.xls,.doc,.txt,.csv,.ppt,.pptx"
      />
      <span className="text-xs text-zinc-500">
        <small>Only PDF, DOCX, and XLSX files are allowed</small>
      </span>
      <input type="hidden" name={targetName} value={targetId} />
      <Button type="submit" size={"sm"}>
        Upload
      </Button>
    </form>
  )
}
