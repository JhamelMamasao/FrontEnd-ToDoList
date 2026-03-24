import React from 'react'
import { SidebarMenu } from './ui/sidebar'

import logoOnly from '../assets/Logoonly.svg'

export const NavLogo = () => {
  return (
    <SidebarMenu>
        <div className="flex items-center w-full transition-all duration-300 px-3 py-3 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center flex-row gap-2">
               <div className='w-11 h-11 bg-green flex items-center justify-center rounded-2xl  '>
                 <img
                    src={logoOnly}
                    className="w-5 h-5 group-data-[collapsible=icon]:block"
                    />
                
               </div>
               <p className="font-raleway text-sm font-bold flex items-center group-data-[collapsible=icon]:hidden">
                    Higos<span className="text-sm font-medium ">Kayan</span>
            </p>

        </div>
    </SidebarMenu>
  )
}
