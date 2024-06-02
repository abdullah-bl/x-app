"use client"

import { useActionState, useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { uploadFile } from "~/actions/upload"
import { toast } from "sonner"

export function UploadFile({ targetId }: { targetId: string }) {
  const [state, dispatch] = useActionState(uploadFile, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
    } else if (state?.message) {
      console.error(state.message)
      toast.error(state.message, {
        description: state.details.response?.data?.url?.message,
      })
    }
  }, [state])

  return (
    <form
      className="flex flex-col gap-2 rounded-md p-4 border sm:w-1/3 w-full"
      action={dispatch}
    >
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
      <input type="hidden" name="target_id" value={targetId} />
      <Button type="submit" size={"sm"}>
        Upload
      </Button>
    </form>
  )
}
