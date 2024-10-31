import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { links } from './MyLinks';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const NavLinks = (props) => {
  const [mainMenu, setMainMenu] = useState('');

  return (
    <>
      {links.map((link) => {
        return (
          <div key={link.name}>
            {/* Medium and large submenu */}
            <div className="text-left md:cursor-pointer inline-flex flex-col group ">
              <NavLink
                to={link.href}
                // className='flex items-center gap-2 text-base font-medium hover:text-primary-light cursor-pointer group'
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'flex items-center gap-2 text-base font-medium hover:text-primary-light cursor-pointer group'
                    : isActive
                    ? 'text-primary-light flex items-center gap-2 text-base font-medium hover:text-primary-light cursor-pointer group'
                    : 'flex items-center gap-2 text-base font-medium hover:text-primary-light cursor-pointer group'
                }
                onClick={() =>
                  mainMenu !== link.name
                    ? setMainMenu(link.name)
                    : setMainMenu('')
                }
              >
                {link.name}
                <span className="text-lg md:hidden inline">
                  {mainMenu === link.name ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
                <span className="text-lg md:mt-1 md:block hidden group-hover:rotate-180">
                  <IoIosArrowDown />
                </span>
              </NavLink>
              {link.submenu && (
                <div>
                  <div>
                    <div className="absolute top-[2.8rem] hidden group-hover:md:block hover:md:block">
                      <div className="bg-white px-4 pt-5 pb-4 rounded-md space-y-3 shadow-xl ">
                        {link.sublink.map((subl, i) => (
                          <li
                            key={i}
                            className="text-base font-medium flex flex-col gap-1"
                          >
                            <NavLink
                              to={subl.href}
                              className="hover:text-primary-light cursor-pointer"
                            >
                              {subl.name}
                            </NavLink>
                          </li>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile submenu */}
            <div
              className={`
                            ${mainMenu === link.name ? 'md:hidden' : 'hidden'}
                        `}
            >
              {/* Sublinks */}
              {link.sublink.map((subl, i) => (
                <div key={i}>
                  <div>
                    <li
                      className="md:hidden py-2 pl-5 font-medium md:pr-0 pr-5"
                      onClick={props.handleMenu}
                    >
                      <NavLink
                        to={subl.href}
                        className="hover:text-primary-light"
                      >
                        {subl.name}
                      </NavLink>
                    </li>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default NavLinks;
