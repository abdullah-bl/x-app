import { Status_History } from "~/types"

// Function to calculate duration in status
function calculateDurationInStatus(status: Status_History) {
  const startDate = new Date(status.start_date)
  const endDate = new Date(status.end_date)
  const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) // Adding 1 to include both start and end dates
  return duration
}

// Function to calculate project progress
function calculateProjectProgress(status_history: Status_History[]) {
  const totalActualDuration = status_history.reduce(
    (total, status) => total + calculateDurationInStatus(status),
    0
  )

  const averageDuration = totalActualDuration / status_history.length
  const totalDuration = averageDuration * status_history.length
  const progress = totalActualDuration / totalDuration
  return progress
}

// Calculate project progress
const progress = calculateProjectProgress(status_history)
console.log("Overall project progress: " + (progress * 100).toFixed(2) + "%")
