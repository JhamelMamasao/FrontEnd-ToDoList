import { Calendar, CheckCircle2, CircleCheck, Loader, Timer, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { SheetDescription } from "../ui/sheet";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";

interface InformationCardProps {
    created_at: any,
    status: any,
    priority: any,
    deadline: any,
    assignedTo: any,
}

export default function informationCard ({ created_at, status, priority, deadline, assignedTo}: InformationCardProps) {

return (
        <div className='space-y-3 w-full max-w-lg'>
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
                        {created_at
                          ? new Date(created_at).toLocaleString('en-PH', {
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
                    {status === "DONE" && (
                        <Badge className='px-1.5 bg-green-100 text-green-700 gap-2'>
                            <CircleCheck className="fill-white" />
                            {status}
                        </Badge>
                    )}
                     {status === "IN_PROGRESS" && (
                        <Badge className='px-1.5 bg-blue-100 text-blue-700 gap-2'>
                            <CircleCheck className="fill-white" />
                            {status}
                        </Badge>
                    )}
                     {status === "PENDING" && (
                        <Badge className='px-1.5 bg-yellow-100 text-yellow-700 gap-2'>
                            <CircleCheck className="fill-white" />
                            {status}
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

                    {priority === "HIGH" && (
                        <Badge className='px-1.5 bg-red-100 text-red-700 gap-2'>
                            {priority}
                        </Badge>
                    )}
                     {priority === "MEDIUM" && (
                        <Badge className='px-1.5 bg-amber-100 text-amber-700 gap-2'>
                            {priority}
                        </Badge>
                    )}
                     {priority === "LOW" && (
                        <Badge className='px-1.5 bg-green-100 text-green-700 gap-2'>
                            {priority}
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
                        {deadline
                          ? new Date(deadline).toLocaleString('en-PH', {
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
                         const assignedUsers = Array.isArray(assignedTo) 
                            ? assignedTo 
                            : assignedTo ? [assignedTo] : []
                                      
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
    )
}