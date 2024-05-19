import client from "~/lib/client"

const getChat = async (id: string) => {
  try {
    return await client.collection("chats").getOne(id, {
      expand: "messages",
    })
  } catch (error) {
    return {}
  }
}

export default async function ChatPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const chat = await getChat(params.id)
  return (
    <div className="grid gap-4">
      <pre>{JSON.stringify(chat, null, 2)}</pre>
    </div>
  )
}
