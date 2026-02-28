import { create } from "zustand";
import type { Line, Tool, EraserMode } from "../types";

interface DrawingState{
    lines: Line[],
    history: Line[][],
    currentTool: Tool,
    eraserMode: EraserMode,
    isExpanded: boolean,
    showEraserTooltip: boolean


    setLines: (lines: Line[]) => void
    undo: () => void
    setTool: (tool: Tool) => void
    setEraserMode: (mode: EraserMode) => void
    toggleExpanded: () => void
    showTooltip: () => void
    hideTooltip: () => void
}


export const useDrawingStore = create<DrawingState>((set, get) => ({
    lines: [],
    history: [],
    currentTool: 'brush',
    eraserMode: 'lines',
    isExpanded: false,
    showEraserTooltip: false,

    setLines: (newLines) => {
        console.log('setLines called:', newLines.length)
        set((state) => ({
            history: [...state.history, state.lines],
            lines: newLines
        }))
    },

    undo: () => {
        console.log('undo called')
        set((state) => {
          if (state.history.length === 0) {
            console.log('Nothing to undo')
            return state 
          }
          
          const previousState = state.history[state.history.length - 1]
          console.log('Restoring previous state:', previousState.length)
          
          return {
            lines: previousState,
            history: state.history.slice(0, -1) // Убираем последний элемент
          }
        })
      },
    
      setTool: (tool) => {
        console.log('setTool called:', tool)
        set({ currentTool: tool })
      },
    
      setEraserMode: (mode) => {
        console.log('setEraserMode called:', mode)
        set({ eraserMode: mode })
      },
    
      toggleExpanded: () => {
        console.log('toggleExpanded called')
        set((state) => ({ 
          isExpanded: !state.isExpanded 
        }))
      },
    
      showTooltip: () => {
        console.log('showTooltip called')
        set({ showEraserTooltip: true })
      },
    
      hideTooltip: () => {
        console.log('hideTooltip called')
        set({ showEraserTooltip: false })
      }
}))