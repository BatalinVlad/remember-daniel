import React from 'react';

const Navigator = () => {
  return (
    <nav className='main-nav'>
      <ul className='flex justify-evenly'>
        <li><a href="#about">מי אני</a></li>
        <li><a href="#notes">רשמו עלי</a></li>
      </ul>
    </nav>
  );
};

export default Navigator;
