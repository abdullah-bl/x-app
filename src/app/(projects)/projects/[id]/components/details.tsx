import { formatDate } from "~/lib/utils"
import UpdateProjectDetails from "~/components/forms/update-tender"
import { Project } from "~/types"
import { formatDistance } from "date-fns"

export default async function Details({ project }: { project: Project }) {
  const { submissionDate, openingDate, startDate, duration } = project
  const expectedEndDate = () => {
    if (startDate && duration) {
      const date = new Date(startDate)
      date.setMonth(date.getMonth() + duration)
      return formatDate(date)
    }
    return "N/A"
  }
  return (
    <div className="grid gap-2 w-full">
      <div className="flex items-center justify-between ">
        <div className="grid gap-0">
          <h3 className="font-medium text-lg">تفاصيل المشروع</h3>
          <p className="text-sm text-zinc-500">
            .يمكنك تحديث البيانات الخاصة بالمشروع
          </p>
        </div>
        <UpdateProjectDetails project={project} />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 border rounded-md">
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">الرقم المختصر</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{project?.number || "N/A"}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">الرقم المرجعي</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{project?.reference || "N/A"}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">تاريخ الطرح</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.submissionDate)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">تاريخ فتح العروض</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.openingDate)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">المدة بين الطرح وفتح العروض</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>
            {project?.submissionDate && project.openingDate
              ? formatDistance(project?.submissionDate, project?.openingDate)
              : "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">تاريخ إشعار الترسية</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.awardedDate)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">تاريخ بداية المشروع</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(startDate)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">المدة المتوقعة للمشروع</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{project?.duration || "0"} months</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">تاريخ نهاية المشروع المتوقع</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{expectedEndDate()}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">نوع الطرح</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{project?.type || "Not Set"}</span>
        </div>
      </div>
    </div>
  )
}
