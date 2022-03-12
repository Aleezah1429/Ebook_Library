import React, { useState, useEffect } from "react";
import fire from "../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardGroup, Card, Row, Col, Container } from 'react-bootstrap';
import test2 from "../assets/img/test_2.jpg";
import "../App.css"

function GenreCard() {

    // States for Genres Data
    const [genreData, setGenreData] = useState([]);
    var getLemail =  localStorage.getItem("Lemail")
    var userId = getLemail.split("@")

    // Store collection of book details in firestore
    const ref = fire.firestore().collection("Genre").doc(userId[0])

    // Get Array of Genre From Database
    function getGenreData() {
        ref.onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
                localStorage.setItem("Genres",JSON.stringify(querySnapshot.data().Favourite_Genres))
                    setGenreData(querySnapshot.data().Favourite_Genres)
             
            }})}



    useEffect(() => {
        getGenreData();
    }, [])


    return (
        <Container >

            <Row className="genra_greeting">Recommanded Books</Row>
            <Row>
                <CardGroup className="genre_card_container">
                    {(genreData.map((i) => (
                    i != "" ?
                            <Card className="my_genre_card">

                                <Row>
                                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                                    <Col className="genre_col_text">{i}</Col>
                                </Row>
                            </Card> : null

                    )))}
                </CardGroup>
            </Row>
        </Container>
    );
}

export default GenreCard;
