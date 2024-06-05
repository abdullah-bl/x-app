import Link from "next/link"
import CustomLink from "~/components/custom/link"

export default function ProjectSettingLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      <nav className="flex flex-col gap-2 px-2 w-full md:w-1/6">
        <h3 className="font-bold text-lg">Settings </h3>
        <ul className="flex flex-col gap-1 md:w-full">
          <CustomLink href={`/projects/${params.id}/settings`}>
            General
          </CustomLink>
          <CustomLink href={`/projects/${params.id}/settings/members`}>
            Members
          </CustomLink>
          <CustomLink href={`/projects/${params.id}/settings/statuses`}>
            Statuses
          </CustomLink>
          <CustomLink href={`/projects/${params.id}/settings/changes`}>
            Changes
          </CustomLink>
        </ul>
      </nav>
      <div className="flex-1 p-1">{children}</div>
    </div>
  )
}
