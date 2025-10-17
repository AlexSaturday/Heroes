import React, { useState } from 'react'
import './session.css'
import { useLocation } from 'react-router-dom'
import { races, type RaceItem } from '../../data/races/races'
import { DrawingCanvas } from '../DrawingCanvs'
import { FaPaintBrush, FaEraser, FaUndo} from 'react-icons/fa'


type Tool = 'brush'| 'eraser'

export const Session: React.FC = () => {

  const location = useLocation()
  //console.log('Весь location:', location)
  //console.log('Location state:', location.state)
  const selectedRaceSlug = location.state?.selectedRace
  //console.log('SelectedRaceSlug:', selectedRaceSlug)

  const selectedRace: RaceItem | undefined = races.find(
    race => race.slug === selectedRaceSlug  
  )
  //console.log('Найденная раса:', selectedRace)

  const [currentTool, setCurrentTool] = useState<Tool>('brush')

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
            <div className="tool-panel">
              <h3>Инструменты</h3>
              <button
                className= {`tool-btn ${currentTool === 'brush' ? 'active': ''}`}
                onClick={() => setCurrentTool('brush')}
                title='кисть'
              >
                <FaPaintBrush className='tool-icn' />
                <span>кисть</span>
              </button>
              <button
                className={`tool-btn ${currentTool === 'eraser' ? 'active' : ''}`}
                onClick={() => setCurrentTool('eraser')}
                title="Ластик"
              >
                <FaEraser className="tool-icon" />
                <span>Ластик</span>
              </button>
              <button
                className="tool-btn"
                onClick={() => console.log('Undo pressed')}
                title="Отменить последнее действие"
              >
                <FaUndo className="tool-icon" />
                <span>Отмена</span>
              </button>
            </div>
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
                        width={1241}      //  ширина планшета
                        height={1755}     //  высота планшета  
                        className={`drawing-canvas ${currentTool}`}
                        currentTool={currentTool}
                    />
                </div>
            </div>
        </main>
    </div>
)
}

export default Session


