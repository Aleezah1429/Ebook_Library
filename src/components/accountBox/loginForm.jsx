import React, { useContext, useEffect, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  ErrorMsg,
  SuccessMsg,
  InfoMsg
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

// For Alert
// import { Alert } from 'react-bootstrap'

export default function LoginForm(props) {

  const { switchToSignup } = useContext(AccountContext);

  // States
  const [Lemail, setLEmail] = useState("");
  const [Lpassword, setLPassword] = useState("");

  const {
    handleLogin,
    successfullySignin,
    emailorPassError,
    signupError
  } = props;

  const LhandleLogin = async () => {
    if (Lemail != "" && Lpassword != "") {
      await localStorage.setItem("Lemail", Lemail)
      await localStorage.setItem("Lpassword", Lpassword)
      handleLogin()
      setLEmail("")
      setLPassword("")
    }
    else {
      alert("Please fill all the fields")
    }
  }

  return (
    <BoxContainer>
      {/* {console.log("myaleezah", props.email)} */}
      <FormContainer>
        {/* //Input my L wali states ainge */}
        <Input type="email" placeholder="Email" value={Lemail} onChange={(e) => setLEmail(e.target.value)} />
        {/* <ErrorMsg><p>{emailError}</p></ErrorMsg> */}
        <Input type="password" placeholder="Password" value={Lpassword} onChange={(e) => setLPassword(e.target.value)} />
        {/* <ErrorMsg><p>{passwordError}</p></ErrorMsg> */}
      </FormContainer>
      {emailorPassError ?
          <ErrorMsg><p>Please Enter the correct Email or Password</p></ErrorMsg>
          :
          null}
        {successfullySignin ?
          <SuccessMsg><p>Successfully Signin</p></SuccessMsg>
          :
          null}
        {signupError ?
          <InfoMsg><p> Please Signup first</p></InfoMsg>
          :
          null}
      <Marginer direction="vertical" margin={10} />
      {/* <MutedLink href="#">{props.email}</MutedLink> */}
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={LhandleLogin}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
