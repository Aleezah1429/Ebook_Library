import React, { useState, useEffect } from "react";
import fire from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, CardGroup, Card, Row, Col, Container } from "react-bootstrap";
import test2 from "../assets/img/test_2.jpg";
import "../App.css";
import { FaRegHeart } from "react-icons/fa";
import MyCard from "./card";

function Home() {
  var getLemail = localStorage.getItem("Lemail");
  console.log("SDBSKDSKDSDLK", getLemail);
  var userIdList = getLemail.split("@");
  const userId = userIdList[0];
  return (
    <>
      <Card className="my_genre_card ">
        {/* genre_card_container */}
        <Row>
          <Col>
            <Card.Img variant="top" src={test2} className="genre_card_image" />
          </Col>
          <Col className="genre_col_text">Action</Col>
        </Row>
      </Card>
      <Card className="my_genre_card ">
        {/* genre_card_container */}
        <Row>
          <Col>
            <Card.Img variant="top" src={test2} className="genre_card_image" />
          </Col>
          <Col className="genre_col_text">Fantacy</Col>
        </Row>
      </Card>
      <Card className="my_genre_card ">
        {/* genre_card_container */}
        <Row>
          <Col>
            <Card.Img variant="top" src={test2} className="genre_card_image" />
          </Col>
          <Col className="genre_col_text">Detective and Mystery</Col>
        </Row>
      </Card>
      <Card className="my_genre_card ">
        {/* genre_card_container */}
        <Row>
          <Col>
            <Card.Img variant="top" src={test2} className="genre_card_image" />
          </Col>
          <Col className="genre_col_text">Horror</Col>
        </Row>
      </Card>
      <Card className="my_genre_card ">
        {/* genre_card_container */}
        <Row>
          <Col>
            <Card.Img variant="top" src={test2} className="genre_card_image" />
          </Col>
          <Col className="genre_col_text">Literary Fiction</Col>
        </Row>
      </Card>
      <Card className="my_genre_card ">
        {/* genre_card_container */}
        <Row>
          <Col>
            <Card.Img variant="top" src={test2} className="genre_card_image" />
          </Col>
          <Col className="genre_col_text">Classics</Col>
        </Row>
      </Card>
      <MyCard heading={"Sepecially made for " + userId} />
    </>
  );
}
export default Home;
