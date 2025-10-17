import React, { useEffect, useRef, useState } from 'react';


interface Point{
    x: number;
    y: number;
}

interface Line{
    points: Point[];
    color: string;
    width: number;
}

interface DrawingCanvasProps {
  width: number;
  height: number;
  className?: string;
  currentTool?: 'brush'| 'eraser'
}

interface Erasure {
  points: Point[];
  width: number;
}

export const DrawingCanvas: React.FC <DrawingCanvasProps> = ({
  width, 
  height, 
  className,
  currentTool = 'brush'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);


  const [color, _setColor] = useState('#000000');
  const [lineWidth, _setLineWidth] = useState(2);


  const [erasures, setErasures] = useState<Erasure[]>([])
  const [currentErasure, setCurrentErasure] = useState<Erasure | null>(null);


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
    if (currentTool === 'brush'){
      const newLine: Line = {
        points: [mousePos],
        color: color,
        width: lineWidth
      }
      setCurrentLine(newLine)
    } else if (currentTool === 'eraser'){
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

    if(currentTool === 'brush' && currentLine){
      const updatedLine: Line = {
        ...currentLine,
        points:[...currentLine.points, mousePos]
      };

      setCurrentLine(updatedLine);

    } else if (currentTool === 'eraser' && currentErasure) {
      const updatedErasure: Erasure = {
        ...currentErasure,
        points: [...currentErasure.points, mousePos]
      };
      
      setCurrentErasure(updatedErasure);
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    
    if (currentTool === 'brush' && currentLine) {
      if (currentLine.points.length > 1) {
        setLines(prevLines => [...prevLines, currentLine]);
      }
      setCurrentLine(null);
    } else if (currentTool === 'eraser' && currentErasure) {
      if (currentErasure.points.length > 1) {
        setErasures(prevErasures => [...prevErasures, currentErasure]);
      }
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

    if (erasures.length > 0 || currentErasure){
      ctx.globalCompositeOperation = 'destination-out';
    

      erasures.forEach(erasure => {
        drawErasure(ctx, erasure);
      })

      ctx.globalCompositeOperation = 'source-over';
    }
  }

  const drawErasure = (ctx: CanvasRenderingContext2D, erasure: Erasure) => {
    if (erasure.points.length === 0) return;

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth = erasure.width;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.moveTo(erasure.points[0].x, erasure.points[0].y);

    for (let i = 1; i < erasure.points.length; i++) {
      ctx.lineTo(erasure.points[i].x, erasure.points[i].y);
    }
    
    ctx.stroke();
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
  }, [lines, currentLine, erasures, currentErasure]);

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
    />
      );
};

