import { FileText } from "lucide-react";
import { SheetDescription } from "../ui/sheet";
import { Card, CardDescription } from "../ui/card";


interface DescriptionCardProps {
    description: any
}

export default function descriptionCard ({ description }: DescriptionCardProps) {

return (
        <div className="max-w-lg">
            <div className="flex items-start flex-col space-y-4">
                <div className="flex items-center gap-2">
                    <FileText size={16} className="text-muted-foreground"/>
                    <SheetDescription>Description</SheetDescription>
                </div>
            <Card>
                <CardDescription className="pl-3 pr-3 text-justify">
                    {description}
                </CardDescription>
            </Card>
            </div>
        </div>
    )
}