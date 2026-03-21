import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

function App() {


  return (
    <>
    <div className='bg-[#f1f1f1] min-h-screen m-0'>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
         </Routes>
    </div>
      
    </>
  )
}

export default App
