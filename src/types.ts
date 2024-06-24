import { type BaseModel } from "pocketbase"

export type Role = "manager" | "user" | "fm" | "pm"

export type User = BaseModel & {
  email: string
  username: string
  password?: string
  name: string
  verified: boolean
  roles: Role[]
}

export type Task = BaseModel & {
  content: string
  status: "todo" | "inprogress" | "done"
  priority: "low" | "medium" | "high"
  owner: string
  dueDate: Date
  target: string
  assignee: string[]
  dueBy: string
  expand?: {
    owner: User
    assignee: User[]
    dueBy: User
  }
}

export type Item = BaseModel & {
  name: string
  description: string
  type: "income" | "expense" | "other"
  annually?: boolean
  start_date?: string
  end_date?: string
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
  color: string
  active: boolean // calculated or not
}

export type Project = BaseModel & {
  name: string
  description: string
  cost: number // total cost
  tags: string[] // tags
  status: string
  owner: string
  reference: string
  number: string
  submissionDate: string
  openingDate: string
  awardedDate: string
  startDate: string
  duration: number
  type: string
  archived: boolean
  expand?: {
    owner: User
    status: Status
  }
}

export type Member = BaseModel & {
  project: string
  member: string
  role: "read" | "write"
  expand?: {
    project: Project
    member: User
  }
}

export type StatusHistory = BaseModel & {
  project: string
  status: string
  owner: string
  note: string
  expand?: {
    project: Project
    status: Status
    owner: User
  }
}

export type Obligation = BaseModel & {
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

// draft > approved > sent > expro > published > opened offers > awarded > contract signed > work started > work completed > payment completed > closed >
