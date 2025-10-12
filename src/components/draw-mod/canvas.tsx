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

export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);


  const [color, setColor] = useState('#000000');
  const [width, setWidth] = useState(2);


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

    const newLine: Line = {
      points: [mousePos],
      color: color,
      width: width
    }

    setCurrentLine(newLine);

    setIsDrawing(true);
  }

  const handleMouseMove = (e:React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const mousePos = getMousePos(e);

    if(currentLine){
      const updatedLine: Line = {
        ...currentLine,
        points:[...currentLine.points, mousePos]
      };

      setCurrentLine(updatedLine);
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing || !currentLine) return;

    if(currentLine && currentLine.points.length > 1) {
      setLines( prevLines => [...prevLines, currentLine]);
    }

    setCurrentLine(null);
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
  }, [lines, currentLine]);

  return (
      <div style={{ padding: '20px' }}>
        <canvas
          ref={canvasRef}           
          width={800}               
          height={600}              
          style={{ 
            border: '1px solid black',     
            backgroundColor: 'white',      
            cursor: 'crosshair'            
          }}
          
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      );
};

