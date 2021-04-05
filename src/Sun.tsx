import React, { useState } from 'react';


export const DraggableCicle = (props: { center: {x:number, y:number}, onChange:(value:number)=>void}) => {
    // see https://dev.to/tvanantwerp/dragging-svgs-with-react-38h6
    // and https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/
  
    const [isDragging, setDragging] = useState(false)
    const [clickDownPt, setClickDownPt] = useState({x: 0, y: 0})
    const [delta, setDelta] = useState({x: 0, y: 0})
    const [start, setStart] = useState({x: props.center.x, y: props.center.y})
  
    const cx = start.x + delta.x
    const cy = start.y + delta.y
  
    const update = (ev: React.MouseEvent<SVGCircleElement, MouseEvent>): void => {
      if (!isDragging) {
        setDelta({x: 0, y: 0})
        setStart({x: cx, y: cy})
        return;
      }
      setDelta({
        x: ev.clientX - clickDownPt.x,
        y: ev.clientY - clickDownPt.y
      });
      const newValue = start.x + ev.clientX - clickDownPt.x
      props.onChange(newValue)
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
          setDelta({x: 0, y: 0})
          setStart({x: cx, y: cy})
        }}
        onMouseLeave={update}
        onMouseMove={update}
      />
    )
  }