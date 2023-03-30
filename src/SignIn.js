import React from "react";
import { Link } from "react-router-dom";
import './Styles/SignIn.scss';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";



class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            signInSuccessful: false,
        }
    }


    userSignIn = (event) => {
        event.preventDefault();

        const email = this.state.email;
        const password = this.state.password;
        const auth = getAuth();


        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            this.setState({signInSuccessful: true})
        })
        .catch((error) => {
            const errorCode = error.code;

            switch (errorCode){
                case 'auth/wrong-password':
                    toast.error('Incorrect email or password');
                    break;
                case 'auth/user-not-found':
                    toast.error('No user found');
                    break;
                case 'auth/too-many-requests':
                    toast.error('To many failed attempts. Please reset your password or try again later.');
                    break;
                default:
                    toast.error(error.message);
                    break;
            }

            // console.error(error);
        });
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    resetPassword = async (event) => {
        event.preventDefault();
        const email = this.state.email;

        await sendPasswordResetEmail(getAuth(), email).then(()=>{
            alert('password reset email sent!');
        }).catch((error) => {
            console.error(error.message);
        });
    }


    render(){

        return(
        <>
            <ToastContainer/>

            <div className="container">
                {this.state.signInSuccessful ? (
                    <>
                        <h2>Success! what would you like to do next?</h2>

                    <div className="option">
                        <Link className='home-btn' to="/">Home</Link>
                        <Link className='profile-btn' to="/Profile">Profile</Link>
                    </div>
                    </>
                ) : (
                    <form onSubmit={this.userSignIn}>

                    <div className="form-group">
                        <label htmlFor="Email">Email address</label>
                        <input type="email"  onChange={this.onEmailChange} className="form-control" id="Email"  placeholder="Enter Email"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Password">Password</label>
                        <input type="password" onChange={this.onPasswordChange} className="form-control" id="Password" placeholder="Password"/>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                )}
            </div>

            <div className="container">
                <div className='sign-up'>
                    <p>Create an account</p>
                    <Link className='log-btn' to="/signup">Sign Up</Link>
                    <button className="reset-password" onClick={this.resetPassword}>password reset</button>
                </div>
            </div>

        </>
        )
    }

}

export default SignIn;