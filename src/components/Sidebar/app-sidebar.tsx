import { Calendar, Home, Inbox, Settings2 } from "lucide-react"
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
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  logout: () => void
}

export function AppSidebar({ logout, ...props }: AppSidebarProps) {

  return (
     <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
            <NavLogo />
        </SidebarHeader>
         <SidebarContent>
            <NavMain items={data.navMain} />
          <NavProjects />
        </SidebarContent>
         <SidebarFooter>
            <NavUser logout={logout} />
        </SidebarFooter>
     </Sidebar>
  )
}