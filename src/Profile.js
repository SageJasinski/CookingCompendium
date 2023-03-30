import { getAuth } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Styles/Profile.scss';


class Profile extends React.Component{
    state = {
        user: null,
    }

    componentDidMount(){
        getAuth().onAuthStateChanged((user) => {
            if(user){
                this.setState({user});
            }else{
                this.setState({user: null});
            }
        })
    }

    signout() {
        getAuth().signOut();
    }

    render(){
        const {user} = this.state;
        return(
            <>
                <Link className="user-home-btn" to="/">Home Page</Link>
                {user ? (
                    <div className="user-profile">
                        <p className="displayname">{user.displayName}</p>
                        <p className="user-email">email: {user.email}</p>
                        <button className="logOut" onClick={this.signout}>Log Out</button>
                    </div>
                ):(
                    <div className="no-log">
                        <p className="profile-no-log"> You seem to have No profile please sign up</p>
                        <Link className="sign-in-btn" to="/signin">Sign In</Link>
                    </div>
                )}
            </>
        )
    }
}
export default Profile;