import {flexRender,getCoreRowModel,useReactTable} from "@tanstack/react-table"
import type { ColumnDef } from "@tanstack/react-table";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "../../components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Columns2, Plus } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default" size="sm" className="bg-green-50 text-green-700">
                     <span className="hidden lg:inline">All Projects</span>
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
                        <TableHead key={header.id} colSpan={header.colSpan} className="px-4 py-3 text-left">
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
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
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