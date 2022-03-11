import React, { useState, useEffect } from "react";
import fire from "../firebase";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
// import { FaPen } from "react-icons/fa";
// import MyCard from "./card";


function GenreAsk() {

    // For Select Action
    const [Action, setAction] = useState("")
    const [ScienceFiction, setScienceFiction] = useState("")
    const [Mystery, setMystery] = useState("")
    const [Comedy, setComedy] = useState("")
    const [Fantasy, setFantasy] = useState("")
    const [Teenagers, setTeenagers] = useState("")




    // For Form 
    var [value, setValue] = useState(false)

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
        // Store genre of book  in firestore
        fire.firestore().collection("Genre").doc(userId[0]).set({
            Favourite_Genres : [Action, Fantasy, Mystery, ScienceFiction, Comedy, Teenagers]
        })
        // window.location.href = "http://localhost:3001/home"
        // console.log("fire",Action)
    }



    // const [data, setData] = useState([]);
    // const [loader, setLoader] = useState(true);

    // // Get Data of Books From Database
    // function getData() {
    //     ref.onSnapshot((querySnapshot) => {
    //         const items = []
    //         fire.firestore().collection("Books")
    //             .get()
    //             .then((querySnapshot) => {
    //                 if (!querySnapshot.empty) {
    //                     querySnapshot.forEach((doc) => {
    //                         // console.log(doc.id, "=>", doc.data().Genre);
    //                         if (doc.data().Genre == "Action") {
    //                             console.log("Action Genre", doc.data())
    //                         }

    //                         items.push(doc.data())
    //                     });
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //         setData(items)
    //         setLoader(false)
    //     })
    // }


    useEffect(() => {
        getData();
        console.log(Action)
        console.log(Fantasy)
        console.log(Mystery)
        console.log(ScienceFiction)
        console.log(Teenagers)
        console.log(Comedy)

    }, [Action, Fantasy, Mystery, Comedy, ScienceFiction, Teenagers, Comedy])


    return (
        <div class="container d-flex justify-content-center ">
            <div class="profile_card p-3 py-4 profile_div">
                <form>
                    <div class="text-center">
                        {/* <img src="https://i.imgur.com/stD0Q19.jpg" width="150" class="rounded-circle profile_image" /> */}
                        {/* <Container className="search_bar">
                                <input type="text" placeholder="Maria Smith" name="search" />
                                <button type="submit">< FaPen /></button>
                            </Container> */}
                        {/* <span class="mt-1 clearfix">Android Developer</span> */}
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
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="Science fiction" onChange={handleScienceFiction} />
                                            <label class="form-check-label" for="inlineCheckbox2">Science Fiction</label>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="Comedy" onChange={handleComedy} />
                                            <label class="form-check-label" for="inlineCheckbox2">Comedy</label>
                                        </div>
                                    </Col>
                                    <Col>
                                        {/* <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                                        <label class="form-check-label" for="inlineCheckbox2">Cook Book</label>
                                    </div> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="Young adult" onChange={handleTeenagers} />
                                            <label class="form-check-label" for="inlineCheckbox1">Teenagers</label>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="Fantasy" onChange={handleFantasy} />
                                            <label class="form-check-label" for="inlineCheckbox2">Fantasy</label>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="Mystery" onChange={handleMystery} />
                                            <label class="form-check-label" for="inlineCheckbox2">Mystery</label>
                                        </div>
                                    </Col>
                                    {/* <Col>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                                        <label class="form-check-label" for="inlineCheckbox2">Essay</label>
                                    </div>
                                </Col> */}
                                </Row>

                            </div>
                        </div>
                        {/* <div class="row mt-3 mb-3 my_profile_row">
                        <div class="col">
                            <h5>Favourite Author</h5>
                            <Container className="search_bar">
                                <input type="text" placeholder="kalid hussain Anupem Kher.. " name="search" />
                                <button type="submit">< FaPen /></button>
                            </Container>
                        </div>
                    </div>
                    <div class="row mt-3 mb-3 my_profile_row">
                        <div class="col">
                            <h5>Favourite Book</h5>
                            <Container className="search_bar">
                                <input type="text" placeholder="Kite Runner Forty Rules of love" name="search" />
                                <button type="submit">< FaPen /></button>
                            </Container>
                        </div>
                    </div> */}
                        {/* <hr class="line"></hr><small class="mt-4 qoute">"A room without books is like a body without a soul"</small> */}
                        {/* <div class="social-buttons mt-5"> <button class="neo-button"><i class="fa fa-facebook fa-1x"></i> </button> <button class="neo-button"><i class="fa fa-linkedin fa-1x"></i></button> <button class="neo-button"><i class="fa fa-google fa-1x"></i> </button> <button class="neo-button"><i class="fa fa-youtube fa-1x"></i> </button> <button class="neo-button"><i class="fa fa-twitter fa-1x"></i> </button> </div> */}
                        <div class="profile mt-5"> <button class="profile_button px-5" onClick={()=> SaveGenre() }>Save</button> </div>
                    </div>
                </form>
            </div>
        </div >
        // </div >

    );
}

export default GenreAsk;
