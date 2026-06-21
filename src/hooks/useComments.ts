import { useEffect, useState } from "react"
import { getComments } from "../api/task"




export function useComment(projectId: number | string | null, taskId: number | string | null) {
    const [comments, setComments] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
                if (projectId == null || taskId == null) {
                    setComments(null)
                    setError(null)
                    setLoading(false)
                    return
                }
         
                const controller = new AbortController()
         
                const load = async () => {
                    setLoading(true)
                    setError(null)
         
                    try {
                        const data = await getComments(Number(projectId), Number(taskId), controller.signal)
                        console.log("comments response:", data)
         
                    if (!controller.signal.aborted) {
                        setComments(data)
                    }
                } catch (err) {
                    if (!controller.signal.aborted) {
                        console.error("failed to load comments", err)
                        setError(err instanceof Error ? err.message : "Failed to load comments")
                        setComments(null)
                    }
                } finally {
                    if (!controller.signal.aborted) {
                        setLoading(false)
                    }
                }
            }
         
            load()
         
                return() => controller.abort()
    }, [projectId, taskId])

    return {
        comments,
        loading,
        error,
    }
}