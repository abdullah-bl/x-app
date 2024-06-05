import { Status } from "~/types"

export default async function StatusPreview({
  status,
}: {
  status: Status | undefined
}) {
  return status ? (
    <div className=" flex items-center gap-2 ">
      <span
        className="w-3 h-3 rounded-full"
        style={{ background: status.color }}
      />
      <span className="text-sm">{status.name}</span>
    </div>
  ) : (
    "N/A"
  )
}
