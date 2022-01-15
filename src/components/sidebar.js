import React, { useState } from "react";

//Router
import { BrowserRouter, Route, Routes,Link} from "react-router-dom";

//react pro sidebar components
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent, } from "react-pro-sidebar";

//icons from react icons
import { FaList, FaRegHeart, FaSearch } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle, FiUser } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { SiApacheairflow } from "react-icons/si";
import { GiAbstract050 } from "react-icons/gi";

//sidebar css from react-pro-sidebar module
import "react-pro-sidebar/dist/css/styles.css";

//components
import Home from "./home";
import Search from "./search";
import Profile from "./profile";
import styled from "styled-components";
import { AccountBox } from "./accountBox";
import background from "../assets/img/bg.jpg";
// import LoginForm from "./accountBox/loginForm";


function Sidenav() {
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
        menuCollapse ? setMargin("my_layout_2") : setMargin("my_layout_1");



    };
    return (
        <BrowserRouter>
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
                                <MenuItem active={true} icon={<FiHome />}><Link to="/home">Home</Link></MenuItem>
                                <MenuItem icon={<FiUser />}><Link to="/profile">Profile</Link></MenuItem>
                                <MenuItem icon={<FaSearch />}><Link to="/search">Search</Link></MenuItem>
                                <MenuItem icon={<FaRegHeart />}><Link to="/favourite">Favourite</Link></MenuItem>
                                <MenuItem icon={<BiCog />}><Link to="/setting">Settings</Link></MenuItem>
                            </Menu>
                        </SidebarContent>
                        <SidebarFooter>
                            <Menu iconShape="square">
                                <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
                            </Menu>
                        </SidebarFooter>
                    </ProSidebar>
                </div>
                <div className={myMargin}>

                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/search" element={<Search/>} />
                        <Route path="/setting" element={<AccountBox className = "AuthContainer" />} />
                      
                    </Routes>


                </div>
            </div>
        </BrowserRouter>
    );
}
export default Sidenav;
