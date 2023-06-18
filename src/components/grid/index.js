import React from 'react'
import "./styles.css"
import { Link } from 'react-router-dom'
function GridComponent(props) {
  return (
    <Link to={`/pokemon/${props.obj.name}`} className={`grid-component ${props.obj.types[0].type.name}`} >
      <div className="left">
        <div className="grid-title">
          {props.obj.name}
        </div>
        <div className="types">
          {props.obj.types.map(i=>(<p className={`grid-type light${props.obj.types[0].type.name}`}>{i.type.name}</p>))}
        </div>
        </div>
        <div className="grid-right">
          <img src={props.obj.sprites.other.dream_world.front_default} alt="" width={"100px"}/>
        </div>
    </Link>
  )
}

export default GridComponent