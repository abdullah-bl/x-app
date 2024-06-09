import z, { object, string } from "zod"

export const signInSchema = object({
  username: string({ required_error: "Username is Required" })
    .min(3, "Username must be more than 3 characters")
    .max(32, "Username must be less than 32 characters"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const taskSchema = object({
  content: string({ required_error: "Task content is required" })
    .min(1, "Task content is required")
    .max(1500, "Task content must be less than 1500 characters"),
  html: z.optional(z.string()),
  due: z.optional(z.string()),
  priority: z.optional(z.enum(["none", "low", "medium", "high"])),
  tags: z.optional(z.string()),
  assigned: z.optional(z.string()),
})

export type Task = z.infer<typeof taskSchema>

export const projectSchema = object({})

export const ContractSchema = object({
  id: string({ required_error: "Project Id is Required" }),
  start: z.optional(z.string().datetime()),
  end: z.optional(z.string().datetime()),
})

export const TenderSchema = object({
  id: string({ required_error: "Project Id is Required" }),
  type: z.optional(z.string()),
  reference: z.optional(z.string()),
  number: z.optional(z.string()),
  submissionDate: z.optional(z.string().datetime()),
  lastOfferPresentationDate: z.optional(z.string().datetime()),
  offersOpeningDate: z.optional(z.string().datetime()),
  awardedDate: z.optional(z.string().datetime()),
  duration: z.optional(z.string()),
})
