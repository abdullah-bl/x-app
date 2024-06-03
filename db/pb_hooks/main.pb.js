/// <reference path="../pb_data/types.d.ts" />

// pocketbase hooks

onAfterBootstrap((e) => {
    console.log("App initialized!")
})



const statusCollection = $app.dao().findCollectionByNameOrId("statuses")
const userCollection = $app.dao().findCollectionByNameOrId("users")

const defaultStatus = [
    [
  {
    "seq": 1,
    "name": "Draft",
    "description": "The project is currently in the draft stage and is being reviewed by the owner for initial feedback and revisions.",
    "color": "#d3d3d3"
  },
  {
    "seq": 2,
    "name": "Approved",
    "description": "The project has been approved by the owner and is now ready to be sent out for public visibility and further processing.",
    "color": "#8fbc8f"
  },
  {
    "seq": 3,
    "name": "Sent",
    "description": "The project has been sent to the relevant department for the necessary steps to make it ready for publication.",
    "color": "#87ceeb"
  },
  {
    "seq": 4,
    "name": "Expro Review",
    "description": "The project is under expert review and is awaiting final approval to proceed to the publishing stage.",
    "color": "#ffa07a"
  },
  {
    "seq": 5,
    "name": "Published",
    "description": "The project is now publicly visible and open for viewing by potential contractors who may be interested in submitting offers.",
    "color": "#32cd32"
  },
  {
    "seq": 6,
    "name": "Opened Offers",
    "description": "The project is currently open for offers, and contractors are invited to submit their proposals and bids.",
    "color": "#ffd700"
  },
  {
    "seq": 7,
    "name": "Awarded",
    "description": "The project has been awarded to a contractor, and the owner has selected the winning bid to proceed with the work.",
    "color": "#ff69b4"
  },
  {
    "seq": 8,
    "name": "Contract Signed",
    "description": "The contract between the owner and the selected contractor has been signed, formalizing the agreement.",
    "color": "#4682b4"
  },
  {
    "seq": 9,
    "name": "Work Started",
    "description": "The contractor has commenced work on the project, beginning the execution phase.",
    "color": "#20b2aa"
  },
  {
    "seq": 10,
    "name": "Work Completed",
    "description": "The contractor has completed all work as per the project requirements and specifications.",
    "color": "#6a5acd"
  },
  {
    "seq": 11,
    "name": "Payment Completed",
    "description": "The owner has completed the payment process, and the contractor has been fully compensated for the work done.",
    "color": "#ff8c00"
  },
  {
    "seq": 12,
    "name": "Closed",
    "description": "The project has been officially closed by the owner, admin, or system, marking the end of all activities.",
    "color": "#808080"
  },
  {
    "seq": 13,
    "name": "Cancelled",
    "description": "The project has been cancelled by the owner, admin, or system, and no further actions will be taken.",
    "color": "#ff0000"
  }
]
]

