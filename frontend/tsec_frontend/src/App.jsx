import React from 'react'
import { BrowserRouter as Router , Routes , Route  } from 'react-router-dom'
import Map from "./components/Map"
import AuthForm from './auth/AuthForm'
const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route  path="/" element={<Map/>}></Route>
    //   </Routes>
    // </Router>
    <div>
      <AuthForm/>
    </div>
  )
}

export default App