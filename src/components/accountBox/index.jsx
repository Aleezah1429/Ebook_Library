import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoginForm from "./loginForm";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { SignupForm } from "./signupForm";


// Firebase Database
import { getDatabase, ref, set, child, get } from "firebase/database";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoxContainer = styled.div`
  width: 280px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AccountBox(props) {


  // Authentication States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailorPassError, setEmailorPassError] = useState(false);
  const [signupError, setsignupError] = useState(false);
  const [successfullySignin, setSuccesfullySignin] = useState(false);
  const [successfullySignup, setSuccesfullySignup] = useState(false);



  // index
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };
  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };


  const handleLogin = async () => {
    var getLemail = await localStorage.getItem("Lemail")
    var getLpassword = await localStorage.getItem("Lpassword")

    var userId = getLemail.split("@")

    const dbRef = ref(getDatabase());
    console.log("userID", userId)
    get(child(dbRef, `Reader/${userId[0]}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("loginSnap", snapshot.val());
        if (getLemail == snapshot.val().email && getLpassword == snapshot.val().password) {
          setSuccesfullySignin(true)
          
          setInterval(()=>{
            setSuccesfullySignin(false)
          }, 1000
          )
          setTimeout(()=>{
          props.child_To_Parent_login(true)

          },2000)
        
        }
        else {
          setEmailorPassError(true)
          setTimeout(()=>{
            setEmailorPassError(false)
          }, 2000
          )
        }
      } else {
        setsignupError(true)
      }
    }).catch((error) => {
      console.error(error);
    });

  };

  // Firebase Database Write
  function writeUserData(userId, name, email, password) {
    const db = getDatabase();
    set(ref(db, 'Reader/' + userId), {
      name: name,
      email: email,
      password: password
    });
  }



  const handleSignup = async () => {
    console.log("SSS", email, name, password)
    var getSemail = await localStorage.getItem("Semail")
    var getSname = await localStorage.getItem("Sname")
    var getSpassword = await localStorage.getItem("Spassword")
    var userId = getSemail.split("@")
    writeUserData(userId[0], getSname, getSemail, getSpassword);
    setSuccesfullySignup(true)
  }

  // Login
  const Login = () => {
    {
      return (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          emailorPassError={emailorPassError}
          successfullySignin={successfullySignin}
          signupError={signupError}
        />
      )
    }
  }

  // Signup
  const Signup = () => {
    return (
      <div>
        <SignupForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          emailorPassError={emailorPassError}
          successfullySignup={successfullySignup}
        />
      </div>
    );
  }



  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signin" && (
            <HeaderContainer>
              <HeaderText>Welcome</HeaderText>
              <HeaderText>Back</HeaderText>
              <SmallText>Please sign-in to continue!</SmallText>
            </HeaderContainer>
          )}
          {active === "signup" && (
            <HeaderContainer>
              <HeaderText>Create</HeaderText>
              <HeaderText>Account</HeaderText>
              <SmallText>Please sign-up to continue!</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {active === "signin" && <Login />}
          {active === "signup" && <Signup />}
        </InnerContainer>
      </BoxContainer>

    </AccountContext.Provider>
  );
}
