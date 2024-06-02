import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic" // defaults to auto

const end_point = process.env.POCKET_BASE_URL

export async function GET(request: Request) {
  const url = new URL(request.url)
  // http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME

  const collectionId = url.pathname.split("/")[3]
  const recordId = url.pathname.split("/")[4]
  const filename = url.pathname.split("/")[5]
  return redirect(
    `${end_point}/api/files/${collectionId}/${recordId}/${filename}?download=1`
  )
}
