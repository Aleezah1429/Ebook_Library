import React, { useState } from "react";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardGroup, Card,Container,Row } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import MyCard from "./card";

import "./mystyle.css";
function Search() {
  return (
    <Container className="search_bar">
      
     <Container className="search_bar_com">
      <input type="text" placeholder="Author, Book, Article..." name="search" />
      <button type="submit"><FaSearch/></button> 
      </Container>
      <Row>
          <Row className="card_greeting">Recent Search</Row>
          <MyCard></MyCard>

      </Row>
      
    </Container>
  );
}

export default Search;
