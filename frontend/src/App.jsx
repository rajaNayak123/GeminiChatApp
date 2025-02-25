import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import 'remixicon/fonts/remixicon.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppRoutes/>
    </>
  )
}

export default App
