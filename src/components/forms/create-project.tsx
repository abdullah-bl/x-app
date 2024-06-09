"use client"

import { createProject } from "~/actions/projects"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useActionState, useEffect, useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { MagicWandIcon } from "@radix-ui/react-icons"
import { readStreamableValue } from "ai/rsc"
import { generateContent } from "~/actions/ai"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { TenderType } from "../custom/tenderType"

const initialState = {
  success: false,
  message: "",
}

export default function CreateProjectForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [state, formAction] = useActionState(createProject, initialState)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      setName("")
      setDescription("")
    } else if (state?.message) {
      toast.error(state.message)
    }
  }, [state])

  const generateDescription = async () => {
    setDescription("\n")
    const result = await generateContent(
      `.
       ${name} اكتب وصف مختصر للمشروع
        لا تزيد عن 255 حرف
      `,
      "استخدم اللغة العربية فقط!",
      "llama3"
    )
    for await (const content of readStreamableValue(result)) {
      setDescription(description + content)
    }
  }

  return (
    <form action={formAction} className="grid gap-4 rounded-lg p-2 flex-1">
      <div className="grid gap-1">
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          id="name"
          required
          autoFocus
          placeholder="Write a project name..."
          min={5}
          max={255}
          pattern=".{5,255}"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="grid gap-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="description">Description</Label>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            title="Generate a short description"
            onClick={generateDescription}
            disabled={name.trim().length < 5}
          >
            <MagicWandIcon />
          </Button>
        </div>
        <Textarea
          name="description"
          id="description"
          autoCapitalize="on"
          autoComplete="on"
          autoCorrect="on"
          placeholder="Write a description..."
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex items-center  flex-wrap gap-2">
        <div className="grid gap-1">
          <Label htmlFor="cost">Cost</Label>
          <Input
            name="cost"
            id="cost"
            type="number"
            required
            defaultValue={0.0}
            placeholder="0"
            min={0.0}
            step={0.01}
            prefix="SAR"
          />
          <span className="text-xs text-zinc-500">Estimated cost</span>
        </div>
        <div className="grid gap-1">
          <Label htmlFor="duration">Duration</Label>
          <Input
            name="duration"
            id="duration"
            type="number"
            required
            defaultValue={0}
            placeholder="0"
            min={0}
            pattern=""
          />
          <span className="text-xs text-zinc-500">Estimated duration</span>
        </div>
      </div>
      <div className="grid gap-2 max-w-xs">
        <Label htmlFor="tender_type">Tender Type</Label>
        <TenderType />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="tags">Tags</Label>
        <Input
          name="tags"
          id="tags"
          placeholder="Add tags..."
          // comma separated tags
          pattern="^([a-zA-Z0-9]+,)*[a-zA-Z0-9]+$"
        />
        <span className="text-xs text-zinc-500">
          Add tags separated by commas
        </span>
      </div>

      <p aria-live="polite" className="sr-only">
        {state?.message || "Note created successfully"}
      </p>
      <div className="flex items-center gap-4">
        <Button type="submit" size={"sm"}>
          Create Project
        </Button>
        <Button type="reset" size={"sm"} variant={"outline"}>
          Reset
        </Button>
      </div>
    </form>
  )
}
