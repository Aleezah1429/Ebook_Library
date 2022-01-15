import React, { useState } from "react";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardGroup, Card, Container, Row } from 'react-bootstrap';
import { FaPen } from "react-icons/fa";
import MyCard from "./card";


function Edit_Profile() {
    return (
        <div class="container d-flex justify-content-center ">
            <div class="profile_card p-3 py-4 profile_div">
                <div class="text-center"> <img src="https://i.imgur.com/stD0Q19.jpg" width="150" class="rounded-circle profile_image" />
                <Container className="search_bar">
                                <input type="text" placeholder="Maria Smith" name="search" />
                                <button type="submit">< FaPen /></button>
                            </Container>
                    {/* <span class="mt-1 clearfix">Android Developer</span> */}
                    <div class="row mt-3 mb-3 my_profile_row">
                        <div class="col">
                            <h5>Genre</h5>
                            <Container className="search_bar">
                                <input type="text" placeholder="fiction fantasy horror.." name="search" />
                                <button type="submit">< FaPen /></button>
                            </Container>
                        </div>
                    </div>
                    <div class="row mt-3 mb-3 my_profile_row">
                        <div class="col">
                            <h5>Favourite Author</h5>
                            <Container className="search_bar">
                                <input type="text" placeholder="kalid hussain Anupem Kher.. " name="search" />
                                <button type="submit">< FaPen /></button>
                            </Container>
                        </div>
                    </div>
                    <div class="row mt-3 mb-3 my_profile_row">
                        <div class="col">
                            <h5>Favourite Book</h5>
                            <Container className="search_bar">
                                <input type="text" placeholder="Kite Runner Forty Rules of love" name="search" />
                                <button type="submit">< FaPen /></button>
                            </Container>
                        </div>
                    </div>
                    {/* <hr class="line"></hr><small class="mt-4 qoute">"A room without books is like a body without a soul"</small> */}
                    {/* <div class="social-buttons mt-5"> <button class="neo-button"><i class="fa fa-facebook fa-1x"></i> </button> <button class="neo-button"><i class="fa fa-linkedin fa-1x"></i></button> <button class="neo-button"><i class="fa fa-google fa-1x"></i> </button> <button class="neo-button"><i class="fa fa-youtube fa-1x"></i> </button> <button class="neo-button"><i class="fa fa-twitter fa-1x"></i> </button> </div> */}
                    <div class="profile mt-5"> <button class="profile_button px-5">Save Changes</button> </div>
                </div>
            </div>
        </div>
    );
}

export default Edit_Profile;
