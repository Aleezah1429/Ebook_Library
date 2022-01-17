import React, { useState, useEffect } from "react";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardGroup, Card, Container, Row } from 'react-bootstrap';
import { FaRegHeart } from "react-icons/fa";
import fire from "../firebase";
import readme from "..//assets/img/readme_logo_icon.png";

function MyCard({ heading }) {

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
              console.log(doc.id, "=>", doc.data());
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
    console.log(data)
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
          console.log(url)
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
      <Row className="card_greeting">{heading} </Row>

      <CardGroup className="card_container" >
        {loader === false && (data.map((book) => (
          <Card className="my_card" key={book.id}>
            <Card.Img variant="top" src={UrlImg} className="card_image" />
            <Card.Img variant="top" src={readme} className="card_image_2" />
            <Card.Body>
              <Card.Title className="my_card_title">{book.BookName}</Card.Title>
              <Card.Text className="my_card_text">
                {book.Description}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="card_footer">
              <small className="text-muted my_card_text ">{book.AuthorName} <span className="card_heart">&hearts;</span></small>
            </Card.Footer>
          </Card>
        )))}
      </CardGroup>

    </Container>
  );
}


export default MyCard;
