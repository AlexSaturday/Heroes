
import type { Erasure, Line } from "./types";
import { isPointInErasureArea, isLineTouchedByEraser } from "./utils/eraserLogic";


interface UseSmartEraserProps {
    lines: Line[]
    setLines: (lines: Line[]) => void
    eraserMode: 'points' | 'lines'
    eraserSize?: number
}

export const useSmartEraser = ({
    lines,
    setLines,
    eraserMode,
    eraserSize = 20
}: UseSmartEraserProps) => {
    
    // Режим 1: Стирание точек в области
    const erasePointsInArea = (erasure: Erasure) => {
        const updatedLines = lines.map(line =>{
            const keptPoints = line.points.filter(point =>{
                return !isPointInErasureArea(point, erasure)
            })
            return{
                ...line,
                points: keptPoints.length > 1 ? keptPoints : []
            }
        }).filter(line => line.points.length > 1)

        setLines(updatedLines)
    }

    // Режим 2: Удаление целых линий
    const eraseWholeLines = (erasure: Erasure) =>{
        const updatedLines = lines.filter(line =>{
            return !isLineTouchedByEraser(line, erasure)
        })
        setLines(updatedLines)
    }

    //Основаная функция стирания
    const smartErase = (erasure: Erasure) =>{
        if (eraserMode === 'lines'){
            eraseWholeLines(erasure)
        }else{
            erasePointsInArea(erasure)
        }
    }
    return {smartErase}
}