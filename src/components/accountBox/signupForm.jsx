import React, { useContext, useState, useEffect, } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  ErrorMsg,
  SuccessMsg
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";


export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  // States
  const [Sname, setSName] = useState("");
  const [Semail, setSEmail] = useState("");
  const [Spassword, setSPassword] = useState("");

  const {
    handleSignup,
    emailorPassError,
    successfullySignup,

  } = props;

  const ShandleSignup = async () => {
    if (Sname != "" && Semail != "" && Spassword != "") {
      await localStorage.setItem("Sname", Sname)
      await localStorage.setItem("Semail", Semail)
      await localStorage.setItem("Spassword", Spassword)
      handleSignup()
      setSName("")
      setSEmail("")
      setSPassword("")
    }
    else {
      alert("Please fill all the fields")
    }


  }

  return (
    <BoxContainer>
      <FormContainer>
        {/* {console.log(Semail)}
        {console.log(Sname)}
        {console.log(Spassword)} */}
        <Input type="text" placeholder="Full Name" value={Sname} onChange={(e) => setSName(e.target.value)} />
        <Input type="email" placeholder="Email" value={Semail} onChange={(e) => setSEmail(e.target.value)} />
        {/* <ErrorMsg><p>{emailError}</p></ErrorMsg> */}
        <Input type="password" placeholder="Password" value={Spassword} onChange={(e) => setSPassword(e.target.value)} />
        {/* <ErrorMsg><p>{passwordError}</p></ErrorMsg> */}
      </FormContainer>
      {emailorPassError ?
          <ErrorMsg><p>Please Enter the correct Email or Password</p></ErrorMsg>
          :
          null}
        {successfullySignup ?
          <SuccessMsg><p>Successfully Signup</p></SuccessMsg>
          :
          null}
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={ShandleSignup}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
