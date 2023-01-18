import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Styles/Recipe.scss';
import { Form } from "react-bootstrap";
import Logo from './images/logo.png';

class Recipe extends React.Component{

    render(){
        return(
            <>
            <div className="top">
                <img className='logo' src={Logo}  alt='Logo of the company'/>
                <h1>{this.props.title}</h1>
                <Link to="/">Home</Link>
                <img  className="food" src={this.props.image} alt="Food from title"/>

                <div className="list">
                    <Form>
                        {this.props.ingredients?.map((item, key) => (
                            <div key={key} className="mb-3">
                            <Form.Check type='checkbox' label={item}/>
                            </div>
                        ))}
                    </Form>
                </div>

                <p className="directions">{this.props.directions}</p>
            </div>
            </>
        )
    }
}

export default Recipe;