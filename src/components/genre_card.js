import React, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardGroup, Card, Row,Col, Container } from 'react-bootstrap';
import test2 from "../assets/img/test_2.jpg";
import "../App.css"
import { FaRegHeart } from "react-icons/fa";

function GenreCard() {
    return (
        <Container >

    <Row className="genra_greeting">Good morning</Row>
        <Row>
        <CardGroup className="genre_card_container">
            <Card className="my_genre_card">
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text">Genre</Col>
                </Row>
            </Card>

            <Card className="my_genre_card">
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text">Genre</Col>
                </Row>
            </Card>
            <Card className="my_genre_card">
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text">Genre</Col>
                </Row>
            </Card>
           
        </CardGroup>
        </Row>

        <Row>
        <CardGroup className="genre_card_container">
            <Card className="my_genre_card">
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text">Genre</Col>
                </Row>
            </Card>

            <Card className="my_genre_card">
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text">Genre</Col>
                </Row>
            </Card>
            <Card className="my_genre_card">
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text">Genre</Col>
                </Row>
            </Card>
           
        </CardGroup>
        </Row>
        </Container>
    );
}

export default GenreCard;
