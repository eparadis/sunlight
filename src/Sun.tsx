import React, { useState } from 'react';


export const DraggableCicle = (props: { center: {x:number, y:number}, draggedTo: (x:number, y:number)=>void}) => {
    // see https://dev.to/tvanantwerp/dragging-svgs-with-react-38h6
    // and https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/
  
    const [isDragging, setDragging] = useState(false)
    const [clickDownPt, setClickDownPt] = useState({x: 0, y: 0})
    const [delta, setDelta] = useState({x: 0, y: 0})
  
    const cx = props.center.x + delta.x
    const cy = props.center.y + delta.y
  
    const update = (ev: React.MouseEvent<SVGCircleElement, MouseEvent>): void => {
      if (!isDragging) {
        setDelta({ x: 0, y: 0 });
        return;
      }
      setDelta({
        x: ev.clientX - clickDownPt.x,
        y: ev.clientY - clickDownPt.y
      });
    };
  
    return (
      <circle
        fill={"yellow"}
        r={isDragging ? 15 : 10}
        cx={`${cx}`} cy={`${cy}`}
        // transform={`translate(${cx},${cy})`}
        onMouseDown={(ev)=>{
          setClickDownPt({ x: ev.clientX, y: ev.clientY})
          setDragging(true)
        }}
        onMouseUp={()=>{
          setDragging(false)
          props.draggedTo(cx, cy)
          setDelta({x: 0, y: 0})
        }}
        onMouseLeave={update}
        onMouseMove={update}
      />
    )
  }