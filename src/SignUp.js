import React from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import './Styles/SignUp.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";



class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            email: "",
            password: "",
            username: "",
            signInSuccessful: false,
        }
    }

    makeNewUser = (event) => {
        event.preventDefault();

        const email = this.state.email;
        const password = this.state.password;
        const username = this.state.username;
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

            const user = userCredential.user
            updateProfile(user, {displayName: username})

            this.setState({ username: username || user})
            this.setState({signInSuccessful: true})
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            switch (errorCode){
                case 'auth/email-already-in-use':
                    toast.error('This Email is already in use');
                    break;
                case 'auth/invalid-email':
                    toast.error('Invalid email address');
                    break;
                case 'auth/weak-password':
                    toast.error('Password should be at least 6 characters long');
                    break;
                default:
                    toast.error(errorMessage);
                    break;
            }

            // console.log(error)
        });
    }


    onEmailChange = (event) =>{
        this.setState({email: event.target.value});
    }
    onUsernameChange = (event) => {
        this.setState ({username: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    render(){
        // const {email, password, username } = this.state;
        return(
            <>
            <ToastContainer/>

            <div className="container">
                { this.state.signInSuccessful === false && (
                    <form onSubmit={this.makeNewUser}>

                        <div className="form-group">
                            <label htmlFor="Email">Email address</label>
                            <input type="email"  onChange={this.onEmailChange} className="form-control" id="Email"  placeholder="Enter Email"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Username">Username</label>
                            <input onChange={this.onUsernameChange} className="form-control" id="Username"  placeholder="Enter Username"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input type="password" onChange={this.onPasswordChange} className="form-control" id="Password" placeholder="Password"/>
                        </div>

                        <div >
                            <label className="terms">
                                <input type="checkbox" name="terms_and_conditions" required={true}/>
                                I agree to the <Link to="/policy" target="_blank">terms and conditions</Link>
                            </label>
                        </div>



                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                )}

                {this.state.signInSuccessful && (
                    <>
                        <h2>Success! what would you like to do next?</h2>

                        <div className="option">
                            <Link className='home-btn' to="/">Home</Link>
                            <Link className='profile-btn' to="/">Profile</Link>
                        </div>
                    </>
                )}
            </div>
            </>
        )
    }
}

export default SignUp;