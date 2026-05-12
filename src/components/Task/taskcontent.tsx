import { Maximize2, Loader, Timer, CircleCheck, CheckCircle2, Calendar, Users, FileText, Paperclip } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { getTask } from '../../api/task'
import { SheetDescription, SheetTitle } from '../ui/sheet'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardDescription } from '../ui/card'

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
              <div className='space-y-3 text-left'>
                    <Badge variant="outline" className="w-fit px-2 py-0.5 text-muted-foreground">
                        {taskData.project.name}
                    </Badge>

                    <SheetTitle className="text-2xl font-semibold leading-tight">
                        {taskData.name || "Untitled Task"}
                    </SheetTitle>


                    {/* content  */} 
                    {/* Created */}
                    <div className='space-y-3 w-full max-w-md'>
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

                        <p className='font-medium'>
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

                    {/* Status */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Loader
                                size={16}
                                className="text-muted-foreground"
                            />

                            <SheetDescription className="text-muted-foreground">
                                Status
                            </SheetDescription>
                        </div>

                     {/* <Badge variant="outline" className="px-1.5 text-muted-foreground flex items-center gap-1">
                        {taskData.status === "DONE" && (
                            <CircleCheck className="fill-green-500 dark:fill-green-400" />
                        )}
                        {taskData.status === "IN_PROGRESS" && (
                            <Loader className="animate-spin text-gray-500" />
                        )}
                        {taskData.status === "PENDING" && (
                            <Clock className="text-yellow-500" />
                        )}
                        {taskData.status}
                    </Badge> */}


                    {taskData.status === "DONE" && (
                        <Badge className='px-1.5 bg-green-100 text-green-700 gap-2'>
                            <CircleCheck className="fill-white" />
                            {taskData.status}
                        </Badge>
                    )}
                     {taskData.status === "IN_PROGRESS" && (
                        <Badge className='px-1.5 bg-blue-100 text-blue-700 gap-2'>
                            <CircleCheck className="fill-white" />
                            {taskData.status}
                        </Badge>
                    )}
                     {taskData.status === "PENDING" && (
                        <Badge className='px-1.5 bg-yellow-100 text-yellow-700 gap-2'>
                            <CircleCheck className="fill-white" />
                            {taskData.status}
                        </Badge>
                    )}
                    </div>


                    {/* Priority */}
                    <div className='flex items-center justify-between'>
                         <div className="flex items-center gap-2">
                            <CheckCircle2
                                size={16}
                                className="text-muted-foreground"
                            />

                            <SheetDescription className="text-muted-foreground">
                                Priority
                            </SheetDescription>
                        </div>

                    {taskData.priority === "HIGH" && (
                        <Badge className='px-1.5 bg-red-100 text-red-700 gap-2'>
                            {taskData.priority}
                        </Badge>
                    )}
                     {taskData.priority === "MEDIUM" && (
                        <Badge className='px-1.5 bg-amber-100 text-amber-700 gap-2'>
                            {taskData.priority}
                        </Badge>
                    )}
                     {taskData.priority === "LOW" && (
                        <Badge className='px-1.5 bg-green-100 text-green-700 gap-2'>
                            {taskData.priority}
                        </Badge>
                    )}
                    </div>


                    {/* DueDate */}
                     <div className='flex items-center justify-between'>
                         <div className="flex items-center gap-2">
                            <Calendar
                                size={16}
                                className="text-muted-foreground"
                            />

                            <SheetDescription className="text-muted-foreground">
                                Deadline
                            </SheetDescription>
                        </div>

                    <p className='font-medium'>
                        {taskData.deadline
                          ? new Date(taskData.deadline).toLocaleString('en-PH', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            })
                          : 'No date available'}
                        </p>
                    </div>


                    {/* AssingedTo */}
                    <div className='flex items-center justify-between'>
                         <div className="flex items-center gap-2">
                            <Users
                                size={16}
                                className="text-muted-foreground"
                            />

                            <SheetDescription className="text-muted-foreground">
                                Assigned to
                            </SheetDescription>
                        </div>

                        {(() => {
                          const getInitials = (name: string) => {
                            return name
                              .split(' ')
                              .map(n => n[0])
                              .join('')
                              .toUpperCase()
                              .slice(0, 2)
                          }
                          
                          // Handle both array and single object
                          const assignedUsers = Array.isArray(taskData.assignedTo) 
                            ? taskData.assignedTo 
                            : taskData.assignedTo ? [taskData.assignedTo] : []
                          
                          return (
                            <div className='flex -space-x-2'>
                              {assignedUsers.length > 0 ? (
                                assignedUsers.map((user: any, index: number) => {
                                  const userName = typeof user === 'object' ? user?.name : user
                                  const profilePic = typeof user === 'object' ? user?.profile_pic : null
                                  const initials = userName ? getInitials(userName) : 'UN'
                                  
                                  return (
                                    <Avatar key={index} className='border-2 border-white'  size='sm'>
                                      {profilePic && <AvatarImage src={profilePic} alt={userName || 'User'} />}
                                      <AvatarFallback>{initials}</AvatarFallback>
                                    </Avatar>
                                  )
                                })
                              ) : (
                                <Avatar>
                                  <AvatarFallback>UN</AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                          )
                        })()}
                    </div>
                    </div>

                    <div className='max-w-lg'>
                      <div className='flex items-start flex-col space-y-4'>
                        <div className='flex items-center gap-2'>
                          <FileText
                            size={16}
                            className="text-muted-foreground"/>

                            <SheetDescription className="text-muted-foreground">
                                Description
                            </SheetDescription>
                        </div>

                        <Card>
                            <CardDescription className='pl-3 pr-3 text-justify'>
                                {taskData.description}
                              </CardDescription>
                        </Card>
                    </div>

                    <div className='flex items-start flex-col space-y-4 mt-3'>
                      <div className='flex items-center gap-2'>
                        <Paperclip size={16}
                            className="text-muted-foreground"/>

                        <SheetDescription className="text-muted-foreground">
                                Attachment
                        </SheetDescription>

                      </div>
                      
                    </div>
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
