"use client"

// inline suggestion autocomplete for textarea
// show suggestions when user types @
// fetch suggestions from server
// show suggestions in a dropdown
// select suggestion with arrow keys
// select suggestion with mouse click
// replace suggestion with selected suggestion
// close dropdown when suggestion is selected
// close dropdown when user clicks outside

import { useState } from "react"
import { Textarea } from "../ui/textarea"
import { continueConversation, continueWriting } from "~/actions/ai"
import { readStreamableValue } from "ai/rsc"

export function CustomTextarea({
  value = "",
  suggestions = [],
  placeholder,
  setValue,
  name,
}: {
  name?: string
  suggestions?: string[]
  placeholder?: string
  defaultValue?: string
  value: string
  setValue: (value: string) => void
}) {
  const [selected, setSelected] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  let keys = {} as any
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "@") {
      setShowSuggestions(true)
    }
    console.log(e.key)

    keys[e.key] = true
    if (keys["Control"] && keys["Shift"] && e.key === "Enter") {
      e.preventDefault()
      console.log("Control + Shift + Enter")
      const result = await continueWriting(e.currentTarget.value + "\n")
      setValue("")
      for await (const content of readStreamableValue(result)) {
        setValue(value + content)
      }
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    keys[e.key] = false
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const handleSelect = (suggestion: string) => {
    setValue(value + suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className=" relative ">
      <Textarea
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        className="border rounded-lg p-2 w-full"
        name={name}
      />
      <span className={`text-xs ${value.length >= 1500 ? "text-red-500" : ""}`}>
        Maximum Character Count: {value.length} / 1500
      </span>
      {showSuggestions && (
        <div className=" relative border rounded-lg shadow-sm grid gap-1 p-2">
          {suggestions.map((suggestion, i) => (
            <span
              key={suggestion}
              onClick={() => handleSelect(suggestion)}
              className={selected === i ? "bg-gray-200" : ""}
            >
              @{suggestion}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
