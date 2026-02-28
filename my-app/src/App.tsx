import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home/home.tsx'
import { RaceSelection } from './components/Race-selection/race-selection'
import { Session } from './components/Session/session'
import { Canvas } from './components/draw-mod/canvas.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/race-selection" element={<RaceSelection />} />
        <Route path="/session" element={<Session />} />
        <Route path="/canvas" element={<Canvas />} />
      </Routes>
    </Router>
  )
}

export default App

