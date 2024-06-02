import Link from "next/link"
import DeleteFileForm from "~/components/forms/delete-file"
import { UploadFile } from "~/components/forms/upload-file"

import { getFiles } from "~/data/files"
import { formatDate } from "~/lib/utils"

export default async function ProjectFilesPage({
  params,
}: {
  params: { id: string }
}) {
  const files = await getFiles(`project-${params.id}`)
  return (
    <div className="grid gap-4 rounded-lg p-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium">Files ({files.length})</h3>
        <p className="text-foreground">here are the files for this project</p>
      </div>

      <div className="flex gap-4 flex-wrap items-start">
        <div className="flex flex-col gap-2 flex-1">
          {files.length === 0 && (
            <div className="text-foreground">No files uploaded yet!</div>
          )}
          {files.map((doc) => (
            <div
              className="grid gap-2 border rounded-lg p-2"
              key={doc.id}
              dir="auto"
            >
              <div className="flex items-center justify-between">
                <Link href={`/api/files/files/${doc.id}/${doc.url}`}>
                  {doc.name}
                </Link>
                <span className="text-sm">
                  {formatDate(new Date(doc.created))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <Link href={`/users/${doc.owner}`} className="text-sm">
                  {doc.expand?.owner.name}
                </Link>
                <div className="flex gap-2">
                  <Link
                    href={`/api/files/files/${doc.id}/${doc.url}`}
                    className="text-sm items-center flex"
                  >
                    Download
                  </Link>
                  <DeleteFileForm fileId={doc.id} projectId={doc.project} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <UploadFile targetId={`project-${params.id}`} />
      </div>
    </div>
  )
}
