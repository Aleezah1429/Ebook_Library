import React, { useState, useEffect } from "react";
import fire from "../firebase";
import GenreCard from "./genre_card";
import MyCard from "./card";


function Recommandation() {

    // Store collection of book details in firestore
    const ref = fire.firestore().collection("Books").doc("Book_1")

    // States for Book Data
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);

    // Get Data of Books From Database
    function getData() {
        ref.onSnapshot((querySnapshot) => {
            const items = []
            fire.firestore().collection("Books")
                .get()
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            // console.log(doc.id, "=>", doc.data().Genre);
                            const myGenres = JSON.parse(localStorage.getItem("Genres"))
                            console.log("genres", myGenres)
                            for (var i = 0; i < myGenres.length; i++) {
                                console.log("GEN", myGenres[i])
                                if (doc.data().Genre === myGenres[i]) {
                                    console.log("Action Genre", doc.data())
                                }
                            }

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
        // console.log(data)
    }, [])

    // var getLemail = await localStorage.getItem("Lemail")
    // var userId = getLemail.split("@")
    const userId = "Aleezah"
    return (
        <div>
            <GenreCard />
            <MyCard heading={"Sepecially made for " + userId} />
        </div>
    )
}
export default Recommandation;