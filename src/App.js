import "./App.css";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import background from "../src/assets/img/bg.jpg";
import Sidenav from './components/sidebar';
import Genre_Asking from "./components/Genre_asking"

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;




function App() {
  return (
    // <AppContainer style={{
    //   backgroundImage: `url(${background})`,
    //   backgroundPosition: 'center',
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no-repeat'
    // }}>
    //   <AccountBox />
    //  </AppContainer>
    <div >
      <Sidenav /> 
    </div>
  );
}

export default App;
