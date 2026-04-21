
import { Schedule } from "./Calendar/meetings";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";


export default function CalendarTask() {


  return (
    <div className="md-flex">
        <Card className="w-full">
            <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                    <CardDescription className='text-green-700 font-semibold'>
                        Schedule
                    </CardDescription>
                     <Button variant="link" className="text-xs ">
                      See all
                     </Button>
                </div>
                <div className="flex items-baseline flex-col">
                    <Tabs className="w-full" defaultValue="Meetings">
                        <TabsList className="w-full">
                            <TabsTrigger value="Meetings">Meetings</TabsTrigger>
                            <TabsTrigger value="Task">Task</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Meetings">
                        <Schedule/>
                        </TabsContent>
                    </Tabs>
                </div>  
            </CardHeader>
        </Card>
    </div>
  )
}
