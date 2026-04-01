import { Ellipsis } from "lucide-react";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Task from "./taskcard";

export default function RecentlyTask() {

    return (
        <div className="md:flex">
            <Card className="flex-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                      <CardDescription className="text-green font-semibold">
                        Recently Task
                      </CardDescription>
                      <Button variant="ghost" className="w-8 h-8">
                        <Ellipsis/>
                      </Button>
                  </div>
                  <Task/>
                </CardHeader>
                
            </Card>
        </div>
    )
}