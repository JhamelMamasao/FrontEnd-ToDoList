import { useState } from "react"
import { TabsContent, TabsList, TabsTrigger, Tabs } from "../ui/tabs"
import TabsComment from "../SideBarTabs/TabsComment"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Paperclip, Send, X } from "lucide-react"
import { useReplies } from "../../hooks/useReplies"


interface TabsCardProps {
    taskId?: number | string
    projectId?: number | string 
}

export default function TabsCard({ taskId, projectId}: TabsCardProps) {
    const tabItems = [
        { value: "Comments", label: "Comments" },
        { value: "Task", label: "SubTasks" },
        { value: "Activies", label: "Activies" },
    ]
    const [commentText, setCommentText] = useState("")
    const [attachedFiles, setAttachedFiles] = useState<File[]>([])
    const [pendingComments, setPendingComments] = useState<any[]>([])
     const { fileInputRef, handleAttachFiles} = useReplies()

    const removeAttachedFile = (fileIndex: number) => {
        setAttachedFiles((previousFiles) => previousFiles.filter((_, index) => index !== fileIndex))
    }

    const handleSendComment = () => {
        const trimmedComment = commentText.trim()
        if (!trimmedComment && attachedFiles.length === 0) return

        const localComment = {
            id: `local-${Date.now()}`,
            content: trimmedComment || "(Attachment only)",
            created_at: new Date().toISOString(),
            userName: "You",
            attachments: attachedFiles.map((file) => ({
                name: file.name,
                size: file.size,
            })),
        }

        setPendingComments((previousComments) => [localComment, ...previousComments])
        setCommentText("")
        setAttachedFiles([])
    }

    return (
        <div className="flex flex-col items-baseline">
            <Tabs className="w-full" defaultValue="Comments">
                <TabsList className="w-sm" variant="line">
                    {tabItems.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value} className="text-sm">
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="Comments" className="flex max-h-[37vh] min-h-10 flex-col gap-3">
                    <div className="attachment-scroll min-h-0 flex-1 overflow-y-auto pr-1">
                        <TabsComment taskId={taskId} projectId={projectId} pendingComments={pendingComments} />
                    </div>

                    <div className="sticky bottom-0 z-10 border-t bg-background pt-2">
                        <Textarea
                            placeholder="Type your comments here."
                            className="h-20"
                            value={commentText}
                            onChange={(event) => setCommentText(event.target.value)}
                        />

                        {attachedFiles.length > 0 ? (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {attachedFiles.map((file, index) => (
                                    <div key={`${file.name}-${index}`} className="inline-flex items-center gap-2 rounded-md bg-muted px-2 py-1 text-xs">
                                        <span className="max-w-36 truncate">{file.name}</span>
                                        <button
                                            type="button"
                                            className="text-muted-foreground hover:text-foreground"
                                            onClick={() => removeAttachedFile(index)}
                                            aria-label={`Remove ${file.name}`}
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        <div className="mt-2 flex items-center gap-2">
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                multiple
                                onChange={handleAttachFiles}
                            />
                            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                <Paperclip className="mr-2 h-4 w-4" />
                                Attach file
                            </Button>
                            <Button type="button" className="ml-auto" onClick={handleSendComment}>
                                <Send className="mr-2 h-4 w-4" />
                                Send
                            </Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
