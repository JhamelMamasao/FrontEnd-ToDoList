import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'

function App() {


  return (
    <>
    <div className='bg-[#f1f1f1] min-h-screen m-0'>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />}/>
         </Routes>
    </div>
      
    </>
  )
}

export default App
