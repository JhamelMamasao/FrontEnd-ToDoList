import { useNavigate } from 'react-router-dom'
import logo from '../assets/Logoonly.svg'
import { RegisterForm } from '../components/register-form'


export function Register({ className, ...props}: React.ComponentProps<"div">) {

    return (
    <div className='grid min-h-svh lg:grid-cols-2 bg-white'>
        <div className='flex flex-col gap-2 p-6 md:p-10'>
            <div className='flex justify-center gap-2 md:justify-start'>
                <a href='#' className="flex items-center gap-2 font-medium">
                      <div className="flex w-8 h-8 md:w-10 md:h-10 items-center justify-center rounded-md bg-green text-primary-foreground">
                            <img src={logo} className='w-3 h-3 md:w-4 md:h-4'/>
                    </div>
                     <p className="font-bold">
                        Higos<span className=" font-medium ">Kayan</span>
                    </p>
                </a>
            </div>
           <div className='flex flex-1 lg:pr-40 items-center justify-center'>
                <div className='w-full max-w-xs'>
                    <RegisterForm />
                </div>
            </div>
        </div>
        <div className="relative hidden bg-green lg:block">
        
      </div>
    </div>
  )
}
    

