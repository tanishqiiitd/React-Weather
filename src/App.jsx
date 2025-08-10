import React, { useContext } from 'react'
import Search from './components/Search'
import WeatherCard from './components/WeatherCard'
import { WeatherContext } from './context/WeatherContext'

export default function App() {
  const { state, actions } = useContext(WeatherContext)

  return (
    <div className="app">
      <header className="header">
        <h1>Weather App</h1>
        <div className="controls">
          <label className="switch">
            <input
              type="checkbox"
              checked={state.units === 'imperial'}
              onChange={() => actions.toggleUnits()}
            />
            <span className="slider" />
          </label>
          <span className="units-label">{state.units === 'metric' ? '°C' : '°F'}</span>
        </div>
      </header>

      <main className="main">
        <Search />

        {state.loading && <div className="loading">Loading...</div>}

        {state.error && <div className="error">{state.error}</div>}

        {state.weather && <WeatherCard data={state.weather} />}

        <section className="favs">
          <h3>Favorites</h3>
          <div className="fav-list">
            {state.favorites.length === 0 && <em>No favorites yet</em>}
            {state.favorites.map((c) => (
              <button
                key={c}
                className="fav-btn"
                onClick={() => actions.fetchByCity(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">Built with React hooks • uses Promises & Context</footer>
    </div>
  )
}