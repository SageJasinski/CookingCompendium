import React from "react";
import { Link } from "react-router-dom";
// import App from "./App";

class Recipe extends React.Component{

    render(){
        return(
            <>
                <h1>{this.props.title}</h1>
                <Link to="/">Home</Link>
                <img src={this.props.image} alt="Food from title"/>
            </>
        )
    }
}

export default Recipe;