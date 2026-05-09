import { useEffect, useState } from "react"
import { getMe } from "../api/auth"
import { showTasksinTable } from "../api/task"
import { normalizeTasks } from "../components/Task/tasks"
import { useNavigate } from "react-router-dom" 
import type { Task } from "../components/Task/columns"

export const useDashboardData = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const navigate = useNavigate()
    

    useEffect(() => {
    const abortController = new AbortController()
    
    const verifyUser = async () => {
      try {
        await getMe(abortController.signal)
      } catch (error) {
        if (!abortController.signal.aborted) {
          localStorage.removeItem("token")
          navigate("/", { replace: true })
        }
      }
    }
    
    verifyUser()
    

    return () => {
      abortController.abort()
    }
  }, [navigate])

  useEffect(() => {
    const abortController = new AbortController()

    const loadTasks = async () => {
      try {
        const response = await showTasksinTable(abortController.signal)
        const normalizedTasks = normalizeTasks(response)
        setTasks(normalizedTasks)
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Failed to load tasks", error)
        }
      }
    }

    loadTasks()

    return () => {
      abortController.abort()
    }
  }, [])

  return { tasks }
}