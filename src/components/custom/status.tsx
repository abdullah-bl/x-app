import { getStatusBySeq } from "~/data/status"
import { Badge } from "../ui/badge"

export default async function StatusPreview({ seq }: { seq: number }) {
  const status = await getStatusBySeq(seq)
  return <Badge variant={"outline"}>{status ? status.name : "Unknown"}</Badge>
}
