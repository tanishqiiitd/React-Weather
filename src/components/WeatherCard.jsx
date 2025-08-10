import React, { useContext, useMemo, useRef, useLayoutEffect } from 'react'
import { WeatherContext } from '../context/WeatherContext'

export default function WeatherCard({ data }) {
  const { actions, state } = useContext(WeatherContext)
  const { addFav, removeFav } = actions
  const cardRef = useRef(null)

  // Auto animate (layout effect example)
  useLayoutEffect(() => {
    const el = cardRef.current
    if (!el) return
    el.style.opacity = 0
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 250ms ease'
      el.style.opacity = 1
    })
  }, [data.city])

  const isFav = state.favorites.includes(data.city)

  const temp = useMemo(() => {
    // Memoize formatted temperature with unit
    const unit = state.units === 'metric' ? '°C' : '°F'
    return `${Math.round(data.temp)}${unit}`
  }, [data.temp, state.units])

  return (
    <article ref={cardRef} className="card">
      <div className="card-head">
        <h2>{data.city}, {data.country}</h2>
        <div className="fav">
          <button
            onClick={() => (isFav ? removeFav(data.city) : addFav(data.city))}
            className="fav-toggle"
            aria-pressed={isFav}
          >
            {isFav ? '★' : '☆'}
          </button>
        </div>
      </div>

      <div className="main-info">
        <div className="temp">{temp}</div>
        <div className="desc">{data.weather} — {data.desc}</div>
      </div>

      <div className="meta">
        <div>Feels like: {Math.round(data.feels_like)}</div>
        <div>Humidity: {data.humidity}%</div>
        <div>Wind: {data.wind} m/s</div>
      </div>
    </article>
  )
}