import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "../components/app-sidebar"

export const Dashboard = () => {
  return (
    <div>
        <SidebarProvider>
          <AppSidebar />
            <main>
              <SidebarTrigger />
              <h1>Hello World</h1>
            </main>
        </SidebarProvider>
    </div>
  )
}
