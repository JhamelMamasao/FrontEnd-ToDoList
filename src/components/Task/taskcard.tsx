import { Card, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Ellipsis, MessageCircle, MessageCircleCheckIcon, MessageSquareMore, Paperclip } from "lucide-react";
import { gettasks } from "../../lib/task";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar";


export default function Task() {
    const tasks = gettasks()


    const priorityMap = {
    HIGH: "destructive",
    MEDIUM: "default",
    LOW: "secondary"
    }



    return (
        <div className="w-full flex flex-row gap-2">
            {tasks.map((task) => (
                <Card key={task.title} className="flex-1">
                    <CardHeader>
                        <Badge variant={priorityMap[task.priority as keyof typeof priorityMap] as "destructive" | "default" | "secondary"} className="text-xs">{task.priority}</Badge>
                        <div className="flex items-center justify-between">
                            <CardDescription className="text-sm text-gray-800 font-semibold">
                                {task.title}
                            </CardDescription>
                            <Button variant="ghost" className="w-8 h-8">
                                <Ellipsis/>
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">{task.description}</p>
                        <div className="flex flex-row mt-3 justify-between items-center">
                            <AvatarGroup className="grayscale">
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
                            <div className="flex flex-row gap-3 items-center text-gray-500">
                                <div className="flex flex-row gap-2">
                                    <MessageSquareMore size={15}/>
                                    <p className="text-xs">2</p>
                                </div>
                                 <div className="flex flex-row gap-2">
                                    <Paperclip size={15}/>
                                    <p className="text-xs">5</p>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}