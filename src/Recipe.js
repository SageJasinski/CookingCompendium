import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Styles/Recipe.scss';
import { Form } from "react-bootstrap";
import Logo from './images/logo.png';

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});


  useEffect(() => {
    const recipesData = JSON.parse(localStorage.getItem("recipesData"));
    
    const foundRecipe = recipesData.find((recipe) => recipe.id === Number(id));
    setRecipe(foundRecipe || {});
  }, [id, setRecipe]);


  return (

    <>
      <div className="top">
        <img className='logo' src={Logo}  alt='Logo of the company'/>
        <h1>{recipe.title}</h1>
        <Link to="/">Home</Link>
        <img  className="food" src={recipe.image} alt="Food from title"/>

        <div className="list">
          <Form>
            {recipe.ingredients?.map((item, key) => (
              <div key={key} className="mb-3">
                <Form.Check type='checkbox' label={item}/>
              </div>
            ))}
          </Form>
        </div>

        <p className="directions">{recipe.directions}</p>

        <div className="ad">
          <ins className="adsbygoogle"
            data-ad-client="ca-pub-5445071165173481"
            style={{ display: 'block' }}
            data-ad-slot="5167208377"
            data-ad-format="auto"
            data-full-width-responsive="true"/>
        </div>
      </div>
    </>
  );
}

export default Recipe;