import React, { useState } from "react";
import '../App.css';


// import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AccountBox } from "./accountBox";
import background from "../assets/img/bg.jpg";

import 'bootstrap/dist/css/bootstrap.min.css';
//react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
//icons from react icons
import { FaList, FaRegHeart, FaSearch } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle, FiUser } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { SiApacheairflow } from "react-icons/si";
import { GiAbstract050 } from "react-icons/gi";
//sidebar css from react-pro-sidebar module
import "react-pro-sidebar/dist/css/styles.css";


import GenreCard from "./genre_card";
import MyCard from './card';
import Search from "./search";
import Profile from "./profile";
import Edit_Profile from "./edit_profile";

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

    //     const AppContainer = styled.div`
    //   width: 100%;
    //   height: 100%;
    //   display: flex;
    //   flex-direction: column;
    //   align-items: center;
    //   justify-content: center;
    // `;
    return (
        <div >
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
                            // sidenav_to_app(menuCollapse);
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
                            <MenuItem active={true} icon={<FiHome />}>Home</MenuItem>
                            <MenuItem icon={<FiUser />}>Profile</MenuItem>
                            <MenuItem icon={<FaSearch />}>Search</MenuItem>
                            <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
                            <MenuItem icon={<BiCog />}>Settings</MenuItem>
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
                <GenreCard />
                <MyCard heading={"Specially made for Tashanam"} />
                <MyCard heading={"Yours Favourite"} />
                <Search />
                <Profile />
                {/* <Edit_Profile/> */}
                <AccountBox className = "AuthContainer" />
            </div>

        </div>
    );
}
export default Sidenav;