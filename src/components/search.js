import React, { useState, useEffect } from "react";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardGroup, Card, Container, Row, Col, Modal } from 'react-bootstrap';
import fire from "../firebase";
import readme from "..//assets/img/readme_logo_icon.png";
import { FaSearch } from "react-icons/fa";

function Search() {

  var getLemail = localStorage.getItem("Lemail")
  var userId = getLemail.split("@")

  // const [BookId, setBookId] = useState("");

  const [isFavourite, setisFavourite] = useState("heartcolor_1");

  // Store collection of book details in firestore
  const ref = fire.firestore().collection("Books")


  // States for MODAL
  const [modalShow, setModalShow] = useState(false);
  const [rating, setRating] = useState(null);

  // States for Book Data
  const [data, setData] = useState([]);

  // States for Search
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [SearchResult, setSearchResult] = useState("");


  const getMarker = async () => {
    const snapshot = await fire.firestore().collection('Books').get()
    return snapshot.docs.map(doc => doc.data());
  }

  function SearchForBook(e) {
    setValue(e.target.value)
    if (value.length > 0) {
      getMarker()
        .then(
          responseData => {
            setResult([]);
            let searchQuery = value.toLowerCase();
            for (const key in responseData) {
              let book = responseData[key].BookName.toLowerCase();
              if (book.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
                console.log("SEARCH QUERY", responseData[0].BookName)
                console.log("book", responseData[key])
                setSearchResult(responseData[key])
                setResult(prevResult => {
                  return [...prevResult, responseData[key].BookName]
                });
              }
            }
          }
        )
        .catch(error => {
          console.error();
        });
    }
    else {
      setResult([])
    }


  }

  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      fire
        .firestore()
        .collection("Books")
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              items.push(doc.data());
            });
          }
          setData(items);
        })

        .catch((error) => {
          console.log(error);
        });
    });
    console.log(data);
  }, [value])


  // Add to favourite
  const AddToFavourites = (id, name) => {
    let arr;
    fire.firestore().collection("Favourite_Books").doc(userId[0]).get().then((snap) => {
      if (snap.data() == undefined) {
        arr = []
      }
      else {
        arr = snap.data().Books
      }

      const singleObj = { id, name }
      arr.push(JSON.stringify(singleObj))
      console.log("name", name)

      // Set on Firestore
      fire
        .firestore()
        .collection("Favourite_Books")
        .doc(userId[0])
        .set(
          {
            Books: arr
          }).then(
            alert(`${name} Added to Favourite`)
          )

    })
  }


  function OpenPdf(id, pdf) {
    window.open(pdf, '_blank');
  }

  return (
    <Container className="search_bar">
      <Container className="search_bar_com">
        <input type="text" placeholder="Author, Book, Article..." name="search"
          onChange={(e) => SearchForBook(e)}
          value={value}
        />
        <button type="submit"><FaSearch /></button>
      </Container>
      <div>
      </div>
      <Container>
        <Row xs={1} sm={3} md={5} className="g-4">

          <Col>
            {(SearchResult) ?
              <Card className="my_card" key={SearchResult.id}>
                <Card.Img variant="top" src={SearchResult.Image} className="card_image" onClick={() => OpenPdf(SearchResult.id, SearchResult.Pdf)} />
                <Card.Img variant="top" src={readme} className="card_image_2" />

                <Card.Body>
                  <Card.Title className="my_card_title">{SearchResult.BookName}</Card.Title>
                  <Card.Text className="my_card_text">
                    {SearchResult.Description.slice(0, 100) + "..."}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="card_footer">
                  <small className="text-muted my_card_text ">
                    {SearchResult.AuthorName}
                    <span
                      type="button"
                      onClick={() => {
                        AddToFavourites(SearchResult.id, SearchResult.BookName)
                      }}
                      className={isFavourite}
                    >
                      &hearts;
                    </span>
                  </small>
                </Card.Footer>
                <Card.Text className="stars_div text-center" type="button" onClick={() => setModalShow(true)}>{
                  [...Array(5)]
                    .map((_, index) => {
                      return <span className={index < SearchResult.rating ? "star_2" : "star_1"}>&#9733;</span>
                    })
                }
                </Card.Text>

                {/* Modal for User view and give feedback */}
                <Modal size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={modalShow} key={SearchResult.id} onRequestClose={false}>
                  <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter" >
                      Give some star!
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="center-block">
                    {
                      [...Array(5)]
                        .map((_, index) => {
                          return <label className="modal_star text-center">
                            <input type="radio" value={index + 1} onClick={() => setRating(index + 1)} />
                            <span className={(index + 1) <= (rating) ? "modalstar_2" : "modalstar_1"}>&#9733;</span>
                          </label>
                        })

                    }
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => setModalShow(false)} className="center-block"
                    >Submit</Button>
                  </Modal.Footer>
                </Modal>
              </Card>
              : null}
          </Col>

        </Row>
      </Container>

    </Container>
  );
}

export default Search;
