import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from '../ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { BadgeCheck, Bell, ChevronsUpDown, LogOut, Settings } from 'lucide-react'
import { getMe } from '../../api/auth'
import { useFetchData } from '../../hooks/useFetchData'


type User = {
  name: string
  email: string
  profile_pic: string
}

export function NavUser({ logout }: { logout: () => void }) {
  const { isMobile } = useSidebar()
  const { data: user, loading } = useFetchData<User>(
    'user-profile',
    () => getMe(),
    { ttl: 10 * 60 * 1000, deduplicate: true } // 10 min cache
  )

if (loading || !user) {
  return <span>Loading...</span>
}
  

     
  return (
    
    <SidebarMenu className='pb-4 px-1'>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" >
                       <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user?.profile_pic} alt={user?.name} />
                            <AvatarFallback className="rounded-lg">{user?.name?.split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")
                                                                    .toUpperCase()}</AvatarFallback>
                            
                        </Avatar>
                        <div className='grid flex-1 text-left text-sm leading-tight'>
                            <span className='truncate font-medium'>{user?.name}</span>
                            <span className='truncate font-xs'>{user?.email}</span>
                        </div>
                        <ChevronsUpDown className='ml-auto size-4'/>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg' side={isMobile ? "bottom" : "right"} align='end' sideOffset={4}>
                     <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg bg-greens">
                            <AvatarImage src={user?.profile_pic} alt={user?.name} />
                            <AvatarFallback className="rounded-lg">{user?.name?.split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")
                                                                    .toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{user?.name}</span>
                            <span className="truncate text-xs">{user?.email}</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                     <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <BadgeCheck/>
                            Account
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                             <Bell />
                          Notification
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                             <Settings />
                            Setting
                        </DropdownMenuItem>
                          <DropdownMenuSeparator/>
                          <DropdownMenuItem onClick={logout}>
                            <LogOut />
                            Log out
                          </DropdownMenuItem>
                </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
  )
}
       

