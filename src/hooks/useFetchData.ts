import { useEffect, useRef, useState } from 'react'

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

const requestCache = new Map<string, CacheEntry<any>>()
const inFlightRequests = new Map<string, Promise<any>>()

export function useFetchData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: {
    ttl?: number // Time to live in milliseconds (default 5 min)
    deduplicate?: boolean // Deduplicate concurrent requests
  }
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const ttl = options?.ttl ?? 5 * 60 * 1000 // 5 minutes default
  const shouldDeduplicate = options?.deduplicate !== false

  useEffect(() => {
    abortControllerRef.current = new AbortController()
    const controller = abortControllerRef.current

    const fetchData = async () => {
      try {
        // Check cache first
        const cached = requestCache.get(key)
        if (cached && Date.now() - cached.timestamp < cached.ttl) {
          setData(cached.data)
          setLoading(false)
          return
        }

        // Check for in-flight request (deduplication)
        if (shouldDeduplicate && inFlightRequests.has(key)) {
          try {
            const result = await inFlightRequests.get(key)
            if (!controller.signal.aborted) {
              setData(result)
              setLoading(false)
            }
          } catch (err) {
            if (!controller.signal.aborted) {
              setError(err instanceof Error ? err : new Error(String(err)))
              setLoading(false)
            }
          }
          return
        }

        // Make the request
        const promise = fetcher()
        inFlightRequests.set(key, promise)

        const result = await promise

        if (!controller.signal.aborted) {
          // Cache the result
          requestCache.set(key, {
            data: result,
            timestamp: Date.now(),
            ttl,
          })

          setData(result)
          setError(null)
          setLoading(false)
        }

        inFlightRequests.delete(key)
      } catch (err) {
        if (!controller.signal.aborted) {
          const error = err instanceof Error ? err : new Error(String(err))
          setError(error)
          setLoading(false)
        }
        inFlightRequests.delete(key)
      }
    }

    fetchData()

    // Cleanup: abort request if component unmounts
    return () => {
      controller.abort()
    }
  }, [key, ttl, shouldDeduplicate])

  return { data, loading, error }
}
