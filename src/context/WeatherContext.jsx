import React, { createContext, useReducer, useCallback, useEffect } from 'react'

export const WeatherContext = createContext(null)

const initialState = {
  weather: null,
  loading: false,
  error: null,
  units: 'metric', // or 'imperial'
  favorites: [],
}

function weatherReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null }
    case 'SET_WEATHER':
      return { ...state, weather: action.payload, loading: false, error: null }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'TOGGLE_UNITS':
      return { ...state, units: state.units === 'metric' ? 'imperial' : 'metric' }
    case 'ADD_FAV':
      if (state.favorites.includes(action.payload)) return state
      return { ...state, favorites: [...state.favorites, action.payload] }
    case 'REMOVE_FAV':
      return { ...state, favorites: state.favorites.filter((f) => f !== action.payload) }
    case 'SET_FAVS':
      return { ...state, favorites: action.payload }
    default:
      return state
  }
}

export function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState)

  // Persist favorites in localStorage
  useEffect(() => {
    const raw = localStorage.getItem('weather:favorites')
    if (raw) dispatch({ type: 'SET_FAVS', payload: JSON.parse(raw) })
  }, [])

  useEffect(() => {
    localStorage.setItem('weather:favorites', JSON.stringify(state.favorites))
  }, [state.favorites])

  const apiKey = import.meta.env.VITE_OWM_KEY
  const baseUrl = 'https://api.openweathermap.org/data/2.5'

  const fetchWeather = useCallback(async (url) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      // Using Promises via fetch
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      // Normalize
      const normalized = {
        city: data.name,
        country: data.sys?.country,
        temp: data.main?.temp,
        feels_like: data.main?.feels_like,
        weather: data.weather?.[0]?.main,
        desc: data.weather?.[0]?.description,
        humidity: data.main?.humidity,
        wind: data.wind?.speed,
      }
      dispatch({ type: 'SET_WEATHER', payload: normalized })
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }, [])

  const fetchByCity = useCallback(
    (city) => {
      const units = state.units
      const q = encodeURIComponent(city)
      const url = `${baseUrl}/weather?q=${q}&units=${units}&appid=${apiKey}`
      // call fetchWeather (returns a promise)
      fetchWeather(url)
    },
    [fetchWeather, state.units, apiKey]
  )

  const fetchByCoords = useCallback(
    (lat, lon) => {
      const units = state.units
      const url = `${baseUrl}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
      fetchWeather(url)
    },
    [fetchWeather, state.units, apiKey]
  )

  const toggleUnits = useCallback(() => dispatch({ type: 'TOGGLE_UNITS' }), [])

  const addFav = useCallback((city) => dispatch({ type: 'ADD_FAV', payload: city }), [])
  const removeFav = useCallback((city) => dispatch({ type: 'REMOVE_FAV', payload: city }), [])

  // When units change, refetch current city
  useEffect(() => {
    if (state.weather) {
      fetchByCity(state.weather.city)
    }
  }, [state.units])

  const actions = {
    fetchByCity,
    fetchByCoords,
    toggleUnits,
    addFav,
    removeFav,
  }

  return (
    <WeatherContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </WeatherContext.Provider>
  )
}