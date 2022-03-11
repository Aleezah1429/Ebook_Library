import React, { useContext, useState, useEffect, } from "react";
import Modal from 'react-modal';
import { MdCancel } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import fire from "../../firebase";
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

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
}


export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  // Genre Asking States
  // For Select Action
  const [Action, setAction] = useState("")
  const [ScienceFiction, setScienceFiction] = useState("")
  const [Mystery, setMystery] = useState("")
  const [Comedy, setComedy] = useState("")
  const [Fantasy, setFantasy] = useState("")
  const [Teenagers, setTeenagers] = useState("")

  // Modal States
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

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

  // Genre Asking
  // Store collection of book details in firestore
  const ref = fire.firestore().collection("Books").doc("Book_1")

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  // Get Data of Books From Database
  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const items = []
      fire.firestore().collection("Books")
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              // console.log(doc.id, "=>", doc.data().Genre);
              if (doc.data().Genre == "Action") {
                console.log("Action Genre", doc.data())
              }

              items.push(doc.data())
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setData(items)
      setLoader(false)
    })
  }

  // For get genre from Action
  const handleAction = (e) => {
    setAction(e.target.value)
    console.log(Action)
  }

  // For get genre from Science Fiction
  const handleScienceFiction = (e) => {
    setScienceFiction(e.target.value)
    console.log(ScienceFiction)
  }

  // For get genre from Comedy
  const handleComedy = (e) => {
    setComedy(e.target.value)
    console.log(Comedy)
  }

  // For get genre from Teenagers
  const handleTeenagers = (e) => {
    setTeenagers(e.target.value)
    console.log(Teenagers)
  }

  // For get genre from Mystery
  const handleMystery = (e) => {
    setMystery(e.target.value)
    console.log(Mystery)
  }

  // For get genre from Fantasy
  const handleFantasy = (e) => {
    setFantasy(e.target.value)
    console.log(Fantasy)
  }



  // For save genre from Checkbox
  const SaveGenre = async (e) => {
    // e.preventdefault()
    var getLemail = await localStorage.getItem("Lemail")
    var userId = getLemail.split("@")
    console.log("fvrt genres",Action)
    // Store genre of book  in firestore
    fire.firestore().collection("Genre").doc(userId[0]).set({
      Favourite_Genres: [Action, Fantasy, Mystery, ScienceFiction, Comedy, Teenagers]
    })
    
  }


  // Modal
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getData();
    console.log(Action)
    console.log(Fantasy)
    console.log(Mystery)
    console.log(ScienceFiction)
    console.log(Teenagers)
    console.log(Comedy)

  }, [Action, Fantasy, Mystery, Comedy, ScienceFiction, Teenagers, Comedy])

useEffect(()=>{
  if(successfullySignup){
    openModal()
  }

},[successfullySignup])

  return (
    <>
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






      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        className="ModelContent"
      // contentLabel="Example Modal"
      >
        <h3 className='cancel_icon' onClick={closeModal}><MdCancel /></h3>

        <div class="container d-flex">
          <div class="profile_card p-3 py-4 profile_div">
            <form>
              <div class="text-center">
                <div className="row mt-3 mb-3 my_profile_row">
                  <div className="col">

                    <h5>Select genre for better experience</h5>
                    <Row>
                      <Col>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="Action" onChange={handleAction} />
                          <label class="form-check-label" for="inlineCheckbox1">Action</label>
                        </div>
                      </Col>
                      <Col>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="Science Fiction" onChange={handleScienceFiction} />
                          <label class="form-check-label" for="inlineCheckbox2">Fiction</label>
                        </div>
                      </Col>
                      <Col>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="Comedy" onChange={handleComedy} />
                          <label class="form-check-label" for="inlineCheckbox2">Comedy</label>
                        </div>
                      </Col>
                      <Col>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="Young Adult" onChange={handleTeenagers} />
                          <label class="form-check-label" for="inlineCheckbox1">Teenagers</label>
                        </div>
                      </Col>
                      <Col>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="Fantacy" onChange={handleFantasy} />
                          <label class="form-check-label" for="inlineCheckbox2">Fantasy</label>
                        </div>
                      </Col>
                      <Col>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="Mystery" onChange={handleMystery} />
                          <label class="form-check-label" for="inlineCheckbox2">Mystery</label>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="profile mt-5"> <button class="profile_button px-5" onClick={() => SaveGenre()}>Save</button> </div>
              </div>
            </form>
          </div>
        </div >

      </Modal>
    </>
  );
}
