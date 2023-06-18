import React from 'react'
import "./styles.css"
function MoveGrid({move,color}) {
  return (
    <div className={`move-grid ${color}`}>{move.move.name}</div>
  )
}

export default MoveGrid