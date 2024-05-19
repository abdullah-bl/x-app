import Link from "next/link"
import client from "~/lib/client"

const getChats = async () => {
  try {
    return await client.collection("chats").getFullList({
      sort: "-updated",
    })
  } catch (error) {
    return []
  }
}

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const chats = await getChats()
  return (
    <div className="flex gap-4 min-h-full">
      <div className="w-1/4 p-2">
        <button className="w-full p-2">New Chat</button>
        <div className="flex flex-col gap-2">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              {chat.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1 p-2 h-full">{children}</div>
    </div>
  )
}
