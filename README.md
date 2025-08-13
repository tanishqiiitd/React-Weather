# 🌦 React Weather App

This is a sleek and responsive weather application built with **React + Vite**.  
It fetches real-time weather data from the **OpenWeatherMap API** and demonstrates a full range of modern React features — from basic hooks to context, refs, and promise-based API handling.

---

## ✨ Features

- **Live Weather Search** — Get current conditions for any city in the world.
- **Favorites Management** — Quickly save & revisit your favorite cities.
- **Unit Toggle** — Switch between Celsius and Fahrenheit.
- **Theme-aware Styling** — Elegant gradient UI with custom CSS variables.
- **Responsive Design** — Optimized for both mobile and desktop screens.

---

## 🛠️ Core Mechanisms & Technologies Used

Our Weather App leverages a modern **React.js** tech stack and follows best practices for performance, maintainability, and user experience.

---

### ⚛️ **React Fundamentals**

- **`useState`**
  - Manages dynamic states like:
    - Weather data
    - Selected city
    - Temperature units (°C / °F)
    - Favorite cities list
    - Loading and error states
  - Example:
    ```javascript
    const [city, setCity] = useState("Delhi");
    const [weather, setWeather] = useState(null);
    ```

- **`useEffect`**
  - Automatically fetches updated weather data whenever:
    - The user changes the city
    - The temperature unit changes
  - Example:
    ```javascript
    useEffect(() => {
      fetchWeatherData(city, unit);
    }, [city, unit]);
    ```

- **`useRef`**
  - Stores a reference to the search input field without triggering re-renders on value change.
  - Improves performance in forms and DOM manipulations.

- **`useMemo`**
  - Optimizes performance by memoizing expensive computations (e.g., temperature conversions).
  - Prevents recalculations unless dependencies change.

- **`useCallback`**
  - Memoizes event handlers like "Add to Favorites" or "Search" to prevent unnecessary re-renders.

---

### 🌐 **Context API**

- **`createContext` + `useContext`**
  - Stores global preferences such as:
    - Unit of temperature (°C / °F)
    - Favorite cities list
  - Avoids **prop drilling** and ensures seamless state sharing between components.
  - Example:
    ```javascript
    const WeatherContext = createContext();
    ```

---

### 🔄 **Async Data Handling**

- **`fetch`**
  - Retrieves live weather data from the **OpenWeatherMap API**.

- **Async/Await**
  - Provides a cleaner and more readable syntax for API calls.

- **Error Handling**
  - Displays meaningful error messages when:
    - A city is not found
    - The API request fails
  - Example:
    ```javascript
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
    } catch (error) {
      setError(error.message);
    }
    ```

---

### 🚀 **Performance Optimizations**
- **Caching recent searches** to speed up repeated queries.
- **Debouncing user input** in the search bar to reduce API calls.
- **Lazy loading** components for faster initial load time.

---

### 📡 **API Integration**
- **OpenWeatherMap API**
  - Fetches:
    - Current weather
    - Temperature
    - Humidity
    - Wind speed
    - Weather conditions
- Supports metric & imperial units.

---

### 🎯 **Key Features Enabled by These Technologies**
- Real-time weather updates based on user search.
- Persistent favorite cities using browser storage.
- Fully responsive UI for desktop and mobile.
- Smooth and optimized user experience.


### **Vite Environment Variables**
- `.env` file for storing your API key securely:
  ```env
  VITE_OWM_KEY=your_api_key_here


### **Preview**

<img width="1189" height="659" alt="image" src="https://github.com/user-attachments/assets/5f815e1a-9114-4b40-b679-d3fc64c82fdd" />


<img width="1085" height="737" alt="image" src="https://github.com/user-attachments/assets/8a09c659-c756-469e-a823-4b14f25b87ab" />

