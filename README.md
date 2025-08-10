# 🌦 WeatherSense — React Weather App

WeatherSense is a sleek and responsive weather application built with **React + Vite**.  
It fetches real-time weather data from the **OpenWeatherMap API** and demonstrates a full range of modern React features — from basic hooks to context, refs, and promise-based API handling.

---

## ✨ Features

- **Live Weather Search** — Get current conditions for any city in the world.
- **Favorites Management** — Quickly save & revisit your favorite cities.
- **Unit Toggle** — Switch between Celsius and Fahrenheit.
- **Theme-aware Styling** — Elegant gradient UI with custom CSS variables.
- **Responsive Design** — Optimized for both mobile and desktop screens.

---

## 🛠️ Core Mechanisms & Tech Used

### **React Fundamentals**
- **`useState`** — Manage weather data, city input, units, favorites, and loading/error states.
- **`useEffect`** — Trigger API calls when the selected city or units change.
- **`useRef`** — Keep track of the search input field without triggering re-renders.
- **`useMemo`** — Avoid unnecessary calculations for derived values (e.g., temperature conversions).
- **`useCallback`** — Optimize event handlers for better performance.

### **Context API**
- **`createContext` + `useContext`** — Share global state (like unit preference and favorite cities) across components without prop drilling.

### **Async & Promises**
- **`fetch`** — Call OpenWeatherMap’s REST API.
- **Async/Await** — Handle asynchronous data flow cleanly.
- **Error Handling** — Graceful UI feedback for failed requests or invalid city names.

### **Vite Environment Variables**
- `.env` file for storing your API key securely:
  ```env
  VITE_OWM_KEY=your_api_key_here
