import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'

function App() {
  const token = localStorage.getItem('token')


  return (
    <>
    <div className='bg-[#f1f1f1] min-h-screen m-0'>
         <Routes>
            <Route path="/" element={<Login />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={token ? <Dashboard/> : <Navigate to="/" replace/>}/>
         </Routes>
    </div>
      
    </>
  )
}

export default App
