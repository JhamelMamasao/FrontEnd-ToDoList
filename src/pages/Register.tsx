import logo1 from '../assets/logo.svg'
import google from '../assets/Google.svg'
import facebook from '../assets/Facebook.svg'
import { useNavigate } from 'react-router-dom'


export const Register = () => {
    const navigate = useNavigate()

  return (
    <div className='flex h-screen'>
        {/* Left */}
        <div className='w-1/2 flex relative'>
             <div className='flex items-baseline p-8'>
                    <img src={logo1} alt="logo" className='w-35' />
            </div>
            <div className='flex justify-center items-center flex-col'>
                <div className='flex justify-baseline flex-col'>
                    <h1 className='font-raleway font-bold text-2xl text-left text-gray-text' >Get Started Now!</h1>
                    <h1 className='font-raleway font-medium text-sm text-gray-subtext mt-1'>Already have an account? <span onClick={() => navigate('/')} className='text-green font-bold'>Login</span></h1>
                    <div className='flex flex-row items-center justify-center input-group gap-5'>
                         <div className='input-group flex justify-base mt-5 flex-1'>
                            <label>First Name</label>
                            <input type="name" className='font-raleway font-medium text-base'></input>
                        </div>
                         <div className='input-group flex justify-base mt-5 flex-1'>
                            <label>Last Name</label>
                            <input type="emnameail" className='font-raleway font-medium text-base'></input>
                        </div>
                    </div>
                    <div className='input-group flex justify-base mt-5'>
                        <label>Email Address</label>
                        <input type="email" className='font-raleway font-medium text-base'></input>
                    </div>
                    <div className='input-group flex justify-base mt-5'>
                        <label>Password</label>
                        <input type="password" className='font-raleway font-medium text-base'></input>
                    </div>
                     <div className='input-group flex justify-base mt-5'>
                        <label>Confirm Password</label>
                        <input type="password" className='font-raleway font-medium text-base'></input>
                    </div>

                    {/* Accept terms and condition */}
                    <div className='flex justify-between mt-2'>
                        <div className='flex flex-row justify-center items-center gap-2'>
                            <input type='checkbox'/>
                            <p className='font-raleway font-semibold text-gray-text text-xs'>I agree to the <span className='font-bold text-green'>Accept term & condition </span></p>
                        </div>
                    </div>

                    {/* Button */}
                    <div className='button bg-green p-3 mt-5 text-white font-raleway rounded-lg text-sm flex items-center font-semibold justify-center'>
                        Create Account
                    </div>

                     <div className='flex items-center w-full text-center mt-5'>
                        <div className="flex-1 border-t border-gray-subtext"></div>
                        <span className="px-3 text-gray-subtext whitespace-nowrap text-xs font-raleway font-medium">
                            Instant Login
                        </span>
                        <div className="flex-1 border-t border-gray-subtext"></div>
                    </div>

                    {/* instant login */}
                    <div className='flex flex-row items-center justify-center mt-5 gap-15 '>
                        <div className='flex flex-row items-center gap-3'>
                            <img src={facebook} alt='google'/>
                            <p className='text-sm font-raleway font-medium text-gray-subtext'>Continue with Facebook</p>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <img src={google} alt='google'/>
                            <p className='text-sm font-raleway font-medium text-gray-subtext'>Continue with Google</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className='absolute bottom-6 left-0 right-25 text-center'>
                <p className='font-raleway text-xs text-gray-subtext'>Terms and conditions | Privacy policy</p>
            </footer>
        </div>

        {/* Right */}
        <div className='w-1/2 bg-green flex items-end justify-end p-8 text-white '>
               <h1 className='font-bold text-lg font-raleway'>Higos<span className='font-medium'>Kayan</span></h1>
        </div>
    </div>
  )
}
