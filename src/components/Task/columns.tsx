import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { CircleCheck, Clock, Loader } from "lucide-react";
import { AvatarFallback, Avatar } from "../ui/avatar";


export type Task = {
  id: string
  name: string
  project: string
  status: "In Progress" | "Done" | "Pending" 
  priority: "Low" | "Medium" | "High" 
  created_by: string
  deadline: string
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "project",
    header: "Project",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground flex items-center gap-1">
          {row.original.status === "Done" && (
            <CircleCheck className="fill-green-500 dark:fill-green-400" />
          )}
          {row.original.status === "In Progress" && (
            <Loader className="animate-spin text-gray-500" />
          )}
          {row.original.status === "Pending" && (
            <Clock className="text-yellow-500" />
          )}
          {row.original.status}
        </Badge>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <>
        {row.original.priority === "Low" && (
          <Badge className="bg-green-50 text-green-700">Low</Badge>
        )}
        {row.original.priority === "Medium" && (
          <Badge className="bg-yellow-50 text-yellow-700">Medium</Badge>
        )}
        {row.original.priority === "High" && (
          <Badge className="bg-red-50 text-red-700">High</Badge>
        )}
      </>
    )
  },
 {
  accessorKey: "deadline",
  header: "Deadline",
  cell: ({ row }) => {
    const deadline = new Date(row.original.deadline);

    return (
      <Badge variant="outline"
        className={"px-1.5 text-muted-foreground flex items-center gap-1"}
      >
        {deadline.toLocaleDateString()}
      </Badge>
    );
  },
},
 {
  accessorKey: "created_by",
  header: "Created By",
  cell: ({ row }) => {
    const name = row.original.created_by;

    return (
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <span className="text-xs">{name}</span>
      </div>
    );
  },
}
  
]