import React from 'react'
import { BrowserRouter as Router , Routes , Route  } from 'react-router-dom'
import Map from "./components/Map"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Map/>}></Route>
      </Routes>
    </Router>
  )
}

export default App