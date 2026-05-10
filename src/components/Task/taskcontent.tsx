import { Maximize2, Loader, Timer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { getTask } from '../../api/task'
import { SheetDescription, SheetTitle } from '../ui/sheet'
import { Badge } from '../ui/badge'

interface TaskContentProps {
  taskId?: number | string
  projectId?: number | string
}

export default function taskcontent({ taskId, projectId }: TaskContentProps) {
  const [taskData, setTaskData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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
        const data = await getTask(Number(projectId), Number(taskId))
        setTaskData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load task')
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [taskId, projectId])

  return (
    <div className='flex p-3 items-start flex-col'>
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
              <div className='space-y-4 text-left'>
                    <Badge variant="outline" className="w-fit px-2 py-0.5 text-muted-foreground">
                        {taskData.project.name}
                    </Badge>

                    <SheetTitle className="text-2xl font-semibold leading-tight">
                        {taskData.name || "Untitled Task"}
                    </SheetTitle>

                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Timer
                                size={16}
                                className="text-muted-foreground"
                            />

                            <SheetDescription className="text-muted-foreground">
                                Created time
                            </SheetDescription>
                        </div>

                        <p className='font-semibold'>
                        {taskData.created_at
                          ? new Date(taskData.created_at).toLocaleString('en-PH', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            })
                          : 'No date available'}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Timer
                                size={16}
                                className="text-muted-foreground"
                            />

                            <SheetDescription className="text-muted-foreground">
                                Created time
                            </SheetDescription>
                        </div>

                        <p className='font-semibold'>
                        {taskData.created_at
                          ? new Date(taskData.created_at).toLocaleString('en-PH', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            })
                          : 'No date available'}
                        </p>
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
