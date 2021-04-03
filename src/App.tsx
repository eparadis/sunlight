import React, { useState } from 'react';
import './App.css';

function App() {
  const [x, setX] = useState(66)
  const [y, setY] = useState(100)

  return (
    <div className="App">
      <Hello />
      <Slider update={setX} value={x} label={"X"} min={0} max={300} />
      <Slider update={setY} value={y} label={"Y"} min={0} max={300} />
      <Result label={"Z"} value={calcZ(x, y)} />
      
      <p><svg width={300} height={300}>
        <rect width={"100%"} height={"100%"} fill="#DDD"/>
        <DraggableCicle center={{x: x, y: y}} 
          draggedTo={(x,y)=>{
            setX(x)
            setY(y)
          }
        }/>
      </svg>
      </p>
    </div>
  );
}

const Hello = () => {
  return (
    <p>
      <code>HELLO WORLD!</code>
    </p>
  )
}

const Slider = (props: { min: number, max: number, label: string, update: (v: number) => void, value: number })  => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.update(Number(event.target.value))
  }
  return (
    <div className="adjustable-value">
      <p>{props.label} = <span>{props.value}</span></p>
      <input type='range' min={props.min} max={props.max} onChange={onChange} value={props.value}  />
    </div>
  )
}

const Result = (props: {label: string, value: number}) => {
  return (
    <div>
      <p>{props.label} = {props.value}</p>
    </div>
  )
}

const DraggableCicle = (props: { center: {x:number, y:number}, draggedTo: (x:number, y:number)=>void}) => {
  // see https://dev.to/tvanantwerp/dragging-svgs-with-react-38h6
  // and https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/

  const [isDragging, setDragging] = useState(false)
  const [clickDownPt, setClickDownPt] = useState({x: 0, y: 0})
  const [delta, setDelta] = useState({x: 0, y: 0})
  // const [center, setCenter] = useState(props.center)

  const cx = props.center.x + delta.x
  const cy = props.center.y + delta.y
  
  return (
    <circle r={isDragging ? 15 : 10}
          // cx={`${x}`} cy={`${y}`}
          transform={`translate(${cx},${cy})`}
          onMouseDown={(ev)=>{
            setClickDownPt({ x: ev.clientX, y: ev.clientY})
            setDragging(true)
          }}
          onMouseUp={()=>{
            setDragging(false)
            props.draggedTo(cx, cy)
            setDelta({x: 0, y: 0})
          }}
          onMouseMove={(ev)=>{
            if(!isDragging) {
              setDelta({x: 0, y: 0})
              return
            }
            setDelta({
              x: ev.clientX - clickDownPt.x,
              y: ev.clientY - clickDownPt.y 
            })
          }}
        />
  )
}

const calcZ = (x: number,y:number) => {
  return x+y
}

export default App;
