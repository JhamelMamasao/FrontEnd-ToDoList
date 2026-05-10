import {flexRender,getCoreRowModel,useReactTable} from "@tanstack/react-table"
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "../../components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Columns2, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import ContentTask from "./taskcontent"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [selectedProjectLabel, setSelectedProjectLabel] = useState("All Projects")

  const projectLabels = useMemo(() => {
    const labels = new Set<string>()

    data.forEach((item) => {
      const project = (item as { project?: unknown }).project
      if (typeof project === "string" && project.trim()) {
        labels.add(project)
      }
    })

    return Array.from(labels)
  }, [data])

  const filteredData = useMemo(() => {
    if (selectedProjectLabel === "All Projects") {
      return data
    }

    return data.filter((item) => {
      const project = (item as { project?: unknown }).project
      return String(project ?? "") === selectedProjectLabel
    })
  }, [data, selectedProjectLabel])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default" size="sm" className="bg-green-50 text-green-700">
                     <span className="hidden lg:inline">{selectedProjectLabel}</span>
                     <ChevronDown/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setSelectedProjectLabel("All Projects")}>All Projects</DropdownMenuItem>
                    {projectLabels.length > 0 ? (
                      projectLabels.map((label) => (
                        <DropdownMenuItem key={label} onClick={() => setSelectedProjectLabel(label)}>
                          {label}
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuLabel>No projects found</DropdownMenuLabel>
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center justify-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Columns2 />
                        <span className="hidden lg:inline">Customize Columns</span>
                        <ChevronDown/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Project 1</DropdownMenuLabel>
                        <DropdownMenuLabel>Project 2</DropdownMenuLabel>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm">
                <Plus/>
                Add Section
            </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border mt-3">
        <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-b">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan} className="px-7 py-2 text-left">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
            </TableHeader>
            <TableBody >
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}  >
                    {row.getVisibleCells().map((cell) => {
                      const taskData = row.original as any
                      return (
                      <TableCell key={cell.id} className="px-8 text-left">
                       <Sheet>
                          <SheetTrigger asChild>
                              <div className="cursor-pointer">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </div>
                          </SheetTrigger>
                          <SheetContent side="right" className="min-w-xl">
                            <ContentTask taskId={taskData.taskId} projectId={taskData.projectId} />
                          </SheetContent>
                       </Sheet>
                      </TableCell>
                    )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
        </Table>
      </div>
    </div>
  )
}