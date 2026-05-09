import type { Task } from "../Task/columns"

const normalizeStatus = (value: unknown): Task["status"] => {
  const status = String(value ?? "").toUpperCase()

  if (status === "DONE") return "Done"
  if (status === "IN_PROGRESS") return "In Progress"
  return "Pending"
}

const normalizePriority = (value: unknown): Task["priority"] => {
  const priority = String(value ?? "").toUpperCase()

  if (priority === "HIGH") return "High"
  if (priority === "MEDIUM") return "Medium"
  return "Low"
}

const normalizeCreatorName = (task: Record<string, unknown>): string => {
  const creator =
    task.created_by ??
    task.createdBy ??
    task.user ??
    task.owner

  if (typeof creator === "string" && creator.trim()) {
    return creator
  }

  if (typeof creator === "object" && creator !== null) {
    const creatorObj = creator as Record<string, unknown>
    const fullName = [creatorObj.firstName, creatorObj.lastName]
      .filter((part) => typeof part === "string" && part.trim())
      .join(" ")

    if (fullName) return fullName

    const fallbackName = creatorObj.name ?? creatorObj.fullName ?? creatorObj.username ?? creatorObj.email
    if (typeof fallbackName === "string" && fallbackName.trim()) {
      return fallbackName
    }
  }

  return "Unknown"
}

export const normalizeTasks = (payload: unknown): Task[] => {
  const rawList = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { data?: unknown[] })?.data)
      ? (payload as { data: unknown[] }).data
      : Array.isArray((payload as { tasks?: unknown[] })?.tasks)
        ? (payload as { tasks: unknown[] }).tasks
        : []

  return rawList.map((rawTask, index) => {
    const task = rawTask as Record<string, unknown>
    const projectValue = task.project as Record<string, unknown> | string | undefined

    return {
      id: String(task.id ?? task._id ?? index),
      name: String(task.name ?? task.title ?? "Untitled Task"),
      project:
        typeof projectValue === "object" && projectValue !== null
          ? String(projectValue.name ?? projectValue.projectName ?? "No Project")
          : String(projectValue ?? task.projectName ?? "No Project"),
      status: normalizeStatus(task.status),
      priority: normalizePriority(task.priority),
      created_by: normalizeCreatorName(task),
      deadline: String(task.deadline ?? task.dueDate ?? task.date ?? new Date().toISOString()),
    }
  })
}
