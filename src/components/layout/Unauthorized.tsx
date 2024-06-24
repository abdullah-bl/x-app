import Link from "next/link"

export default function Unauthorized() {
  return (
    <div className="grid place-items-center justify-center min-h-screen">
      <div className="grid gap-2">
        <h1 className="text-4xl font-semibold text-center">Unauthorized</h1>
        <p className="text-center">You are not authorized to view this page</p>
        <Link
          href="/"
          className="uppercase hover:underline font-medium hover:font-bold transition-all duration-100"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
