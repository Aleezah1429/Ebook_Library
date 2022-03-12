import "../App.css";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AccountBox } from "../components/accountBox";
import background from "../assets/img/bg.jpg";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Authentication({child_To_Parent_Auth}) {

  const child_To_Parent_3 = (childdata) => {
    child_To_Parent_Auth(childdata);
  };

  return (
    <AppContainer
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        paddingBottom:"5%",
        paddingTop:"3%",
      }}
    >
      <AccountBox child_To_Parent_login={child_To_Parent_3} />
    </AppContainer>
  );
}

export default Authentication;
