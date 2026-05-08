import { useEffect, useState } from 'react'

export const useFetch = (loader, fallback = []) => {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    loader()
      .then((result) => mounted && setData(result?.length || result?.totalBookings ? result : fallback))
      .catch(() => mounted && setData(fallback))
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
    // Loader/fallback are intentionally captured on mount for simple dashboard fetches.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading, setData }
}
