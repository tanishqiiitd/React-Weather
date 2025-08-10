import { useRef, useEffect } from 'react'

export default function useDebounce(callback, delay, deps) {
  const handler = useRef()

  useEffect(() => {
    if (handler.current) clearTimeout(handler.current)
    handler.current = setTimeout(() => {
      callback()
    }, delay)

    return () => clearTimeout(handler.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(deps || [])])
}
