import React from "react";
import { Link } from "react-router-dom";
import './Styles/SignIn.scss';
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth();

class SignIn extends React.Component{

    // signInUser(){
    //         signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         // Signed in
    //         const user = userCredential.user;
    //         // ...
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //     });
    // }

    render(){

        return(
            <>
            <div className='sign-up'>
                <Link className='log-btn' to="/signup">Sign Up</Link>
            </div>
            </>
        )
    }



}

export default SignIn;