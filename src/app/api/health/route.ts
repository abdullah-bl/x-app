import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import client from "~/lib/client"

export async function GET(request: Request) {
  return NextResponse.json(await client.health.check())
}
