import React, { useState, useRef, useContext, useCallback, useEffect } from 'react'
import { WeatherContext } from '../context/WeatherContext'
import useDebounce from '../hooks/useDebounce'

export default function Search() {
  const { actions } = useContext(WeatherContext)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  // focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Debounced search to avoid rapid API calls
  useDebounce(
    () => {
      if (query.trim().length > 0) actions.fetchByCity(query.trim())
    },
    700,
    [query]
  )

  const handleSearch = useCallback((e) => {
    e.preventDefault()
    if (query.trim()) actions.fetchByCity(query.trim())
  }, [query, actions])

  const useMyLocation = useCallback(() => {
    if (!navigator.geolocation) return alert('Geolocation not supported')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        actions.fetchByCoords(latitude, longitude)
      },
      (err) => alert('Could not get location: ' + err.message)
    )
  }, [actions])

  return (
    <section className="search">
      <form onSubmit={handleSearch} className="search-form">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city (e.g. Delhi)"
        />
        <button type="submit">Search</button>
        <button type="button" onClick={useMyLocation}>Use my location</button>
      </form>
    </section>
  )
}