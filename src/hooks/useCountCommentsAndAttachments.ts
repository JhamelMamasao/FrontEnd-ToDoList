import { useEffect, useState } from "react"
import { getAttachment, getComments } from "../api/task"

type TaskCounts = {
    comments: number
    attachments: number
}

type TaskLike = {
    id: string
    projectId?: string | number
    taskId?: string | number
}

export function useCountCommentsAndAttachments(tasks: TaskLike[]) {
    const [taskCounts, setTaskCounts] = useState<Record<string, TaskCounts>>({})

    useEffect(() => {
        const controller = new AbortController()

        const loadCounts = async () => {
            const tasksWithIds = tasks.filter((task) => task.projectId != null && task.taskId != null)

            if (tasksWithIds.length === 0) {
                setTaskCounts({})
                return
            }

            try {
                const results = await Promise.all(
                    tasksWithIds.map(async (task) => {
                        const projectKey = String(task.projectId)
                        const taskKey = String(task.taskId)

                        const [commentsResponse, attachmentsResponse] = await Promise.all([
                            getComments(Number(projectKey), Number(taskKey), controller.signal).catch(() => null),
                            getAttachment(Number(projectKey), Number(taskKey), controller.signal).catch(() => null),
                        ])

                        const comments = Array.isArray(commentsResponse)
                            ? commentsResponse.length
                            : Array.isArray((commentsResponse as { data?: unknown[] } | null)?.data)
                                ? (commentsResponse as { data: unknown[] }).data.length
                                : Array.isArray((commentsResponse as { comments?: unknown[] } | null)?.comments)
                                    ? (commentsResponse as { comments: unknown[] }).comments.length
                                    : commentsResponse
                                        ? 1
                                        : 0

                        const attachments = Array.isArray(attachmentsResponse)
                            ? attachmentsResponse.length
                            : Array.isArray((attachmentsResponse as { data?: unknown[] } | null)?.data)
                                ? (attachmentsResponse as { data: unknown[] }).data.length
                                : Array.isArray((attachmentsResponse as { attachments?: unknown[] } | null)?.attachments)
                                    ? (attachmentsResponse as { attachments: unknown[] }).attachments.length
                                    : attachmentsResponse
                                        ? 1
                                        : 0

                        return [task.id, { comments, attachments }] as const
                    })
                )

                if (!controller.signal.aborted) {
                    setTaskCounts(Object.fromEntries(results))
                }
            } catch {
                if (!controller.signal.aborted) {
                    setTaskCounts({})
                }
            }
        }

        loadCounts()

        return () => controller.abort()
    }, [tasks])

    return taskCounts
}