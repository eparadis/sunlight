import React, { useState } from 'react';
import './App.css';

const mouseDown : React.MouseEventHandler<SVGCircleElement> = (x) => {
  console.log(x)
}

const mouseMove = mouseDown;
const mouseUp = mouseDown;

function App() {
  const [x, setX] = useState(66)
  const [y, setY] = useState(100)
  return (
    <div className="App">
      <Hello />
      <Slider update={setX} value={x} label={"X"} min={12} max={120} />
      <Slider update={setY} value={y} label={"Y"} min={12} max={120} />
      <Result label={"Z"} value={calcZ(x, y)} />
      <p><svg width={300} height={300}>
        <circle r={10} cx={`${x}%`} cy={`${y}%`} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}/>
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
      <input type='range' min={props.min} max={props.max} onChange={onChange} defaultValue={props.value}  />
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

const calcZ = (x: number,y:number) => {
  return x+y
}

export default App;
