import React from "react";

const Hero = ({handleLogout}) =>{
    return(
        <div>
            <h1>Welcome</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Hero;