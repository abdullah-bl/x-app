import client from "~/lib/client"

export const dynamic = "force-cache" // defaults to auto

export async function GET(request: Request) {
  try {
    const statuses = await client.collection("statuses").getFullList({
      sort: "seq",
      fields: "id,name,seq,description",
    })
    return new Response(
      JSON.stringify({
        statuses,
      }),
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
      })
    )
  }
}
