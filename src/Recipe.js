import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Styles/Recipe.scss';
import { Form } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { ref, set, child, get, push } from "firebase/database";
// import 'firebase/database';
import Logo from './images/logo.png';



function Recipe(props) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [comments, setComments] = useState([]);

  const database = props.database;
  const user = props.user;


  useEffect(() => {

    const commentsRef = ref(database);

    get(child(commentsRef, `comments/${id}`)).then((snapshot) => {
      if(snapshot.exists()){

        const commentsArray = Object.keys(snapshot.val()).map((key) => {
          return{
            id: key,
            text: snapshot.val()[key].text,
            user: snapshot.val()[key].user
          }
        })
        setComments(commentsArray);
      }else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  }, [id, setComments, database, comments]);

  useEffect(() => {
    const recipesData = JSON.parse(localStorage.getItem("recipesData"));

    const foundRecipe = recipesData.find((recipe) => recipe.id === Number(id));
    setRecipe(foundRecipe || {});
  }, [id, setRecipe]);



  // getAuth().onAuthStateChanged((user) => {
  //   if(user){
  //     this.setState({ user });
  //   }else{
  //     this.setState({user: null});
  //   }
  //   });


 const commentSubmission = (event) => {

  event.preventDefault();

  const commentText = event.target.comment.value;

  push(ref(database, `comments/${id}`), {
    text: commentText,
    // timestamp: database.ServerValue.TIMESTAMP,
    user: user.displayName
  });
  event.target.reset();
 }

 const removeComment = (commentId) => {
  database().ref(`comments/${id}/${commentId}`).remove();
 }


  return (

    <>
      <div className="top">
        <img className='logo' src={Logo}  alt='Logo of the company'/>
        <h1>{recipe.title || "Recipe not found"}</h1>
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

      <div className="comment-section">


      {user ? <form className="comment" onSubmit={commentSubmission}>
          <input type="text" name="comment" placeholder="Write a comment" autoComplete="off"/>
          <button type="submit">Post</button>
        </form> : <></>
      }


       {comments.map((comment) => (
          <div className="card" key={comment.id}>
            <p className="card-body">{comment.text}</p>
            <p>{comment.timestamp}</p>
            <p className="card-footer">{comment.user}</p>
          </div>
       ))}

       </div>

    </>
  );
}

export default Recipe;