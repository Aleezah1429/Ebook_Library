import React, { useState } from "react";

//Router
import { Link } from "react-router-dom";

//react pro sidebar components
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent, } from "react-pro-sidebar";

//icons from react icons
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle, FiUser,FiList } from "react-icons/fi";
import { SiApacheairflow } from "react-icons/si";
import { GiAbstract050 } from "react-icons/gi";

//sidebar css from react-pro-sidebar module
import "react-pro-sidebar/dist/css/styles.css";

function Sidenav({childToParent}) {

    const [myHeading, setmyHeading] = useState("");
    const [myMargin, setMargin] = useState("my_layout_2");
    const [data, setdata] = useState(false)
    //menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)
    //custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
        menuCollapse ? setmyHeading("E-BOOK Library") : setmyHeading("");
        menuCollapse ? setMargin("my_layout_1") : setMargin("my_layout_2");
        childToParent(myMargin);
    };

    // LOGOUT
    const handleLogout = async () => {
        await localStorage.setItem("Lemail", "")
        await localStorage.setItem("Lpassword", "")
        window.location.reload()
    }
    
    return (
        <div className="main_sidebar">
            <div id="header">
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="logotext">
                            {/* Icon change using menucollapse state */}
                            <p id="myheading">{menuCollapse ? <GiAbstract050 /> : <SiApacheairflow />}{myHeading}</p>
                        </div>
                        <div className="closemenu" onClick={() => {
                            menuIconClick();

                        }}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <FiArrowRightCircle />
                            ) : (
                                <FiArrowLeftCircle />
                            )}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem active={true} icon={<FiHome />}><Link to="/home"> Home</Link></MenuItem>
                            <MenuItem icon={<FiUser />}><Link to="/profile">Profile</Link></MenuItem>
                            <MenuItem icon={<FaSearch />}><Link to="/search">Search</Link></MenuItem>
                            <MenuItem icon={<FaRegHeart />}><Link to="/favourite">Favourite</Link></MenuItem>
                            <MenuItem icon={<FiList />}><Link to="/recommandation">Recommandation</Link></MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />} onClick={handleLogout}> Log Out </MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </div>

    );
}
export default Sidenav;
