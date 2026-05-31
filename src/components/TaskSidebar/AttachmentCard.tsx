import { useEffect, useState } from "react"
import { getAttachment } from "../../api/task"
import pdfIcon from '../../assets/PDF.svg'
import docIcon from '../../assets/DOC.svg'
import docxIcon from '../../assets/DOCX.svg'
import csvIcon from '../../assets/CSV.svg'
import txtIcon from '../../assets/TXT.svg'
import pptIcon from '../../assets/PPT.svg'
import zipIcon from '../../assets/ZIP.svg'
import { Card } from "../ui/card"
import { Download, Paperclip } from "lucide-react"
import { SheetDescription } from "../ui/sheet"
import { Button } from "../ui/button"

interface AttachmentCardProps {
    taskId?: number | string
    projectId?: number | string
}

export default function AttachmentCard({ taskId, projectId}: AttachmentCardProps) {
    const [attachmentData, setAttachment] = useState<any>(null)
    const attachmentList = Array.isArray(attachmentData) ? attachmentData : attachmentData ? [attachmentData] : []


    const getAttachmentIcon = (fileName?: string) => {
        const extension = fileName?.split('.').pop()?.toLowerCase()

        switch (extension) {
            case 'pdf':
        return pdfIcon
            case 'doc':
        return docIcon
            case 'docx':
        return docxIcon
            case 'csv':
        return csvIcon
            case 'txt':
        return txtIcon
            case 'ppt':
            case 'pptx':
        return pptIcon
            case 'zip':
            case 'rar':
        return zipIcon
            default:
        return pdfIcon
        }
    }



    useEffect(() => {
        if(!projectId || !taskId) return 

        const controller = new AbortController()

        const load = async () => {
            const data = await getAttachment(Number(projectId), Number(taskId), controller.signal)
                if(!controller.signal.aborted) {
                    setAttachment(data)
                }
        }

        load()

        return () => controller.abort()
    }, [projectId, taskId])

    return (
        <>
        <div className="flex items-start flex-col space-y-4 mt-3 max-w-lg">
            <div className="flex w-full items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Paperclip size={16} className="text-muted-foreground"/>

                    <SheetDescription>
                        Attachment
                    </SheetDescription>
                </div>
                <Button variant="link" className='flex items-center gap-2 p-0 h-auto'>
                    <Download size={14} className='text-blue-700'/>
                    <SheetDescription className='text-xs text-blue-700 font-semibold'>Download All</SheetDescription>
                </Button>
            </div>
        </div>
        <div className="attachment-scroll overflow-auto w-full pb-2 mt-3">
            {attachmentList.length > 0 ? (
                <div className="flex w-max flex-nowrap gap-3">
                    {attachmentList.map((file: any, index: number) => {
                        const fileName = file?.FileName ?? file?.fileName ?? file?.name ?? 'Untitled attachment'
                        const fileIcon = getAttachmentIcon(fileName)
                        const rawFileType = file?.FileType ?? file?.fileType ?? fileName.split('.').pop() ?? 'FILE'
                        const normalizedFileType = String(rawFileType).includes('/')
                            ? String(rawFileType).split('/').pop()?.toUpperCase() ?? 'FILE'
                            : String(rawFileType).toUpperCase()
                        const shortFileType = normalizedFileType.length > 18
                            ? `${normalizedFileType.slice(0, 18)}...`
                            : normalizedFileType

                        return (
                            <div key={index} className="w-56 min-w-56 shrink-0 p-3 border border-gray-200 rounded-md">
                                <div className="flex items-center gap-3">
                                    <img src={fileIcon} alt="attachment icon" className="h-10 w-10 object-contain" />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">{fileName}</p>
                                        <p className="truncate text-xs text-muted-foreground" title={normalizedFileType}>
                                            {shortFileType}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <p className="p-3 text-sm text-muted-foreground">No attachment available</p>
            )}
        </div>
    </>
    )


}