import { AnimatePresence } from 'framer-motion'
import { useLocation, useRoutes } from 'react-router-dom'
import routes from './routes/AppRoutes.jsx'

function App() {
  const location = useLocation()
  const element = useRoutes(routes, location)

  return <AnimatePresence mode="wait">{element}</AnimatePresence>
}

export default App
