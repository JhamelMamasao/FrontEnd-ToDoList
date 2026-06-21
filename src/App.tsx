import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { Project } from './pages/Project'

function App() {

  return (
    <>
    <div className='bg-[#f1f1f1] min-h-screen m-0'>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/project/:projectId" element={<Project/>}/>
          <Route path="/project" element={<Project/>}/>
         </Routes>
    </div>
      
    </>
  )
}

export default App
