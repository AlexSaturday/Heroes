import React, { useState, useEffect } from 'react'
import { useDrawingStore } from '../../store/drawingStore'
import './session.css'
import { useLocation } from 'react-router-dom'
import { races } from '../../data/races/races'
import type { RaceItem, Tool, EraserMode, Line } from '../../types'
import { DrawingCanvas } from '../DrawingCanvas'
import { FaPaintBrush, FaEraser, FaUndo, FaCompress, FaExpand} from 'react-icons/fa'

export const Session: React.FC = () => {
  
  const location = useLocation()
  const selectedRaceSlug = location.state?.selectedRace
  const selectedRace: RaceItem | undefined = races.find(
    race => race.slug === selectedRaceSlug  
  )

  const { 
    isExpanded, 
    toggleExpanded,
    currentTool,
    setTool,
    eraserMode, 
    setEraserMode,
    showEraserTooltip,
    showTooltip,
    hideTooltip,
    lines,
    setLines,
    undo
  } = useDrawingStore();

  
  const handleEraserClick = () =>{
    if (currentTool === 'eraser'){
      // setEraserMode(prev => prev === 'points' ? 'lines': 'points')
      showTooltip()
      setTimeout(() => {
        hideTooltip()
      }, 2000);
    } else{
      setTool('eraser')
      setEraserMode('lines')
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
                onClick={() => setTool('brush')}
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

              {/* <button
                className="tool-btn"
                onClick={() => {
                  // Тест store
                  const state = useDrawingStore.getState()
                  console.log('Store state:', state)
                }}
                title="Тест store"
              >
                <span>🧪</span>
                <span>Тест Store</span>
              </button> */}

              <button
                className="tool-btn"
                onClick={undo}
                title="Отменить последнее действие"
              >
                <FaUndo className="tool-icon" />
                <span>Отмена</span>
              </button>
              <button
                className={`tool-btn ${isExpanded ? 'active' : ''}`}
                onClick={toggleExpanded}
                title={isExpanded ? "Уменьшить область" : "Расширить область"}
              >
                <span>{isExpanded ? <FaCompress className="tool-icon" /> : <FaExpand className="tool-icon" />}</span>
                <span>{isExpanded ? 'Уменьшить' : 'Расширить'}</span>
              </button>
            </div>
        </aside>
        <main className="session-main">
            <div className="race-display">
                <h2>Вы играете за: {selectedRace.name}</h2>
                
                <div className="canvas-wrapper">

                    <div className="tablet-container">
                        <img 
                            src={selectedRace.sessionImage} 
                            alt={selectedRace.name}
                            className="background-image"
                        />
                        

                        <DrawingCanvas
                            
                            lines={lines}
                            setLines={setLines} 
                            width={isExpanded ? 1641 : 1241}
                            height={1755}  
                            className={`drawing-canvas ${currentTool} ${isExpanded ? 'expanded' : ''}`}
                            currentTool={currentTool}
                            eraserMode={eraserMode}
                        />
                    </div>
                </div>
            </div>
        </main>
         {showEraserTooltip &&(
          <div className='tooltip'>
          Режим: {eraserMode === 'points' ? 'Стирание точек' : "Стирание линий"}
          </div>
          )}
    </div>
)
}

export default Session


