import React, { useState, useEffect } from "react";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import fire from "../firebase";
import Avatar from 'react-avatar';



function Profile() {

    // States for Genres Data
    const [genreData, setGenreData] = useState([]);
    var getLemail = localStorage.getItem("Lemail")
    var userId = getLemail.split("@")

    // Store collection of book details in firestore
    const ref = fire.firestore().collection("Genre").doc(userId[0])

    // Get Array of Genre From Database
    function getGenreData() {
        ref.onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
                setGenreData(querySnapshot.data().Favourite_Genres)

            }
        })
    }



    useEffect(() => {
        getGenreData();
    }, [])

    return (
        <div class="container d-flex justify-content-center ">
            <div class="profile_card p-3 py-4 profile_div">
                <div class="text-center">
                    <Avatar
                        size={120}
                        round={true}
                        name={userId[0].slice(0, 2)}
                        color={"rgb(255, 166, 0)"}
                    />
                    <h3 class="mt-2">{userId[0]}</h3>
                    <div class="row mt-3 mb-3 my_profile_row">
                        <div class="col">
                            <h5>Genre</h5>
                            {
                                genreData.map((val, id) => {
                                    return (
                                        <span class="num">{val}</span>

                                    )

                                })
                            }

                        </div>
                    </div>
                    <hr class="line"></hr><small class="mt-4 qoute">"A room without books is like a body without a soul"</small>
                </div>
            </div>
        </div>
    );
}

export default Profile;
