import React, { useEffect, useRef, useState } from 'react';
import type { Point, Line, DrawingCanvasProps, Erasure } from '../types';
import { useSmartEraser } from '../useSmartEraser';


export const DrawingCanvas: React.FC <DrawingCanvasProps> = ({
  lines: externalLines,
  setLines: externalSetLines,
  width, 
  height, 
  className,
  currentTool = 'brush',
  eraserMode = 'points'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing , setIsErasing] = useState(false)
  // const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [color, _setColor] = useState('#000000');
  const [lineWidth, _setLineWidth] = useState(2);
  const [currentErasure, setCurrentErasure] = useState<Erasure | null>(null);

  const lines = externalLines || [];
  const setLines = externalSetLines || (() => {});


  const {getErasedLines} = useSmartEraser({
    lines,
    setLines,
    eraserMode,
    eraserSize: 20
  })

  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault(); 
    return false;
  };

  const getMousePos = (e:React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return {x: 0, y: 0};

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    } 
  }

  const handleMouseDown = (e:React.MouseEvent<HTMLCanvasElement>) => {
    const mousePos = getMousePos(e);
    if (e.button === 0 && currentTool === 'brush'){
      const newLine: Line = {
        points: [mousePos],
        color: color,
        width: lineWidth
      }
      setCurrentLine(newLine)
    } else if (e.button === 2 || currentTool === 'eraser'){
      setIsErasing(true)
      const newErasure: Erasure = {
        points: [mousePos],
        width: 20
      }
      setCurrentErasure(newErasure)
    }

    setIsDrawing(true);
  }

  const handleMouseMove = (e:React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const mousePos = getMousePos(e);

    if(currentTool === 'brush' && currentLine && !isErasing){
      const updatedLine: Line = {
        ...currentLine,
        points:[...currentLine.points, mousePos]
      };

      setCurrentLine(updatedLine);

    } else if ((isErasing || currentTool === 'eraser') && currentErasure) {
      const updatedErasure: Erasure = {
        ...currentErasure,
        points: [...currentErasure.points, mousePos]
      };
      
      setCurrentErasure(updatedErasure);

      if (updatedErasure.points.length > 1){
        const newLines = getErasedLines(updatedErasure)
        setLines(newLines)
      }
      setCurrentLine(null)
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
  
    if (isErasing) {
      setIsErasing(false);
    }
    
    if (currentLine) {
      if (currentLine.points.length > 1) {
        const newLines = [...lines, currentLine];
        setLines(newLines);
      }
      setCurrentLine(null);
    }
    
    if (currentErasure) {
      setCurrentErasure(null);
    }
    
    setIsDrawing(false);
  }


  const handleMouseLeave = () => {
    if(isDrawing){
      handleMouseUp();
    }
  }

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lines.forEach(line => {
      drawLine(ctx, line);
    });

    if (currentLine){
      drawLine(ctx, currentLine);
    }
  }

  const drawLine = (ctx: CanvasRenderingContext2D, line: Line) =>{
    if (line.points.length === 0) return;

    ctx.beginPath();
    ctx.strokeStyle = line.color;
    ctx.lineWidth = line.width;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.moveTo(line.points[0].x, line.points[0].y);

    for (let i = 1; i < line.points.length; i++) {
      ctx.lineTo(line.points[i].x, line.points[i].y);
    }

    ctx.stroke();
  };

  useEffect(() => {
    redrawCanvas();
    
    if (lines.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      
      if (ctx && canvas) {
        // Нарисуем невидимую точку чтобы запустить перерисовку
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, 1, 1);
      }
    }
  }, [lines, currentLine, width, height]);

  return (
    <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={className}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleContextMenu}
    />
      );
};

