import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? '' : 'w-[200px] absolute top-[20px] text-start'}
      >
        {menuItem.map((menu, index) => {
          return (
            <li key={index} className="bg-primary-light cursor-pointer">
              <Link
                className={menu.cName}
                to={menu.path}
                onClick={() => setClick(false)}
              >
                {menu.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Dropdown;

const menuItem = [
  {
    title: 'Company',
    path: '/service',
    cName: 'dropdow-link',
  },
  {
    title: 'Hedgfund',
    path: '/hedgefundmgt',
    cName: 'dropdow-link',
  },
  {
    title: 'Training',
    path: '/training',
    cName: 'dropdow-link',
  },
];
