import React, { useState, useEffect } from "react";
import fire from "../firebase";
import GenreCard from "./genre_card";
import MyCard from "./card";


function Home() {


    // var getLemail = await localStorage.getItem("Lemail")
    // var userId = getLemail.split("@")
    const userId = "Aleezah"
    return (
        <div>
            {/* <GenreCard /> */}
            <MyCard heading={"Sepecially made for " + userId} />
        </div>
    )
}
export default Home;