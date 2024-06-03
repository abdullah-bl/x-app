import Container from "~/components/layout/container"
import { PageHeader } from "~/components/layout/header"
import { Calendar } from "~/components/ui/calendar"

export default function CalenderPage() {
  return (
    <Container>
      <PageHeader title="Calender Page" />
      <div className="flex-1 flex gap-2 min-h-full overflow-hidden">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-lg">Upcoming Events</span>
            </div>
            <div className="flex-1 p-2">
              <div className="flex items-center justify-between">
                <span className="text-lg">Event 1</span>
                <span className="text-sm">12:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg">Event 2</span>
                <span className="text-sm">1:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg">Event 3</span>
                <span className="text-sm">2:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-fit p-2">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-lg">Today</span>
            </div>
            <div className="flex-1 py-2">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
