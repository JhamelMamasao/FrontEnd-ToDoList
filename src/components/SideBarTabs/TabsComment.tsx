import { Separator } from "../ui/separator"
import { Card, CardDescription } from "../ui/card"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { CornerDownRight, Paperclip } from "lucide-react"
import { useComment } from "../../hooks/useComments"
import { useReplies } from "../../hooks/useReplies"
import { formatFileSize, getCommentDate, formatCommentTime, formatDateLabel, getCommentKey, getBaseReplies } from "../../utils/comment-utils"

interface PendingComment {
    id: string
    content: string
    created_at: string
    userName: string
    attachments?: Array<{ name: string; size?: number }>
}

interface TabsCommentProps {
    taskId?: number | string
    projectId?: number | string
    pendingComments?: PendingComment[]
}

export default function TabsComment({ taskId, projectId, pendingComments = [] }: TabsCommentProps) {
    const normalizedProjectId =
        typeof projectId === "string" ? Number(projectId) : projectId ?? null

    const normalizedTaskId =
        typeof taskId === "string" ? Number(taskId) : taskId ?? null

     const { comments, loading, error} = useComment(normalizedProjectId, normalizedTaskId)
     const { activeReplyBox, setActiveReplyBox, replyDrafts, setReplyDrafts, localReplies, addReply, attachedFiles, fileInputRef, handleAttachFiles, pendingAttachmentCount, } = useReplies()

    const fetchedComments = Array.isArray(comments) ? comments : comments ? [comments] : []
    const commentList = [...pendingComments, ...fetchedComments]

    const sortedComments = [...commentList].sort((firstComment, secondComment) => {
        const firstDate = getCommentDate(firstComment)?.getTime() ?? -Infinity
        const secondDate = getCommentDate(secondComment)?.getTime() ?? -Infinity

        return secondDate - firstDate
    })

    const groupedComments = sortedComments.reduce(
        (groups: Array<{ label: string; items: any[] }>, comment: any) => {
            const commentDate = getCommentDate(comment)
            const label = commentDate ? formatDateLabel(commentDate) : "No date"
            const lastGroup = groups[groups.length - 1]

            if (lastGroup?.label === label) {
                lastGroup.items.push(comment)
            } else {
                groups.push({ label, items: [comment] })
            }

        return groups
    },
        []
    )
        

  return (
    <div>
         {loading && <p className="text-sm text-muted-foreground">Loading comments...</p>}
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            {!loading && !error && commentList.length === 0 && (
                            <p className="text-sm text-muted-foreground">No comments available</p>
                            )}
                            {!loading && !error && groupedComments.map((group, groupIndex) => (
                                <div key={`${group.label}-${groupIndex}`} className="mt-4 first:mt-1 ">
                                    <div className="flex items-center gap-3 ">
                                        <Separator className="flex-1" />
                                        <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
                                            {group.label}
                                        </span>
                                        <Separator className="flex-1" />
                                    </div>

                                    <div className="space-y-3">
                                        {group.items.map((comment: any, index: number) => {
                                            const commentKey = getCommentKey(comment, index)
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

                                            
                                            const authorAvatar = rawAvatar
                                                ? String(rawAvatar).startsWith("http")
                                                    ? String(rawAvatar)
                                                    : `${import.meta.env.VITE_API_URL}/uploads/${String(rawAvatar)}`
                                                : null

                                            const commentDate = getCommentDate(comment)
                                            const attachments = Array.isArray(comment?.attachments) ? comment.attachments : []
                                            const allReplies = [...getBaseReplies(comment), ...(localReplies[commentKey] ?? [])]

                                            const initials = String(authorName).split(' ').map((s: string) => s[0]).filter(Boolean).slice(0,2).join('').toUpperCase()

                                            return (
                                                <div key={comment?.comment_id ?? comment?.id ?? `${group.label}-${index}`} className="p-3 border rounded-md">
                                                    <div className="flex items-start gap-3 ">
                                                        {authorAvatar ? (
                                                            <img src={authorAvatar} alt={authorName} className="h-8 w-8 rounded-full object-cover" />
                                                        ) : (
                                                            <div className="h-8 w-8 rounded-full bg-gray-200 text-xs font-medium flex items-center justify-center">
                                                                {initials}
                                                            </div>
                                                        )}

                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between gap-2 ">
                                                                <p className="text-sm font-medium">{authorName}</p>
                                                                {commentDate ? <span className="text-xs text-muted-foreground">{formatCommentTime(commentDate)}</span> : null}
                                                            </div>
                                                            <CardDescription className="mt-2 text-sm text-left">{content}</CardDescription>

                                                            {attachments.length > 0 ? (
                                                                <div className="mt-2 space-y-1">
                                                                    {attachments.map((attachment: any, attachmentIndex: number) => (
                                                                        <div key={`${attachment?.name ?? "file"}-${attachmentIndex}`} className="inline-flex items-center gap-2 rounded-md bg-muted px-2 py-1 text-xs mr-2">
                                                                            <Paperclip className="h-3.5 w-3.5" />
                                                                            <span className="max-w-36 truncate">{attachment?.name ?? "Attachment"}</span>
                                                                            <span className="text-muted-foreground">{formatFileSize(attachment?.size)}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : null}

                                                            <div className="mt-2">
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-auto px-0 text-xs text-muted-foreground"
                                                                    onClick={() => setActiveReplyBox((currentKey) => (currentKey === commentKey ? null : commentKey))}
                                                                >
                                                                    <CornerDownRight className="mr-1 h-3.5 w-3.5" />
                                                                    Reply
                                                                </Button>
                                                            </div>

                                                            {activeReplyBox === commentKey ? (
                                                                <div className="mt-2 rounded-md border bg-muted/30 p-2">
                                                                    <Textarea
                                                                        placeholder="Write a reply..."
                                                                        className="min-h-16"
                                                                        value={replyDrafts[commentKey] ?? ""}
                                                                        onChange={(event) =>
                                                                            setReplyDrafts((previousDrafts) => ({
                                                                                ...previousDrafts,
                                                                                [commentKey]: event.target.value,
                                                                            }))
                                                                        }
                                                                    />
                                                                    <div className="mt-2 flex justify-end gap-2">
                                                                         <input
                                                                            ref={fileInputRef}
                                                                            type="file"
                                                                            className="hidden"
                                                                            multiple
                                                                            onChange={handleAttachFiles}
                                                                        />
                                                                        <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                                                            <Paperclip/>
                                                                            Attach file{pendingAttachmentCount > 0 ? ` (${pendingAttachmentCount})` : ""}
                                                                        </Button>
                                                                        <Button type="button" size="sm" onClick={() => addReply(commentKey)}>
                                                                            Send Reply
                                                                        </Button>
                                                                    </div>

                                                                    {attachedFiles.length > 0 ? (
                                                                        <div className="mt-2 flex flex-wrap gap-2">
                                                                            {attachedFiles.map((file, fileIndex) => (
                                                                                <span
                                                                                    key={`${file.name}-${fileIndex}`}
                                                                                    className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs"
                                                                                >
                                                                                    <Paperclip className="h-3.5 w-3.5" />
                                                                                    <span className="max-w-32 truncate">{file.name}</span>
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            ) : null}

                                                            {allReplies.length > 0 ? (
                                                                <div className="mt-3 space-y-2 border-l pl-3">
                                                                    {allReplies.map((reply: any, replyIndex: number) => {
                                                                        const replyAuthor =
                                                                            reply?.user?.name ??
                                                                            reply?.userName ??
                                                                            reply?.username ??
                                                                            reply?.author ??
                                                                            reply?.name ??
                                                                            "Anonymous"

                                                                        const replyContent =
                                                                            reply?.content ??
                                                                            reply?.comment ??
                                                                            reply?.message ??
                                                                            "No reply text"

                                                                        const replyDate = getCommentDate(reply)

                                                                        return (
                                                                            <Card key={reply?.reply_id ?? reply?.id ?? `${commentKey}-reply-${replyIndex}`} className="rounded-md bg-muted/30 p-2">
                                                                                <div className="flex items-center justify-between gap-2">
                                                                                    <p className="text-xs font-medium">{replyAuthor}</p>
                                                                                    {replyDate ? <span className="text-[11px] text-muted-foreground">{formatCommentTime(replyDate)}</span> : null}
                                                                                </div>
                                                                                <p className="mt-1 text-xs text-muted-foreground">{replyContent}</p>
                                                                                {Array.isArray(reply?.attachments) && reply.attachments.length > 0 ? (
                                                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                                                        {reply.attachments.map((attachment: any, attachmentIndex: number) => (
                                                                                            <div
                                                                                                key={`${attachment?.name ?? "file"}-${attachmentIndex}`}
                                                                                                className="inline-flex items-center gap-2 rounded-md bg-background px-2 py-1 text-[11px]"
                                                                                            >
                                                                                                <Paperclip className="h-3 w-3" />
                                                                                                <span className="max-w-28 truncate">{attachment?.name ?? "Attachment"}</span>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                ) : null}
                                                                            </Card>
                                                                        )
                                                                    })}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
    </div>
  )
}