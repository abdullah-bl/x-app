"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div className="grid gap-1 border rounded-lg p-4 place-items-center h-full place-content-center">
      <h3 className="font-bold">Something went wrong!</h3>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
