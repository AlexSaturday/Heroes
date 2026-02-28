// Базовые типы
export interface Point {
    x: number;
    y: number;
}

export interface Line {
    points: Point[];
    color: string;
    width: number;
}

export interface Erasure {
    points: Point[];
    width: number;
}


export type Tool = 'brush' | 'eraser';
export type EraserMode = 'points' | 'lines';


export interface DrawingCanvasProps {
    width: number;
    height: number;
    className?: string;
    currentTool?: Tool;
    eraserMode?: EraserMode;
    lines?: Line[]; 
    setLines?: (lines: Line[]) => void; 
}

export interface RaceItem {
    slug: string;
    name: string;
    src: string;
    sessionImage?: string;
}
