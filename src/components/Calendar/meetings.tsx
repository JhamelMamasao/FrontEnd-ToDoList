import { Clock, Ellipsis, Timer } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";


export function Schedule() {
   const schedules = [
      { title: "Sprint Planning", start: "14:20", end: "15:30" },
      { title: "Meeting B", start: "14:30", end: "15:00" },
      { title: "Meeting C", start: "15:00", end: "16:00" },
   ];
   


   return (
      <div className="w-full space-y-2 mt-2">
         {schedules.map((schedule)=> (
            <Card className="flex-1" key={schedule.title}>
               <CardHeader>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 w-full">
                        <CardDescription className="text-sm font-semibold text-black truncate">
                           {schedule.title}
                        </CardDescription>

                        <Badge className="shrink-0 bg-yellow-50 text-yellow-700" >Starting soon</Badge>
                     </div>
                    <CardDescription className="text-xs shrink-0">
                     Start at
                    </CardDescription>
                </div>
                <div className="flex items-center justify-between w-full mt-2">
                  <Badge className="bg-gray-100 text-gray-700 gap-2"> Zoom Meeting</Badge>

                  <CardDescription className=" shrink-0 text-sm font-bold text-black">
                    {schedule.start} - {schedule.end}
                  </CardDescription>
                </div>
                <Separator className="mt-4"/>
                <div className="mt-2 flex items-center justify-between">
                  <AvatarGroup>
                    <Avatar size="sm">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                           <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                           <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                     <Avatar size="sm">
                           <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                           <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount>5</AvatarGroupCount>
                  </AvatarGroup>
                  
                   <CardDescription className="text-xs text-green">
                    Get All
                  </CardDescription>
                </div>
               </CardHeader>
               
         </Card>
         ))}
         
      </div>
   )
}