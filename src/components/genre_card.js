import React, { useState, useEffect } from "react";
import fire from "../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardGroup, Card, Row, Col, Container } from 'react-bootstrap';
import test2 from "../assets/img/test_2.jpg";
import "../App.css"
import { FaRegHeart } from "react-icons/fa";

function GenreCard() {

    // States for Genres Data
    const [genreData, setGenreData] = useState([]);
    var getLemail =  localStorage.getItem("Lemail")
    var userId = getLemail.split("@")
    // Store collection of book details in firestore
    const ref = fire.firestore().collection("Genre").doc(userId)

    // Get Array of Genre From Database
    function getGenreData() {
        ref.onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
                localStorage.setItem("Genres",JSON.stringify(querySnapshot.data().Favourite_Genres))
                    console.log(querySnapshot.id, "=>", querySnapshot.data().Favourite_Genres);
                    setGenreData(querySnapshot.data().Favourite_Genres)
             
            }})}



    useEffect(() => {
        getGenreData();
        // console.log(data)
    }, [])


    return (
        <Container >

            <Row className="genra_greeting">Good morning</Row>
            <Row>
                <CardGroup className="genre_card_container">
//                     {(genreData.map((i) => (
//                     i != "" ?
//                             <Card className="my_genre_card">
//                                 {console.log("data", i)}

//                                 <Row>
//                                     <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
//                                     <Col className="genre_col_text">{i}</Col>
//                                 </Row>
//                             </Card> : null

//                     )))}
        
         <Card className="my_genre_card ">
                {/* genre_card_container */}
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text">Action</Col>
                </Row>
            </Card>
            <Card className="my_genre_card ">
                {/* genre_card_container */}
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text">Fantacy</Col>
                </Row>
            </Card>
            <Card className="my_genre_card ">
                {/* genre_card_container */}
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text">Detective and Mystery</Col>
                </Row>
            </Card>
            <Card className="my_genre_card ">
                {/* genre_card_container */}
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text">Horror</Col>
                </Row>
            </Card>
            <Card className="my_genre_card ">
                {/* genre_card_container */}
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text"></Col>
                </Row>
            </Card>
            <Card className="my_genre_card ">
                {/* genre_card_container */}
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text">Literary Fiction</Col>
                </Row>
            </Card>
            <Card className="my_genre_card ">
                {/* genre_card_container */}
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text">Classics</Col>
                </Row>
            </Card>
                </CardGroup>
            </Row>
        </Container>
    );
}

export default GenreCard;
