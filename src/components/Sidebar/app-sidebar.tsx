import { Calendar, Frame, Home, Inbox, Map, PieChart, Settings2, } from "lucide-react"
import * as React from "react"
import { SidebarHeader, Sidebar, SidebarContent, SidebarFooter } from "../ui/sidebar"
import { NavProjects } from "./nav-projects"
import { NavLogo } from "./nav-logo"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

    // This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
     <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
            <NavLogo />
        </SidebarHeader>
         <SidebarContent>
            <NavMain items={data.navMain} />
            <NavProjects projects={data.projects}/>
        </SidebarContent>
         <SidebarFooter>
            <NavUser user={data.user} />
        </SidebarFooter>
     </Sidebar>
  )
}