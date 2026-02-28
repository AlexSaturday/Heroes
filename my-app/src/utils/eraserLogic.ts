import type { Line, Point, Erasure } from "../types";

export const isPointInErasureArea = (point: Point, erasure: Erasure): boolean =>
{
    for(const erasurePoint of erasure.points){

        const distance = Math.sqrt(
        Math.pow(point.x - erasurePoint.x, 2) +
        Math.pow(point.y - erasurePoint.y, 2)
        )
        if (distance <= erasure.width){
            return true
        }
    }
    return false
}
    

export const isLineTouchedByEraser = (line: Line, erasure: Erasure): boolean =>
{
    for (const linePoint of line.points) {
        for (const erasurePoint of erasure.points) {
          const distance = Math.sqrt(
            Math.pow(linePoint.x - erasurePoint.x, 2) + 
            Math.pow(linePoint.y - erasurePoint.y, 2)
          );
          if (distance <= erasure.width) {
            return true;
          }
        }
      }
      return false;
}