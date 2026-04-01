import { Clock, Ellipsis, Timer } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar";


export function Schedule() {
   const schedules = [
      { title: "Meeting A", start: "14:20", end: "15:30" },
      { title: "Meeting B", start: "14:30", end: "15:00" },
      { title: "Meeting C", start: "15:00", end: "16:00" },
      { title: "Meeting C", start: "15:00", end: "16:00" },
      { title: "Meeting C", start: "15:00", end: "16:00" },
      { title: "Meeting C", start: "15:00", end: "16:00" },
   ];
   


   return (
      <div className="w-full space-y-3 max-h-75 overflow-y-auto pr-2 no-scrollbar">
         {schedules.map((schedule)=> (
            <Card className="flex-1" key={schedule.title}>
            <CardHeader>
               <div className="flex items-center justify-between">
                  <CardDescription className="text-base text-gray-800 font-semibold">
                     {schedule.title}
                  </CardDescription>
                  <Button variant="ghost" className="w-8 h-8">
                        <Ellipsis/>
                  </Button>
               </div>
               <div className="flex items-row align-center gap-1">
                  <Clock className="flex items-center" size={14}/>
                  <CardDescription className="text-xs">
                    {schedule.start}
                  </CardDescription>
               </div>
               <div className="mt-5 flex flex-row items-end gap-2 ">
               <AvatarGroup className="grayscale">
                     <Avatar size="sm">
                     <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                     <AvatarFallback>CN</AvatarFallback>
                     </Avatar>
                     <Avatar  size="sm">
                     <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                     <AvatarFallback>LR</AvatarFallback>
                     </Avatar>
                     <Avatar  size="sm">
                     <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt="@evilrabbit"
                     />
                     <AvatarFallback>ER</AvatarFallback>
                     </Avatar>
               </AvatarGroup>
               <CardDescription className="text-xs">+2 people</CardDescription>
               </div>
            </CardHeader>
         </Card>
         ))}
         
      </div>
   )
}