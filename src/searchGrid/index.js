import React from 'react'
import "./styles.css"
import { Link } from 'react-router-dom'
import GridBall from "../assets/ball-grid.png"
function SearchGrid(props) {
  return (
    <Link to={props.name} className={`search-grid-item ${props.color}`}>{props.name}
    <img src={GridBall} alt="" width={"70px"} style={{opacity:"0.3"}}/>
    </Link>
  )
}

export default SearchGrid