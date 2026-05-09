import { useEffect, useState } from "react"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Folder, Forward, Frame, MoreHorizontal, Trash2 } from "lucide-react"
import { getProjects } from "../../api/project"



export function NavProjects({
}: {
}) {
  const { isMobile } = useSidebar()
  const [projects, setProjects] = useState<Array<{ id: string; name: string; url: string }>>([])

  useEffect(() => {
    const controller = new AbortController()

    const loadProjects = async () => {
      try {
        const response = await getProjects(controller.signal)
        const rawProjects = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.projects)
              ? response.projects
              : []

        const normalizedProjects = rawProjects.map((project: Record<string, unknown>, index: number) => ({
          id: String(project.id ?? project._id ?? index),
          name: String(project.name ?? project.projectName ?? project.title ?? `Project ${index + 1}`),
          url: String(project.url ?? "#"),
        }))

        setProjects(normalizedProjects)
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to load projects", error)
        }
      }
    }

    loadProjects()

    return () => controller.abort()
  }, [])
  
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden px-4">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <Frame />
                    <span>{item.name}</span>
                  </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                          <span className="sr-only">More</span>
                        </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                        className="w-48 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align={isMobile ? "end" : "start"}
                        >
                        <DropdownMenuItem>
                          <Folder className="text-muted-foreground" />
                          <span>View Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Forward className="text-muted-foreground" />
                          <span>Share Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Trash2 className="text-muted-foreground" />
                          <span>Delete Project</span>
                        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </SidebarMenuItem>
        ))}
        {projects.length === 0 && (
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70" disabled>
              <MoreHorizontal className="text-sidebar-foreground/70" />
              <span>No projects found</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
