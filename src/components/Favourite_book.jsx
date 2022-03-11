

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
import { FaRegHeart } from "react-icons/fa";
import fire from "../firebase";
import readme from "..//assets/img/readme_logo_icon.png";

function Favourite({ heading }) {
  // States for MODAL
  const [modalShow, setModalShow] = useState(false);
  const [rating, setRating] = useState(null);

  // Store collection of book details in firestore
  const ref = fire.firestore().collection("Books").doc("Book_1");

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

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
            // console.log("QUERYYYYY",querySnapshot.data().Books);
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
              

            //   console.log("ITEMS",items);
            

          })
          

        .catch((error) => {
          console.log(error);
        })

        
      // setLoader(false)
  }

  useEffect(() => {
   getData()

  }, []);

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
    fire
      .storage()
      .ref("Book_1")
      .child("GFX_Mentor.jpg")
      .getDownloadURL()
      .then((url) => {
        setUrlImg(url);
        // console.log(url)
      });



    
    // }
  }

  function OpenPdf(id,pdf){
    // Getting Link of Pdf
  window.location.href = pdf



}
  const AddToFavourites=(id,name)=>{
    // console.log("LLLLBJKBJKBJKBJ",id)
    // fire.firestore().collection("Favourite_Books").doc("Aleezah").get().then((snap)=>{
    //   console.log("OOPOPOPOPO",snap.data().Books)
    //   const arr = snap.data().Books
    //   // const name = snap.data().BookName
      
    //       const singleObj = {id,name}
    //   //    const newEntry = {IdBook,name}
    //   //     // singleObj.push(JSON.stringify(newEntry))
    //   arr.push(JSON.stringify(singleObj))
    //   console.log("AKDKDNKSNDSDNND",arr)
    //       fire
    //       .firestore()
    //       .collection("Favourite_Books")
    //       .doc("Aleezah")
    //       .update(
    //         {Books:arr
    //       })

    // })
    
  }

  const GiveRating=(rate)=>{
        
        setRating(rate)
        fire.firestore().collection("Feedback").doc("Aleezah").get().then((snap)=>{
          const objs = snap.data().ratings
          // const singleObj = {}
         const newEntry = {BookId,rate}
          objs.push(JSON.stringify(newEntry))
          fire
          .firestore()
          .collection("Feedback")
          .doc("Aleezah")
          .update(
            {ratings:objs
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
            {/* {setisFavourite("heartcolor_1")} */}
              {/* {console.log("DIV", data[idx])} */}

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
                      onClick={() => {
                        // isFavourite == "heartcolor_2"
                        //   ? setisFavourite("heartcolor_1")
                        //   : setisFavourite("heartcolor_2");
                        AddToFavourites(data[idx].id,data[idx].BookName)
                      }}
                      // heart color will be ornge if it is present in database otherwise grey
                      className={isFavourite}
                      // Aleezah apply condition that if its click favourte will asssigne oppsite boolen values
                      // onClick={}
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




