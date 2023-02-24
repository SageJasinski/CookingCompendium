import React from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import './Styles/SignUp.scss';
import { Link } from "react-router-dom";



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
            console.error(error);
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