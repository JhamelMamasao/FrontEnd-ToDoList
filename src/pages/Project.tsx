
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "../components/Sidebar/app-sidebar"
import { Separator } from "../components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "../components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { showTasksinTable } from "../api/task"
import { normalizeTasks } from "../components/Task/Tasks"
import { ArrowDownWideNarrow, CalendarDays, Funnel, MessageCircle, Search, SquareGanttChart, SquareKanban } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { Paperclip } from "lucide-react"
import { useCountCommentsAndAttachments } from "../hooks/useCountCommentsAndAttachments"
import { AvatarFallback, AvatarImage, Avatar } from "../components/ui/avatar";

type KanbanStatus = "Pending" | "In Progress" | "Done"

type ProjectTask = {
    id: string
    taskId?: string | number
    projectId?: string | number
    description?: string
    name: string
    project: string
    status: KanbanStatus
    priority: "Low" | "Medium" | "High"
    created_by: string
    deadline: string
    assignedTo: any
}

const KANBAN_COLUMNS: Array<{
    key: KanbanStatus
    title: string
    subtitle: string
    tone: string
}> = [
    {
        key: "Pending",
        title: "Pending",
        subtitle: "Queue",
        tone: "border-amber-200 bg-amber-50/60",
    },
    {
        key: "In Progress",
        title: "In Progress",
        subtitle: "Work in motion",
        tone: "border-sky-200 bg-sky-50/60",
    },
    {
        key: "Done",
        title: "Done",
        subtitle: "Completed",
        tone: "border-emerald-200 bg-emerald-50/60",
    },
]

export function Project() {
    const { projectId } = useParams()
    const navigate = useNavigate()
    const [tasks, setTasks] = useState<ProjectTask[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null)
    const [statusOverrides, setStatusOverrides] = useState<Record<string, KanbanStatus>>({})

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/", { replace: true })
    }

    useEffect(() => {
        const controller = new AbortController()

        const loadTasks = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await showTasksinTable(controller.signal)
                const normalized = normalizeTasks(response) as ProjectTask[]
                setTasks(normalized)
            } catch {
                if (!controller.signal.aborted) {
                    setError("Failed to load tasks for project board.")
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        loadTasks()

        return () => controller.abort()
    }, [])

    const visibleTasks = useMemo(() => {
        const byProject = projectId
            ? tasks.filter((task) => String(task.projectId ?? "") === projectId)
            : tasks

        return byProject.map((task) => ({
            ...task,
            status: statusOverrides[task.id] ?? task.status,
        }))
    }, [projectId, statusOverrides, tasks])

    const taskCounts = useCountCommentsAndAttachments(visibleTasks)

    const board = useMemo(() => {
        return {
            Pending: visibleTasks.filter((task) => task.status === "Pending"),
            "In Progress": visibleTasks.filter((task) => task.status === "In Progress"),
            Done: visibleTasks.filter((task) => task.status === "Done"),
        }
    }, [visibleTasks])

    const moveTaskToColumn = (targetStatus: KanbanStatus) => {
        if (!draggingTaskId) return

        setStatusOverrides((prev) => ({
            ...prev,
            [draggingTaskId]: targetStatus,
        }))
        setDraggingTaskId(null)
    }

    const tabItems = [
        { value: "Kanban", label: "Kanban", logo: <SquareKanban /> },
        { value: "Timeline", label: "Timeline", logo: <SquareGanttChart /> },
        { value: "Calendar", label: "Calendar", logo: <CalendarDays /> },
    ]

    return (
        <SidebarProvider>
            <AppSidebar logout={logout} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink>Project Kanban</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="p-2">
                        <CardTitle className="text-xl font-semibold text-green">T98 Rehab</CardTitle>
                        <CardDescription className="text-sm">Chiropractic Clinic</CardDescription>
                    </div>

                    <Tabs defaultValue="Kanban">
                        <div className="flex flex-row justify-between">
                            <TabsList className="w-sm" variant="line">
                                {tabItems.map((tab) => (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className="gap-2 text-sm data-[state=active]:font-semibold data-[state=active]:text-green"
                                    >
                                        {tab.logo}
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <div className="flex flex-row items-center gap-2">
                                <Button variant="outline">
                                    <Funnel /> Filter
                                </Button>
                                <Button variant="outline">
                                    <ArrowDownWideNarrow /> Nearest Due Dae
                                </Button>
                                <Separator orientation="vertical" />
                                <Button variant="outline">
                                    <Search />
                                </Button>
                            </div>
                        </div>

                        <TabsContent value="Kanban" className="mt-3">
                            {error ? (
                                <Card className="border-red-200 bg-red-50">
                                    <CardContent className="p-4 text-sm text-red-700">{error}</CardContent>
                                </Card>
                            ) : null}

                            {loading ? (
                                <div className="grid gap-4 md:grid-cols-3">
                                    {KANBAN_COLUMNS.map((column) => (
                                        <Card key={column.key} className="min-h-72 animate-pulse border-slate-200">
                                            <CardHeader>
                                                <div className="h-4 w-28 rounded bg-slate-200" />
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                <div className="h-24 rounded-xl bg-slate-100" />
                                                <div className="h-24 rounded-xl bg-slate-100" />
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-3">
                                    {KANBAN_COLUMNS.map((column) => (
                                        <Card
                                            key={column.key}
                                            className="bg-accent"
                                            onDragOver={(event) => event.preventDefault()}
                                            onDrop={() => moveTaskToColumn(column.key)}
                                        >
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-sm">{column.title}</CardTitle>
                                                    <Badge className="h-6 bg-green">{board[column.key].length}</Badge>
                                                </div>
                                                <CardDescription className="text-xs text-muted-foreground">{column.subtitle}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                {board[column.key].length ? (
                                                    board[column.key].map((task) => (
                                                        <div
                                                            key={task.id}
                                                            draggable
                                                            onDragStart={() => setDraggingTaskId(task.id)}
                                                            onDragEnd={() => setDraggingTaskId(null)}
                                                            className="cursor-grab rounded-xl border bg-card p-3 shadow-sm transition hover:-translate-y-0.5 active:cursor-grabbing"
                                                        >
                                                            <div className="flex items-start justify-between gap-3">
                                                                <div>
                                                                    {task.priority === "Low" && <Badge className="bg-green-50 text-green-700">Low</Badge>}
                                                                    {task.priority === "Medium" && <Badge className="bg-yellow-50 text-yellow-700">Medium</Badge>}
                                                                    {task.priority === "High" && <Badge className="bg-red-50 text-red-700">High</Badge>}
                                                                </div>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {task.deadline
                                                                        ? new Date(task.deadline).toLocaleString("en-PH", {
                                                                            day: "numeric",
                                                                            year: "numeric",
                                                                            month: "short",
                                                                          })
                                                                        : "No date available"}
                                                                </p>
                                                            </div>

                                                            <div className="mt-1 flex flex-col items-start gap-2 p-2">
                                                                <p className="text-sm font-medium text-foreground">{task.name}</p>
                                                                <p className="line-clamp-2 text-xs text-muted-foreground">{task.description}</p>
                                                            </div>

                                                            <Separator className="mt-1" />

                                                            <div className="mt-2 flex flex-row justify-between gap-3 p-2">
                                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                    <span className="inline-flex items-center gap-1">
                                                                        <MessageCircle className="h-3.5 w-3.5" />
                                                                        {taskCounts[task.id]?.comments ?? 0}
                                                                    </span>
                                                                    <span className="inline-flex items-center gap-1">
                                                                        <Paperclip className="h-3.5 w-3.5" />
                                                                        {taskCounts[task.id]?.attachments ?? 0}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    {(() => {
                                                                        const getInitials = (name: string) => {
                                                                            return name
                                                                                .split(' ')
                                                                                .map(n => n[0])
                                                                                .join('')
                                                                                .toUpperCase()
                                                                                .slice(0, 2)
                                                                        }

                                                                        const assignedUsers = Array.isArray(task.assignedTo)
                                                                            ? task.assignedTo
                                                                            : task.assignedTo ? [task.assignedTo] : []
                                                                           console.log("assignedTo raw:", task.assignedTo)
console.log("assignedUsers:", assignedUsers)

                                                                        return (
                                                                             <div className='flex -space-x-2'>
                                                                                {assignedUsers.length > 0 ? (
                                                                                    assignedUsers.map((user: any, index: number) => {
                                                                                        const userName = typeof user === 'object' ? user?.name : user
                                                                                        const profilePic = typeof user === 'object' ? user?.profile_pic : null
                                                                                        const initials = userName ? getInitials(userName) : 'UN'
                                                                                                    
                                                                                return (
                                                                                    <Avatar key={index} className='border-2 border-white' size='sm'>
                                                                                        {profilePic && <AvatarImage src={profilePic} alt={userName || 'User'} />}
                                                                                        <AvatarFallback>{initials}</AvatarFallback>
                                                                                        </Avatar>
                                                                                    )
                                                                                        })
                                                                            ) : (
                                                                                <Avatar size='sm'>
                                                                                    <AvatarFallback>UN</AvatarFallback>
                                                                            </Avatar>
                                                                    )}
                                                                            </div>
                                                                        )
                                                                    })()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="rounded-xl border border-dashed bg-background/60 p-3 text-sm text-muted-foreground">
                                                        Drop tasks here.
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}