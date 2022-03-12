import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import test2 from "../assets/img/test_2.jpg";
import "../App.css";
import MyCard from "./card";

function Home() {
  var getLemail = localStorage.getItem("Lemail");
  var userIdList = getLemail.split("@");
  const userId = userIdList[0];
  const lst = ["Action", "Fantacy", "Mystery", "Comedy", "Teenagers", "Science Fiction"]
  return (
    <>
         <Container>
      <Row className="genra_greeting">WELCOME</Row>
      <Row xs={1} sm={2} md={3} className="g-4">
        {Array.from({ length: lst.length }).map((_, idx) => (
          <Col>
            <Card className="my_genre_card my_gere_card_2">

                {/* genre_card_container */}
                <Row>
                    <Col ><Card.Img variant="top" src={test2} className="genre_card_image" /></Col>
                    <Col className="genre_col_text">{lst[idx]}</Col>
                </Row>
            </Card>
          </Col>
        ))}
    
      </Row>
    </Container>
      <MyCard heading={"Sepecially made for " + userId} />
    </>
  );
}
export default Home;
