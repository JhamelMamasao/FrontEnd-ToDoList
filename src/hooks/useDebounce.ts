import { useEffect, useRef } from 'react'

export function useDebounce<T extends (...args: any[]) => Promise<any>>(
  callback: T,
  delay: number = 500
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (abortControllerRef.current) abortControllerRef.current.abort()
    }
  }, [])

  return ((...args: any[]) => {
    return new Promise((resolve, reject) => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Abort previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()

      // Set new timeout
      timeoutRef.current = setTimeout(async () => {
        try {
          const result = await callback(...args)
          resolve(result)
        } catch (err) {
          reject(err)
        }
      }, delay)
    })
  }) as T
}
