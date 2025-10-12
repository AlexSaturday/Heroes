import React from 'react'
import './session.css'
import { useLocation } from 'react-router-dom'
import { races, type RaceItem } from '../../data/races/races'
import { DrawingCanvas } from '../DrawingCanvs'


export const Session: React.FC = () => {

  const location = useLocation()
  console.log('Весь location:', location)
  console.log('Location state:', location.state)
  const selectedRaceSlug = location.state?.selectedRace
  console.log('SelectedRaceSlug:', selectedRaceSlug)

  const selectedRace: RaceItem | undefined = races.find(
    race => race.slug === selectedRaceSlug
  )
  console.log('Найденная раса:', selectedRace)

  if (!selectedRace) {
    return (
      <div className="session-root">
        <div>Раса не найдена. Вернитесь к выбору расы.</div>
      </div>
    )
  }


  return (
    <div className="session-root">
        <aside className="session-aside">
            Панель инструментов
        </aside>
        <main className="session-main">
            <div className="race-display">
                <h2>Вы играете за: {selectedRace.name}</h2>
                
                <div className="image-with-canvas">
                    {/* Картинка расы как фон */}
                    <img 
                        src={selectedRace.sessionImage} 
                        alt={selectedRace.name}
                        className="background-image"
                    />
                    
                    {/* Canvas для рисования поверх */}
                    <DrawingCanvas 
                        width={1241}      // ← ширина планшета
                        height={1755}     // ← высота планшета  
                        className="drawing-canvas"
                    />
                </div>
            </div>
        </main>
    </div>
)
}

export default Session


