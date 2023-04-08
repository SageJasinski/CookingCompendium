import { getAuth, updateProfile} from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import 'bootstrap/dist/css/bootstrap.css';
import './Styles/Profile.scss';
import { Form } from "react-bootstrap";


class Profile extends React.Component{
    state = {
        user: null,
        profilePicture: null,
        setProfilePicture: null,
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

    pictureStateChange = async(event) =>{
        this.setState({profilePicture: event.target.files[0]});
    }

    handleProfilePictureChange = async(event) => {
        event.preventDefault();
        const storage = getStorage();
        const filename = `${this.state.user.displayName}_${this.state.profilePicture}`
        const filePath = 'Profile-Pictures/' + filename;
        const storageRef = ref(storage, filePath);

        await uploadBytes(storageRef, this.state.profilePicture).then((snapshot) => {
            return getDownloadURL(snapshot.ref);
        }).then((downloadURL) => {

            const user = getAuth().currentUser;

            return updateProfile(user,{
                photoURL: downloadURL,
            })
        }).then(()=>{
               const user = getAuth().currentUser;
               this.setState({user:{...this.state.user, profilePicture:user.photoURL}})
        }).catch((error) => {
            console.log(error);
        });

    };


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

                            <div>

                                <Form onSubmit={this.handleProfilePictureChange}>
                                    <Form.Group>
                                        <input type="file" accept="image/*" onChange={this.pictureStateChange}/>
                                        <button type='submit'>Update picture</button>
                                    </Form.Group>
                                </Form>
                             <img  className="profile-picture" src={this.state.user.photoURL} alt="Profile" />
                            </div>
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