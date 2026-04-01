import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "../components/Sidebar/app-sidebar"
import {
  SidebarInset,
} from "../components/ui/sidebar"
import { Separator } from "../components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "../components/ui/breadcrumb"
import UserTask from "../components/my-task"
import CalendarTask from "../components/calendar-task"
import Timer from "../components/timer"
import RecentlyTask from "../components/Task/recently-task"

export const Dashboard = () => {
  return (
    <div>
       <SidebarProvider>
        <AppSidebar />
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
                              Home
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
              <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                <UserTask/>
              </div>
             <div className="grid gap-4 md:grid-cols-8">
                <div className="md:col-span-6">
                 <RecentlyTask/>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <CalendarTask />
                  <Timer/>
                </div>
              </div>
            </div>
        </SidebarInset>
    </SidebarProvider>
    </div>
  )
}
