import React, { useState } from 'react';
import './App.css';
import { DraggableCicle } from './Sun';

function App() {
  const [x, setX] = useState(66)
  const [y, setY] = useState(80)

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
        <Shadow sunX={x} sunY={y}/>
        <Gnomon />
      </svg>
      </p>
    </div>
  );
}

const Hello = () => {
  return (
    <p>
      <code>Seattle Sunlight</code>
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



const Gnomon = (props: {}) => {
  return (
    <rect
      x={150}
      y={180}
      width={10}
      height={100}
    />
  )
}

const Shadow = (props: {sunX:number, sunY: number}) => {
  return (
    <polygon
      fill="#444"
      fillOpacity="0.5"
      points={`155,180 150,290 ${300-props.sunX},290`}
    />
  )
}

const calcZ = (x: number,y:number) => {
  return x+y
}

export default App;
