import React, { useState, useEffect } from "react";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardGroup, Card, Container, Row, Col, Modal } from 'react-bootstrap';
import { FaRegHeart } from "react-icons/fa";
import fire from "../firebase";
import readme from "..//assets/img/readme_logo_icon.png";

function MyCard({ heading }) {

// States for MODAL
    const [modalShow, setModalShow] = useState(false);
    const [rating, setRating] = useState(null);

    // Store collection of book details in firestore
    const ref = fire.firestore().collection("Books").doc("Book_1")

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);

    // States of book img and pdf show
    const [image, setImage] = useState('');
    const [UrlImg, setUrlImg] = useState('');


    // Get Data of Books From Database
    function getData() {
        ref.onSnapshot((querySnapshot) => {
            const items = []
            fire.firestore().collection("Books")
                .get()
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            // console.log(doc.id, "=>", doc.data());
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

    useEffect(() => {
        getData();
        BookShow();
        // console.log(data)
    }, [])


    // Book upload
    function BookShow() {

        // Save url or download link
        // const upload = () => {
        //   if (image == null)
        //     return;
        //   setUrlImg("Getting Download Link...")

        // Sending File to Firebase Storage
        // storage.ref(`/images/${image.name}`).put(image)
        // .on("state_changed", alert("success"), alert, () => {


        // // Getting Link of Image
        fire.storage().ref("Book_1").child("GFX_Mentor.jpg").getDownloadURL()
            .then((url) => {
                setUrlImg(url);
                // console.log(url)
            })

        // Getting Link of Pdf
        // fire.storage().ref("Book_1").child("Aliza Ikram Resume.pdf").getDownloadURL()
        //   .then((url) => {
        //     setUrl(url);
        //     console.log(url)
        //   })


        // });


        // }
    }


    return (
        <Container>
            <Container>
                <Row className="card_greeting">{heading}</Row>
                <Row xs={1} sm={3} md={5} className="g-4">
                    {Array.from({ length: data.length }).map((_, idx) => (
                        <Col>
                            <Card className="my_card" key={data[idx].id}>
                                <Card.Img variant="top" src={UrlImg} className="card_image" />
                                <Card.Img variant="top" src={readme} className="card_image_2" />

                                <Card.Body>
                                    <Card.Title className="my_card_title">{data[idx].BookName}</Card.Title>
                                    <Card.Text className="my_card_text">
                                        {data[idx].Description.slice(0,100)+"..."}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="card_footer">
                                    <small className="text-muted my_card_text ">
                                        {data[idx].AuthorName}
                                        <span type="button"
                                            // heart color will be ornge if it is present in database otherwise grey
                                            className={`${data[idx].favorite ? "heartcolor_1" : "heartcolor_2"}`}
                                        // Aleezah apply condition that if its click favourte will asssigne oppsite boolen values
                                        // onClick={}
                                        >
                                            &hearts;
                                        </span>
                                    </small>
                                </Card.Footer>
                                <Card.Text className="stars_div text-center" type="button" onClick={() => setModalShow(true)}>{
                                    [...Array(5)]
                                        .map((_, index) => {
                                            return <span className={index < data[idx].rating ? "star_2" : "star_1"}>&#9733;</span>
                                        })
                                }
                                </Card.Text>

                                {/* Modal for User view and give feedback */}
                                <Modal size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={modalShow} key={data[idx].id} onRequestClose={false}>
                                    <Modal.Header >
                                        <Modal.Title id="contained-modal-title-vcenter" >
                                            Give some star!
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="center-block">
                                        {
                                            [...Array(5)]
                                                .map((_, index) => {
                                                    return <label className="modal_star text-center">
                                                        <input type="radio" value={index + 1} onClick={() => setRating(index + 1)} />
                                                        <span className={(index + 1) <= (rating) ? "modalstar_2" : "modalstar_1"}>&#9733;</span>
                                                    </label>
                                                })

                                        }
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            onClick={() => setModalShow(false)} className="center-block"
                                        >Submit</Button>
                                    </Modal.Footer>
                                </Modal>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );

}


export default MyCard;
