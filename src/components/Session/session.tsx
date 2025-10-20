import React, { useState } from 'react'
import './session.css'
import { useLocation } from 'react-router-dom'
import { races } from '../../data/races/races'
import type { RaceItem, Tool, EraserMode } from '../../types'
import { DrawingCanvas } from '../DrawingCanvas'
import { FaPaintBrush, FaEraser, FaUndo} from 'react-icons/fa'

export const Session: React.FC = () => {

  const location = useLocation()
  const selectedRaceSlug = location.state?.selectedRace
  const selectedRace: RaceItem | undefined = races.find(
    race => race.slug === selectedRaceSlug  
  )

  // Стейты для инструментов
  const [currentTool, setCurrentTool] = useState<Tool>('brush')
  const [eraserMode, setEraserMode] = useState<EraserMode>('points')
  const [showEarsureTooltip, setshowEarsureTooltip] = useState(false)

  const handleEraserClick = () =>{
    if (currentTool === 'eraser'){
      setEraserMode(prev => prev === 'points' ? 'lines': 'points')
      setshowEarsureTooltip(true)

      setTimeout(() => {
        setshowEarsureTooltip(false)
      }, 2000);
    } else{
      setCurrentTool('eraser')
      setEraserMode('points')
    }
  }

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
                <FaPaintBrush className='tool-icon' />
                <span>кисть</span>
              </button>

              <button
                className={`tool-btn ${currentTool === 'eraser' ? 'active' : ''} ${
                 currentTool === 'eraser' ? `eraser-${eraserMode}` : ''
                }`}
                onClick={handleEraserClick}
                title="Ластик"
              >
                <FaEraser className="tool-icon" />
                <span>Ластик</span>

                {currentTool === 'eraser' && (
                  <span className='mode-indicator'>
                    {eraserMode === 'points' ? '•' : '|'}
                  </span>
                )}
              </button>

              {showEarsureTooltip &&(
                <div className='tooltip'>
                  Режим: {eraserMode === 'points' ? 'Стиарние точек' : "Стирание линий"}
                </div>
              )}

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
                        eraserMode={eraserMode}
                    />
                </div>
            </div>
        </main>
    </div>
)
}

export default Session


