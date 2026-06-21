export const formatFileSize = (size?: number) => {
            if (!size && size !== 0) return ""
            if (size < 1024) return `${size} B`
            if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
            return `${(size / (1024 * 1024)).toFixed(1)} MB`
        }

export const getCommentDate = (comment: any) => {
            const rawDate =
                comment?.created_at ??
                comment?.createdAt ??
                comment?.date ??
                comment?.Date ??
                null

            if (!rawDate) return null

            const parsedDate = new Date(rawDate)
            return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
        }

export const formatCommentTime = (date: Date) =>
            date.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
            })

export const formatDateLabel = (date: Date) => {
            const today = new Date()

            if (
                date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate()
            ) {
                return "Today"
            }

            return date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
            })
        }

export const getCommentKey = (comment: any, fallbackIndex: number) =>
            String(comment?.comment_id ?? comment?.id ?? `comment-${fallbackIndex}`)

export const getBaseReplies = (comment: any) => {
            const replyList =
                comment?.replies ??
                comment?.Replies ??
                comment?.children ??
                comment?.comments ??
                []

            return Array.isArray(replyList) ? replyList : []
        }