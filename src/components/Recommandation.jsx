import React, { useState, useEffect } from "react";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardGroup, Card, Container, Row, Col, Modal } from 'react-bootstrap';
import GenreCard from "./genre_card";
import fire from "../firebase";
import readme from "..//assets/img/readme_logo_icon.png";


function Recommandation() {

    var getLemail = localStorage.getItem("Lemail")
    var userId = getLemail.split("@")

    const [BookId, setBookId] = useState("");
    const [isFavourite, setisFavourite] = useState("heartcolor_1");

    // States for MODAL
    const [modalShow, setModalShow] = useState(false);
    const [rating, setRating] = useState(null);

    // States for Book Data
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);


    // Get Data of Books From Database
    async function getData() {
        var items = []
        const myGenres = JSON.parse(localStorage.getItem("Genres"))


        for (var i = 0; i < myGenres.length; i++) {
            await fire.firestore().collection("Books")
                .get()
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            if (doc.data().Genre == myGenres[i]) {
                                items.push(doc.data())
                                console.log("doc", doc.data())
                            }


                        });

                    }
                })

                .catch((error) => {
                    console.log(error);

                    setLoader(false)
                })
        }

        setData(items)
    }

    function OpenPdf(id, pdf) {
        window.open(pdf, '_blank');

    }

    function ShowModal(condition, id) {
        setBookId(id)
        setModalShow(condition)
      }

      
    // Add to favourite
    const AddToFavourites = (id, name) => {
        let arr;
        fire.firestore().collection("Favourite_Books").doc(userId[0]).get().then((snap) => {
            if (snap.data() == undefined) {
                arr = []
            }
            else {
                arr = snap.data().Books
            }

            const singleObj = { id, name }
            arr.push(JSON.stringify(singleObj))
            console.log("name", name)

            // Set on Firestore
            fire
                .firestore()
                .collection("Favourite_Books")
                .doc(userId[0])
                .set(
                    {
                        Books: arr
                    }).then(
                        alert(`${name} Added to Favourite`)
                    )

        })
    }

    const GiveRating = (rate) => {
        let objs;
        setRating(rate)
        fire.firestore().collection("Feedback").doc(userId[0]).get().then((snap) => {
            if (snap.data() == undefined) {
                objs = []
            }
            else {
                objs = snap.data().ratings
            }
            const newEntry = { BookId, rate }
            objs.push(JSON.stringify(newEntry))
            fire
                .firestore()
                .collection("Feedback")
                .doc(userId[0])
                .set(
                    {
                        ratings: objs
                    })
        })

    }


    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <GenreCard />
            <Container>
                <Row xs={1} sm={3} md={5} className="g-4">
                    {console.log("MY", data)}
                    {Array.from({ length: data.length }).map((_, idx) => (

                        <Col>

                            <Card className="my_card" key={data[idx].id}>
                                <Card.Img onClick={() => OpenPdf(data[idx].id, data[idx].Pdf)}
                                    variant="top"
                                    src={data[idx].Image}
                                    className="card_image"
                                />
                                <Card.Img
                                    variant="top"
                                    src={readme}
                                    className="card_image_2"
                                />

                                <Card.Body>
                                    <Card.Title className="my_card_title">
                                        {data[idx].BookName}
                                    </Card.Title>
                                    <Card.Text className="my_card_text">
                                        {data[idx].Description.slice(0, 100) + "..."}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="card_footer">
                                    <small className="text-muted my_card_text ">
                                        {data[idx].AuthorName}
                                        <span
                                            type="button"
                                            onClick={() => {
                                                AddToFavourites(data[idx].id, data[idx].BookName)
                                            }}
                                            className={isFavourite}
                                        >
                                            &hearts;
                                        </span>
                                    </small>
                                </Card.Footer>
                                <Card.Text
                                    className="stars_div text-center"
                                    type="button"
                                    onClick={() => ShowModal(true, data[idx].id)}
                                >
                                    {[...Array(5)].map((_, index) => {
                                        return (
                                            <span
                                                className={
                                                    index < data[idx].rating ? "star_2" : "star_1"
                                                }
                                            >
                                                &#9733;
                                            </span>
                                        );
                                    })}
                                </Card.Text>

                                {/* Modal for User view and give feedback */}
                                <Modal
                                    size="sm"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                    show={modalShow}
                                    key={data[idx].id}
                                    onRequestClose={false}
                                >
                                    <Modal.Header>
                                        <Modal.Title id="contained-modal-title-vcenter">
                                            Give some star!
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="center-block">
                                        {[...Array(5)].map((_, index) => {
                                            return (
                                                <label className="modal_star text-center">
                                                    {console.log("LLLLLL", data[idx].id)}
                                                    <input
                                                        type="radio"
                                                        value={index + 1}
                                                        onClick={() => GiveRating(index + 1)}
                                                    />
                                                    <span
                                                        className={
                                                            index + 1 <= rating
                                                                ? "modalstar_2"
                                                                : "modalstar_1"
                                                        }
                                                    >
                                                        &#9733;
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            onClick={() => setModalShow(false)}
                                            className="center-block"
                                        >
                                            Submit
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div >
    )
}
export default Recommandation;
