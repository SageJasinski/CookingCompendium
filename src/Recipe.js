import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Styles/Recipe.scss';
import { Form } from "react-bootstrap";
import { ref, child, get, push } from "firebase/database";
import Logo from './images/logo.png';



function Recipe(props) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);

  const database = props.database;

  const passedUser = props.user;

  const userNow = new Date();
  const currentDate = userNow.toLocaleDateString('EN-us',{month:'numeric',  year:'2-digit'})





  useEffect(() => {

    const commentsRef = ref(database);

    get(child(commentsRef, `comments/${id}`)).then((snapshot) => {
      if(snapshot.exists()){

        const commentsArray = Object.keys(snapshot.val()).map((key) => {
          return{
            id: key,
            text: snapshot.val()[key].text,
            user: snapshot.val()[key].user,
            timestamp: snapshot.val()[key].timestamp
          }
        })
        setComments(commentsArray);
      }

      if(passedUser){
        setUser(passedUser);
      }

    }).catch((error) => {
      console.error(error);
    });

  }, [id, setComments, database, comments, passedUser]);

  useEffect(() => {
    const recipesData = JSON.parse(localStorage.getItem("recipesData"));

    const foundRecipe = recipesData.find((recipe) => recipe.id === Number(id));
    setRecipe(foundRecipe || {});
  }, [id, setRecipe]);



 const commentSubmission = (event) => {

  event.preventDefault();

  const commentText = event.target.comment.value;

  push(ref(database, `comments/${id}`), {
    text: commentText,
    timestamp: currentDate,
    user: user.displayName
  });
  event.target.reset();
 }

//  const removeComment = (commentId) => {
//   database().ref(`comments/${id}/${commentId}`).remove();
//  }


  return (

    <>
      <div className="top">
        <img className='logo' src={Logo}  alt='Logo of the company'/>
        <h1>{recipe.title || "Recipe not found"}</h1>
        <Link to="/">Home</Link>
        <img  className="food" src={recipe.image} alt="Food from title"/>
        <button  className="print-btn" onClick={window.print}>Print Recipe</button>

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


      {user?.displayName && (
        <form className="comment" onSubmit={commentSubmission}>
          <input type="text" name="comment" placeholder="Write a comment" autoComplete="off"/>
          <button type="submit">Post</button>
        </form>)
      }

      {comments? (<div className="card"> <p className="card-body"> There seem to be no comments here. Be the first to contribute!</p> </div>) : (<></>)}


       {comments.map((comment) => (
          <div className="card" key={comment.id}>
            <p className="card-body">{comment.text}</p>
            <p className="card-footer">{comment.user} - {comment.timestamp}</p>
          </div>
       ))}

       </div>

    </>
  );
}

export default Recipe;