import React, { useState, useEffect } from 'react'
import './session.css'
import { useLocation } from 'react-router-dom'
import { races } from '../../data/races/races'
import type { RaceItem, Tool, EraserMode, Line } from '../../types'
import { DrawingCanvas } from '../DrawingCanvas'
import { FaPaintBrush, FaEraser, FaUndo, FaCompress, FaExpand} from 'react-icons/fa'

export const Session: React.FC = () => {

  const [lines, setLines] = useState<Line[]>([])



  
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation()
  const selectedRaceSlug = location.state?.selectedRace
  const selectedRace: RaceItem | undefined = races.find(
    race => race.slug === selectedRaceSlug  
  )

  const [currentTool, setCurrentTool] = useState<Tool>('brush')
  const [eraserMode, setEraserMode] = useState<EraserMode>('lines')
  const [showEarsureTooltip, setshowEarsureTooltip] = useState(false)
  const [history, setHistory] = useState<Line[][]>([]);

  const updateLines = (newLines: Line[]) => {
    console.log('=== UPDATE LINES ===');
    console.log('Current lines:', lines.length);
    console.log('New lines:', newLines.length);
    // ✅ Гарантированно сохраняем текущее состояние
    setLines(currentLines => {
      setHistory(prev => [...prev, currentLines]); // Сохраняем перед изменением
      return newLines; // Возвращаем новое состояние
    });
  };
  
  const handleUndo = () => {
    console.log('=== UNDO ===');
    console.log('History length:', history.length);
    console.log('Current lines:', lines.length);
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setLines(previousState);
      setHistory(prev => prev.slice(0, -1)); 
    }
  };



  
  const handleEraserClick = () =>{
    if (currentTool === 'eraser'){
      // setEraserMode(prev => prev === 'points' ? 'lines': 'points')
      setshowEarsureTooltip(true)
      

      setTimeout(() => {
        setshowEarsureTooltip(false)
      }, 2000);
    } else{
      setCurrentTool('eraser')
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

              

              <button
                className="tool-btn"
                onClick={handleUndo}
                title="Отменить последнее действие"
              >
                <FaUndo className="tool-icon" />
                <span>Отмена</span>
              </button>
              <button
                className={`tool-btn ${isExpanded ? 'active' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
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
                            setLines={updateLines} 
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
         {showEarsureTooltip &&(
          <div className='tooltip'>
          Режим: {eraserMode === 'points' ? 'Стирание точек' : "Стирание линий"}
          </div>
          )}
    </div>
)
}

export default Session


