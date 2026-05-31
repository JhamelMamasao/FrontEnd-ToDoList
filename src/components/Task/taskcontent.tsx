import { Maximize2, Loader, Timer, CircleCheck, CheckCircle2, Calendar, Users, FileText, Paperclip, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { getTask } from '../../api/task'
import { SheetDescription, SheetTitle } from '../ui/sheet'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardDescription } from '../ui/card'
import AttachmentCard from '../TaskSidebar/attachmentCard'
import DescriptionCard from '../TaskSidebar/descriptionCard'
import InformationCard from '../TaskSidebar/InformationCard'

interface TaskContentProps {
  taskId?: number | string
  projectId?: number | string
}

export default function taskcontent({ taskId, projectId }: TaskContentProps) {
  const [taskData, setTaskData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchTask = async () => {
      if (taskId == null || projectId == null) {
        setTaskData(null)
        setError(null)
        return
      }

      setLoading(true)
      setError(null)
      try {
        console.log("Fetching task details:", { projectId, taskId })
        const data = await getTask(Number(projectId), Number(taskId), controller.signal)
        if (!controller.signal.aborted) {
          setTaskData(data)
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Failed to load task')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchTask()

    return () => {
      controller.abort()
    }
  }, [taskId, projectId])


  return (
    <div className='flex p-4 items-start flex-col'>
        <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-muted-foreground"
        >
        <Maximize2 className="h-4 w-4" />
        Expand
        </Button>

        <div className='mt-7 ml-3'>
          {loading && (
            <div className='flex items-center gap-2'>
              <Loader className='h-4 w-4 animate-spin' />
              Loading task...
            </div>
          )}
          
          {error && (
            <p className='text-red-500 text-sm'>{error}</p>
          )}
          
          {taskData && !loading && (
            <>
              <div className='space-y-3 text-left'>
                    <Badge variant="outline" className="w-fit px-2 py-0.5 text-muted-foreground">
                        {taskData.project.name}
                    </Badge>

                    <SheetTitle className="text-2xl font-semibold leading-tight">
                        {taskData.name || "Untitled Task"}
                    </SheetTitle>


                    {/* content  */} 
                    {/* Created */}
                    <div className='space-y-3 w-full max-w-lg'>
                        <InformationCard created_at={taskData.created_at} status={taskData.status} priority={taskData.priority} deadline={taskData.deadline} assignedTo={taskData.assignedTo}/>
                    </div>

                    <div className='max-w-lg'>
                      <DescriptionCard description={taskData.description}/>
                      <AttachmentCard projectId={projectId} taskId={taskId}/>
                  </div>
              </div>
            </>
          )}
          
          {!taskData && !loading && !error && (
            <p className='text-gray-500'>Select a task to view details</p>
          )}

          {taskId == null || projectId == null ? (
            <p className='text-sm text-amber-600 mt-2'>Missing task ID or project ID for this row.</p>
          ) : null}
        </div>
    </div>
  )
}
