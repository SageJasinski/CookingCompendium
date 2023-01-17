import React from "react";
import { Link } from "react-router-dom";
import App from "./App";
class Recipe extends React.Component{

    render(){
        return(
            <>
                <h1>{this.props.Name}</h1>
                <Link to={App}>Home</Link>
                <img src={this.props.image} alt="food above"/>
            </>
        )
    }
}

export default Recipe;