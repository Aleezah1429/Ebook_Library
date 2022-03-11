import React, { useState, useEffect } from "react";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardGroup, Card, Container, Row } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import MyCard from "./card";
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
                console.log("ALAMASMA:SA", querySnapshot.data().Favourite_Genres)
                // localStorage.setItem("Genres",JSON.stringify(querySnapshot.data().Favourite_Genres))
                // console.log(querySnapshot.id, "=>", querySnapshot.data().Favourite_Genres);
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
                    {/* <img src="https://i.imgur.com/stD0Q19.jpg" width="150" class="rounded-circle profile_image" /> */}
                    <h3 class="mt-2">{userId[0]}</h3>
                    {/* <span class="mt-1 clearfix">Android Developer</span> */}
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
                    {/* <div class="row mt-3 mb-3 my_profile_row">
                        <div class="col">
                            <h5>Favourite Author</h5>
                            <span class="num">Kalid Hussain</span>
                            <span class="num">Anupam Kher</span>
                            <span class="num">Ashis Ray</span>
                        </div>
                    </div> */}
                    {/* <div class="row mt-3 mb-3 my_profile_row">
                <div class="col">
                    <h5>Favourite Book</h5> 
                    <span class="num">Kite Runner</span>
                    <span class="num">Lessons Life Taught Me Unknowingly</span>
                    <span class="num">Cricket World Cup: The Indian Challenge</span>
                </div>
            </div> */}
                    <hr class="line"></hr><small class="mt-4 qoute">"A room without books is like a body without a soul"</small>
                    {/* <div class="social-buttons mt-5"> <button class="neo-button"><i class="fa fa-facebook fa-1x"></i> </button> <button class="neo-button"><i class="fa fa-linkedin fa-1x"></i></button> <button class="neo-button"><i class="fa fa-google fa-1x"></i> </button> <button class="neo-button"><i class="fa fa-youtube fa-1x"></i> </button> <button class="neo-button"><i class="fa fa-twitter fa-1x"></i> </button> </div> */}
                    {/* <div class="profile mt-5"> <button class="profile_button px-5">Done</button> </div> */}
                </div>
            </div>
        </div>
    );
}

export default Profile;
