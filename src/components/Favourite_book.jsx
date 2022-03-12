import React, { useState, useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  CardGroup,
  Card,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import fire from "../firebase";
import readme from "..//assets/img/readme_logo_icon.png";

function Favourite() {
  // States for MODAL
  const [modalShow, setModalShow] = useState(false);
  const [rating, setRating] = useState(null);

  const [data, setData] = useState([]);

  // States of book img and pdf show
  const [image, setImage] = useState("");
  const [UrlImg, setUrlImg] = useState("");

  const [isFavourite, setisFavourite] = useState("heartcolor_1");

  const [BookId, setBookId] = useState("");

  var getLemail =  localStorage.getItem("Lemail")
  var userId = getLemail.split("@")

  // Get Data of Books From Database
  var items = [];

  function getData() {
      fire
        .firestore()
        .collection("Favourite_Books").doc(userId[0])
        .get()
        .then((querySnapshot) => {
            querySnapshot.data().Books.forEach((doc) => {
                var newId = JSON.parse(doc).id
                fire
                .firestore()
                .collection("Books").doc(newId)
                .get().then((e)=>{
                     items.push(e.data())
                     console.log("ITEMSSSS",items)
              setData([...data,...items])
                     
                })

              });
    
          })
          

        .catch((error) => {
          console.log(error);
        })
  }

  useEffect(() => {
   getData()

  }, []);


  function OpenPdf(id, pdf) {
    // Getting Link of Pdf
    window.open(pdf, '_blank');




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


  function ShowModal(condition,id){
    setBookId(id)
    setModalShow(condition)
  }
  return (
    <Container>
      <Container>
        <Row style={{padding:"5%",fontSize:"20px"}} className="card_greeting">Favourite Books</Row>
        <Row xs={1} sm={3} md={5} className="g-4">
          {console.log("MYYYY", data)}
          {Array.from({ length: data.length }).map((_, idx) => (
            <Col>
              <Card  className="my_card" key={data[idx].id}>
                <Card.Img onClick={()=>OpenPdf(data[idx].id,data[idx].Pdf)}
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
                       className={isFavourite}
                    >
                      &hearts;
                    </span>
                  </small>
                </Card.Footer>
                <Card.Text
                  className="stars_div text-center"
                  type="button"
                  onClick={() => ShowModal(true,data[idx].id)}
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
                          {console.log("LLLLLL",data[idx].id)}
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
    </Container>
  );
}

export default Favourite;




