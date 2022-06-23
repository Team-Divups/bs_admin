import React from 'react';
import { Link, NavLink } from 'react-router-dom';
//import { MdOutlineCancel } from 'react-icons/md';
//import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from './SidebarLinks';
import { useStateContext } from '../contexts/ContextProvider';
import { Equalizer } from '@mui/icons-material';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const currentColor ='#84fae4';
  const buttonColor = 'black';

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10" style={{backgroundColor:'#ECECEC'}}>
      {activeMenu && (
        <>
          <div style={{paddingLeft:'10%',paddingTop:'20px'}}>
            <Link to="/" onClick={handleCloseSideBar}>
              <Equalizer sx={{fontSize: 40,color:'#84fae4'}}/><span style={{paddingLeft:'10px',fontFamily:'Mulish',fontSize:'24px'}}><b>Biz Stat</b></span>
            </Link>
          </div>

          <div >
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                      color: isActive ? buttonColor :'',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
