import React from 'react';
import logo from '../life.png'

const Logo = ( {height, width }) => {
  return (
    <div>
      <img src={logo} alt="logo" height={height} width={width}/>
    </div>
  );
}

export default Logo;
