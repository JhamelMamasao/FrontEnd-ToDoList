import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "../components/Sidebar/app-sidebar"
import {SidebarInset} from "../components/ui/sidebar"
import { Separator } from "../components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "../components/ui/breadcrumb"
import UserTask from "../components/my-task"
import CalendarTask from "../components/schedule"
import TaskPerformance from "../components/Task/task-perfomance"
import { DataTable } from "../components/Task/tasks-table"
import { columns, type Task} from "../components/Task/columns"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getMe } from "../api/auth"

function getData(): Task[] {
  return [
  {
    id: "728ed52f",
    name: "Design Landing Page",
    project: "Project 1",
    status: "In Progress",
    priority: "Low",
    created_by: "Mark",
    deadline: "2026-04-25",
  },
  {
    id: "a1b2c3d4",
    name: "Fix Login Bug",
    project: "Project 1",
    status: "In Progress",
    priority: "High",
    created_by: "Anna",
    deadline: "2026-04-22",
  },
  {
    id: "e5f6g7h8",
    name: "Create Marketing Plan",
    project: "Project 2",
    status: "Done",
    priority: "Low",
    created_by: "John",
    deadline: "2026-04-18",
  },
  {
    id: "i9j0k1l2",
    name: "Update Dashboard UI",
    project: "Project 2",
    status: "In Progress",
    priority: "High",
    created_by: "Lisa",
    deadline: "2026-04-24",
  },
  {
    id: "m3n4o5p6",
    name: "Write API Documentation",
    project: "Project 1",
    status: "Pending",
    priority: "High",
    created_by: "David",
    deadline: "2026-04-28",
  },
  {
    id: "q7r8s9t0",
    name: "Test Payment System",
    project: "Project 2",
    status: "In Progress",
    priority: "Medium",
    created_by: "Chris",
    deadline: "2026-04-23",
  },
]
}

export const Dashboard = () => {
  const data = getData()
  const navigate = useNavigate()


  useEffect(() => {
    const verifyUser = async () => {
      try {
        await getMe()
      } catch {
        localStorage.removeItem("token")
        navigate("/", { replace: true })
      }
    }
    
    verifyUser()
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/", { replace: true })
  }
  
  return (
    <div>
       <SidebarProvider>
        <AppSidebar logout={logout} />
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical"
                      className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink>
                              Dashboard
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header> 
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
              <div className="grid auto-rows-min gap-4 md:grid-cols-8">
                <div className="md:col-span-6 space-y-4">
                  <UserTask/>
                  <TaskPerformance/>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <CalendarTask />
                </div>
              </div>
              <DataTable columns={columns} data={data}/>
             
            </div>
        </SidebarInset>
    </SidebarProvider>
    </div>
  )
}
