import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Ellipsis } from 'lucide-react'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { getStats } from '../api/task'

type Stats = {
    totalProjects: number,
    totalTasks: number,
    done: number
}


export default function UserTask() {
    const [stats, setStats] = useState<Stats | null>(null)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStats()
                setStats(data)
            } catch(err) {
                console.error(err)
            }
        }

        fetchStats()
    }, [])


  return (
    <div className='md:flex gap-4'>
        <Card className='flex-1 '>
            <CardHeader className='space-y-8'>
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
                        {stats ? stats.totalProjects : 0}
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
                        {stats ? stats.totalTasks : 0}
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
                        Completed
                    </CardDescription>
                    <Button variant="outline" className='w-8 h-8'>
                        <Ellipsis/>
                    </Button>
                </div>
                <div className='flex items-end gap-2'>
                    <CardTitle className='text-3xl font-semibold tabular-nums'>
                        {stats ? stats.done : 0}
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
