"use client"

import { createNote } from "~/actions/notes"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useActionState, useState } from "react"

const initialState = {
  success: false,
  message: "",
}

export default function CreateNoteForm() {
  const colors = ["red", "blue", "green", "yellow", "white", "black"]
  const [selectedColor, setSelectedColor] = useState("white")
  const [state, formAction] = useActionState(createNote, initialState)
  return (
    <form
      data-color={selectedColor}
      action={formAction}
      className="grid gap-2 border rounded-lg p-2 flex-1"
    >
      <div className="flex items-center gap-2 self-center justify-center">
        {colors.map((color) => (
          <span
            key={color}
            data-color={color}
            className={` ${
              selectedColor === color ? "border-2 border-black" : "border"
            }  rounded-full h-4 w-4`}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
      <Textarea
        name="content"
        required
        autoCapitalize="on"
        autoComplete="on"
        autoCorrect="on"
        autoFocus
        placeholder="Write a note..."
      />
      <p aria-live="polite" className="sr-only">
        {state?.message || "Note created successfully"}
      </p>
      <Button type="submit" size={"sm"}>
        Create Note
      </Button>
    </form>
  )
}
