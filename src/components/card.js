import React, { useState } from "react";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardGroup, Card, Container, Row } from 'react-bootstrap';
import test2 from "../assets/img/test_2.jpg";
import readme from "..//assets/img/readme_logo_icon.png"

import { FaRegHeart } from "react-icons/fa";

function MyCard({ heading }) {
  return (
    <Container>
      <Row className="card_greeting">{heading}</Row>
    
      <CardGroup className="card_container" >
        <Card className="my_card">
          <Card.Img variant="top" src={test2} className="card_image" />
          <Card.Img variant="top" src={readme} className="card_image_2" />
          <Card.Body>
            <Card.Title className="my_card_title">Book Name</Card.Title>
            <Card.Text className="my_card_text">
              This is a Book Intro with supporting text below as a natural lead-in to
              additional content.
            </Card.Text>
          </Card.Body>
          <Card.Footer className="card_footer">
            <small className="text-muted my_card_text ">Author Name <span className="card_heart">&hearts;</span></small>

          </Card.Footer>
        </Card>
        <Card className="my_card">
          <Card.Img variant="top" src={test2} className="card_image" />
          <Card.Img variant="top" src={readme} className="card_image_2" />
          <Card.Body>
            <Card.Title className="my_card_title">Book Name</Card.Title>
            <Card.Text className="my_card_text">
              This is a Book Intro with supporting text below as a natural lead-in to
              additional content.
            </Card.Text>
          </Card.Body>
          <Card.Footer className="card_footer">
            <small className="text-muted my_card_text ">Author Name <span className="card_heart">&hearts;</span></small>

          </Card.Footer>
        </Card>
        <Card className="my_card">
          <Card.Img variant="top" src={test2} className="card_image" />
          <Card.Img variant="top" src={readme} className="card_image_2" />
          <Card.Body>
            <Card.Title className="my_card_title">Book Name</Card.Title>
            <Card.Text className="my_card_text">
              This is a Book Intro with supporting text below as a natural lead-in to
              additional content.
            </Card.Text>
          </Card.Body>
          <Card.Footer className="card_footer">
            <small className="text-muted my_card_text ">Author Name <span className="card_heart">&hearts;</span></small>

          </Card.Footer>
        </Card>
        <Card className="my_card">
          <Card.Img variant="top" src={test2} className="card_image" />
          <Card.Img variant="top" src={readme} className="card_image_2" />
          <Card.Body>
            <Card.Title className="my_card_title">Book Name</Card.Title>
            <Card.Text className="my_card_text">
              This is a Book Intro with supporting text below as a natural lead-in to
              additional content.
            </Card.Text>
          </Card.Body>
          <Card.Footer className="card_footer">
            <small className="text-muted my_card_text ">Author Name <span className="card_heart">&hearts;</span></small>

          </Card.Footer>
        </Card>
        <Card className="my_card">
          <Card.Img variant="top" src={test2} className="card_image" />
          <Card.Img variant="top" src={readme} className="card_image_2" />
          <Card.Body>
            <Card.Title className="my_card_title">Book Name</Card.Title>
            <Card.Text className="my_card_text">
              This is a Book Intro with supporting text below as a natural lead-in to
              additional content.
            </Card.Text>
          </Card.Body>
          <Card.Footer className="card_footer">
            <small className="text-muted my_card_text ">Author Name <span className="card_heart">&hearts;</span></small>

          </Card.Footer>
        </Card>
      </CardGroup>

  

    </Container>
  );
}

export default MyCard;
