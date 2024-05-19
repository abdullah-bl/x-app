"use client"

import { Button } from "~/components/ui/button"
import { MagicWandIcon } from "@radix-ui/react-icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { useCallback, useEffect, useState } from "react"
import { summarizeContent } from "~/actions/ai"
import { readStreamableValue } from "ai/rsc"

export function MagicButton({ text }: { text: string }) {
  const [summarized, setSummarized] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  const summarize = useCallback(async () => {
    if (!text) return
    if (summarized) return
    const stream = await summarizeContent(text)
    for await (const content of readStreamableValue(stream)) {
      setSummarized(summarized + content)
    }
  }, [text, summarized])

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" onClick={summarize}>
          <MagicWandIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <p className="text-sm whitespace-pre-line">{summarized}</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
