import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Inbox,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import * as React from "react"
import { SidebarHeader, Sidebar, SidebarContent } from "./ui/sidebar"
import { NavProjects } from "../components/nav-projects"
import { NavLogo } from "./nav-logo"
import { NavMain } from "./nav-main"

    // This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
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
        </SidebarContent>
     </Sidebar>
  )
}