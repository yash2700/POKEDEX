import React from 'react';
import "./styles.css";
import { Planet } from 'react-planet';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className='menu'>
      <Planet
        centerContent={<AiOutlineMenu />}
        hideOrbit
        autoClose
        orbitRadius={120}
        bounceOnClose
        rotation={105}
        bounceDirection="BOTTOM"
      >
        <a href='/' className="button right1">  Home</a>
        <a href='/pokedex' className="button right2">Pokedex</a>
        <a href='/watchlist' className="button right3">Watch.</a>
        {/* <div className="button right4">ab..</div> */}
     
      </Planet>
    </div>
  );
}

export default Menu;
