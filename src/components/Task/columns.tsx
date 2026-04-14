import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { CircleCheck, Clock, Loader } from "lucide-react";


export type Task = {
  id: string
  name: string
  project: string
  status: "In Progress" | "Done" | "Pending" 
  priority: "Low" | "Medium" | "High" 
  assigned_to: string
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
      <Badge variant="outline" className="px-1.5 text-muted-foreground flex items-center gap-1">
          {row.original.priority}
      </Badge>
    )
  },
  {
    accessorKey: "assigned_to",
    header: "Assignee",
  },
  
]