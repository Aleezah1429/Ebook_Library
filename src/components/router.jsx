import React, { useState } from "react";

//Router
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

//sidebar css from react-pro-sidebar module
import "react-pro-sidebar/dist/css/styles.css";

//components
import Home from "./home";
import Search from "./search";
import Profile from "./profile";
import Favourite_Book from "./Favourite_book";
import Sidenav from "./sidebar";
import Recommandation from "./Recommandation";
import Authentication from "./Authentication";

import "react-pro-sidebar/dist/css/styles.css";
import "../App.css";

function MyRouter() {
  const [margin, setMargin] = useState("my_layout_2");
  const [allowAuth, setAllowAuth] = useState(false);


  const childToParent = (childdata) => {
    setMargin(childdata);
  };

  const child_To_Parent_2 = (data) => {
    setAllowAuth(data);
  };

  return (
    <BrowserRouter>
      {allowAuth ? 
        <>
          {/* SideBar is a child */}
          <Sidenav childToParent={childToParent} />
          <div className={margin}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favourite" element={<Favourite_Book />} />
              <Route path="/recommandation" element={<Recommandation />} />
            </Routes>
          </div>
        </>
       : 
        <Authentication child_To_Parent_Auth={child_To_Parent_2} />
      }
    </BrowserRouter>
  );
}
export default MyRouter;
