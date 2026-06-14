

import { useEffect, useState } from "react"
import { CardDescription, CardTitle } from "../ui/card"
import { TabsContent, TabsList, TabsTrigger, Tabs } from "../ui/tabs"
import { getComments } from "../../api/task"





interface CommentCardProps {
    taskId?: number | string
    projectId?: number | string 
}

export default function CommentCard({ taskId, projectId}: CommentCardProps) {
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

        const commentList = Array.isArray(comments) ? comments : comments ? [comments] : []

        const formatDate = (iso?: string | null) => {
            if (!iso) return ''
            try {
                const d = new Date(iso)
                return d.toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                })
            } catch {
                return String(iso)
            }
        }


    return (
     <div>
        <div className="flex items-baseline flex-col ">
                                        <Tabs className="w-full" defaultValue="Comments">
                        <TabsList className="w-full" variant="line">
                            <TabsTrigger value="Comments" className="text-sm">Comments</TabsTrigger>
                            <TabsTrigger value="Task" className="text-sm">SubTasks</TabsTrigger>
                            <TabsTrigger value="Activies" className="text-sm">Activies</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Comments">
                            <CardTitle className="pt-2 text-sm">Comments</CardTitle>
                            {loading && <p className="text-sm text-muted-foreground">Loading comments...</p>}
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            {!loading && !error && commentList.length === 0 && (
                               <p className="text-sm text-muted-foreground">No comments available</p>
                            )}
                            {!loading && !error && commentList.map((comment: any, index: number) => {
                                const content =
                                    comment?.content ??
                                    comment?.Content ??
                                    comment?.comment ??
                                    comment?.Comment ??
                                    comment?.message ??
                                    comment?.Message ??
                                    "No comment text"

                                const authorName =
                                    comment?.user?.name ??
                                    comment?.userName ??
                                    comment?.username ??
                                    comment?.author ??
                                    comment?.createdBy ??
                                    comment?.created_by ??
                                    comment?.name ??
                                    "Anonymous"

                                const rawAvatar =
                                    comment?.user?.profile_pic ??
                                    comment?.avatar ??
                                    comment?.profile ??
                                    comment?.profileUrl ??
                                    comment?.photo ??
                                    comment?.image ??
                                    comment?.picture ??
                                    comment?.profile_picture ??
                                    comment?.avatarUrl ??
                                    null

                                // Resolve avatar URL: use as-is when absolute, otherwise prefix with API base uploads path
                                const authorAvatar = rawAvatar
                                    ? String(rawAvatar).startsWith("http")
                                        ? String(rawAvatar)
                                        : `${import.meta.env.VITE_API_URL}/uploads/${String(rawAvatar)}`
                                    : null

                                const commentDate =
                                    comment?.created_at ??
                                    comment?.createdAt ??
                                    comment?.date ??
                                    comment?.Date

                                const initials = String(authorName).split(' ').map((s: string) => s[0]).filter(Boolean).slice(0,2).join('').toUpperCase()

                                return (
                                    <div key={comment?.comment_id ?? comment?.id ?? index} className="p-3 border rounded-md mt-3">
                                        <div className="flex items-start gap-3">
                                            {authorAvatar ? (
                                                <img src={authorAvatar} alt={authorName} className="h-8 w-8 rounded-full object-cover" />
                                            ) : (
                                                <div className="h-8 w-8 rounded-full bg-gray-200 text-xs font-medium flex items-center justify-center">
                                                    {initials}
                                                </div>
                                            )}

                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium">{authorName}</p>
                                                    {commentDate ? <span className="text-xs text-muted-foreground">{formatDate(String(commentDate))}</span> : null}
                                                </div>
                                                <CardDescription className="mt-2 text-sm text-left">{content}</CardDescription>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </TabsContent>
                    </Tabs>
        </div>  
     </div>
    )
}
