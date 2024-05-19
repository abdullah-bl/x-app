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
}

export type Project = BaseModel & {
  name: string
  description: string
  cost: number
  duration: number
  short_number: string
  reference: string
  start_date: Date
  end_date: Date
  tags: string[]
  status: string
  owner: string
  budgets: string[]
  expand?: {
    owner: User
    status: Status
    budgets: ProjectBudget[]
  }
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
// 1. Draft => reviewing by the owner
// 2. Approved => sent to be published to the public
// 3. Published => visible to the public
// 4. Opened Offers => waiting for offers
// 5. Awarded => the owner awarded the project to a contractor
// 6. Contract Signed => the contractor signed the contract
// 7. Work Started => the contractor started the work
// 8. Work Completed => the contractor completed the work
// 9. Payment Completed  => the owner paid the contractor
// 10. Closed => by the owner, by the admin, by the system
// 11. Cancelled => by the owner, by the admin, by the system

// project budgets are the main budgets for the project

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
