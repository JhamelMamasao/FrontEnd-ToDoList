import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Ellipsis } from 'lucide-react'
import { Button } from './ui/button'


export default function UserTask() {
  return (
    <div className='md:flex gap-4'>
        <Card className='flex-1 '>
            <CardHeader className='space-y-10'>
                <div className='flex items-center justify-between'>
                    <CardDescription className='text-green-700 font-semibold'>
                        Total Projects
                    </CardDescription>
                     <Button variant="outline" className="w-8 h-8">
                        <Ellipsis/>
                     </Button>
                </div>
                <div className="flex items-end gap-2">
                    <CardTitle className="text-3xl font-semibold tabular-nums">
                        222
                    </CardTitle>

                    <CardDescription className="text-xs pb-1">
                        active projects
                    </CardDescription>
                </div>
            </CardHeader>
        </Card>
        <Card className='flex-1'>
            <CardHeader className='space-y-8'>
                <div className='flex items-center justify-between'>
                    <CardDescription className='text-green-700 font-semibold'>
                        Total Task
                    </CardDescription>
                    <Button variant="outline" className='w-8 h-8'>
                        <Ellipsis/>
                    </Button>
                </div>
                <div className='flex items-end gap-2'>
                    <CardTitle className='text-3xl font-semibold tabular-nums'>
                        222
                    </CardTitle>
                    <CardDescription className='text-xs pb-1'>
                         task created
                    </CardDescription>
                </div>
            </CardHeader>
        </Card>
       <Card className='flex-1'>
            <CardHeader className='space-y-8'>
                <div className='flex items-center justify-between'>
                    <CardDescription className='text-green-700 font-semibold'>
                        In Progress
                    </CardDescription>
                    <Button variant="outline" className='w-8 h-8'>
                        <Ellipsis/>
                    </Button>
                </div>
                <div className='flex items-end gap-2'>
                    <CardTitle className='text-3xl font-semibold tabular-nums'>
                        222
                    </CardTitle>
                    <CardDescription className='text-xs pb-1'>
                        task
                    </CardDescription>
                </div>
            </CardHeader>
        </Card>
        <Card className='flex-1'>
            <CardHeader className='space-y-8'>
                <div className='flex items-center justify-between'>
                    <CardDescription className='text-green-700 font-semibold'>
                        Completed
                    </CardDescription>
                    <Button variant="outline" className='w-8 h-8'>
                        <Ellipsis/>
                    </Button>
                </div>
                <div className='flex items-end gap-2'>
                    <CardTitle className='text-3xl font-semibold tabular-nums'>
                        222
                    </CardTitle>
                    <CardDescription className='text-xs pb-1'>
                        task
                    </CardDescription>
                </div>
            </CardHeader>
        </Card>
    </div>
    
  )
}
