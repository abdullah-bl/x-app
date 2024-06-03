import { type BaseModel } from "pocketbase"

export type User = BaseModel & {
  email: string
  username: string
  password?: string
  name: string
  verified: boolean
  apps: string[]
}

export type Item = BaseModel & {
  name: string
  description: string
  type: "income" | "expense" | "other"
  annually?: boolean
  start_date?: Date
  end_date?: Date
}

export type Budget = BaseModel & {
  year: number
  cost: number
  cash: number
  item: string // item id
  expand?: {
    item: Item
  }
}

// there will be transferring between budgets
export type Transfer = BaseModel & {
  date: Date
  cash: number
  cost: number
  from: string // budget id
  to: string // budget id
  owner: string
  expand?: {
    from: Budget
    to: Budget
    owner: User
  }
}

export type Payment = BaseModel & {
  date: Date
  amount: number
  budget: string // budget id
  project: string // project id
  paid: boolean // paid or not
  expand?: {
    project: Project
    budget: Budget
  }
}

export type Status = BaseModel & {
  seq: number
  name: string
  description: string
  duration: number // in days
}

export type Project = BaseModel & {
  name: string
  description: string
  cost: number // total cost
  estimated_cost: number // estimated cost
  tags: string[] // tags
  status: string
  owner: string
  budgets: string[]
  type: "Tender" | "Contract"
  tender?: TenderDetail // tender detail
  contract?: Contract // contract detail
  expand?: {
    owner: User
    budgets: ProjectBudget[]
    status: Status
  }
}

export type Contract = {
  start: string
  end: string
}

export type TenderDetail = {
  reference: string
  number: string
  submissionDate: string
  type: string
  lastOfferPresentationDate: string
  offersOpeningDate: string
  awardedDate: string
  duration: number
}

export type StatusHistory = BaseModel & {
  project: string
  status: string
  timestamp: Date
  owner: string
  note: string
  expand?: {
    project: Project
    status: Status
    owner: User
  }
}

// Project go throw the following steps
// Draft => reviewing by the owner
// Approved => sent to be published to the public
// Sent => sent to the department to be published
// Published => visible to the public and waiting for offers
// Opened Offers => waiting for offers from contractors
// Awarded => the owner awarded the project to a contractor
// Contract Signed => the contractor signed the contract
// Work Started => the contractor started the work
// Work Completed => the contractor completed the work
// Payment Completed  => the owner paid the contractor
// Closed => by the owner, by the admin, by the system
// Cancelled => by the owner, by the admin, by the system

// project budgets are the main budgets for the project
// normal status flow
// draft > approved > sent > expro > published > opened offers > awarded > contract signed > work started > work completed > payment completed > closed >
// draft > cancelled > closed
// draft > closed
// draft > approved > cancelled > closed
// draft > approved > published > cancelled > closed

export type ProjectBudget = BaseModel & {
  project: string
  budget: string
  cost: number
  cash: number
  note: string
  owner: string
  expand?: {
    project: Project
    budget: Budget
    owner: User
  }
}

export type XFile = BaseModel & {
  name: string
  url: string
  owner: string
  project: string
  payment: string
  expand?: {
    owner: User
    project: Project
    payment: Payment
  }
}

export type Change = {
  id?: string
  target_id: string
  action: "CREATE" | "READ" | "UPDATE" | "DELETE"
  user: string
  note?: string
  created?: Date
  updated?: Date
  expand?: {
    project: Project
    user: User
  }
}
