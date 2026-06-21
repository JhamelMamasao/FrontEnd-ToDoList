import { useRef, useState } from "react"

export type ReplyAttachment = {
    name: string
    size?: number
}

export type ReplyItem = {
    id: string
    content: string
    created_at: string
    userName: string
    attachments?: ReplyAttachment[]
}

export function useReplies() {
    const [activeReplyBox, setActiveReplyBox] = useState<string | null>(null)
    const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({})
    const [localReplies, setLocalReplies] = useState<Record<string, ReplyItem[]>>({})
    const [attachedFiles, setAttachedFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const pendingAttachmentCount = attachedFiles.length

    const handleAttachFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files ?? [])
        if (selectedFiles.length === 0) return

        setAttachedFiles((previousFiles) => [...previousFiles, ...selectedFiles])
        event.target.value = ""
    }

    const addReply = (commentKey: string) => {
        const replyText = replyDrafts[commentKey]?.trim()
        if (!replyText) return

        const reply: ReplyItem = {
            id: `reply-${Date.now()}`,
            content: replyText,
            created_at: new Date().toISOString(),
            userName: "You",
            attachments: attachedFiles.map((file) => ({
                name: file.name,
                size: file.size,
            })),
        }

        setLocalReplies((previousReplies) => ({
            ...previousReplies,
            [commentKey]: [...(previousReplies[commentKey] ?? []), reply],
        }))

        setReplyDrafts((previousDrafts) => ({
            ...previousDrafts,
            [commentKey]: "",
        }))

        setAttachedFiles([])
        setActiveReplyBox(null)
    }

    return {
        activeReplyBox,
        setActiveReplyBox,
        replyDrafts,
        setReplyDrafts,
        localReplies,
        addReply,
        attachedFiles,
        setAttachedFiles,
        fileInputRef,
        handleAttachFiles,
        pendingAttachmentCount,
    }
}
