import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import { Home } from './components/Home/home.tsx'
import { RaceSelection } from './components/Race-selection/race-selection'
import { Session } from './components/Session/session'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/race-selection" element={<RaceSelection />} />
        <Route path="/race/:slug" element={<RacePage />} />
        <Route path="/session" element={<Session />} />
      </Routes>
    </Router>
  )
}

export default App

function RacePage() {
  const { slug } = useParams()
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <h1>Вы выбрали: {slug}</h1>
    </div>
  )
}