import { getAuth } from "firebase/auth";
import React from "react";
import { Card, Form} from "react-bootstrap";
import { ref, uploadBytes, getStorage, getDownloadURL} from 'firebase/storage';
import { addDoc, collection, getDocs,  serverTimestamp, doc, updateDoc, increment, getDoc} from 'firebase/firestore';
import { getDatabase, update } from "firebase/database";
import { Link } from "react-router-dom";
import Yum from '../images/greyed-out-yum.png';
import YumColor from '../images/full-color-yum.png';
import './Feed.scss';

const dbRealtime = getDatabase();


class Feed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            showPost: false,
            selectedFile: null,
            storageRef: null,
            postText: "",
            yourFeed: [],
            post: null,
        };
    }



    componentDidMount(){


        getAuth().onAuthStateChanged((user) => {
            if(user){
              this.setState({ user });
            }else{
              this.setState({user: null});
            }
        });

        this.feedDataFunction();
    }

    feedDataFunction = async() => {
        const db = this.props.db;

        const querySnapshot = await getDocs(collection(db, "Posts"))

        if ( querySnapshot.size !== 0 ){
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            this.setState({yourFeed: data});
        }
    }

    postExpanded = async() =>  {
        this.setState({showPost: true})
    };

    handelFileChange = async(event) => {
        this.setState({selectedFile: event.target.files[0]});
    }

    postSubmision= async(event) => {
        event.preventDefault();

        const storage = getStorage();
        const db = this.props.db;

        const now = new Date();
        const filename = `${this.state.user.displayName}_${now.getTime()}_${this.state.selectedFile.name}`
        const storageRefrence = ref(storage, filename);

        await uploadBytes(storageRefrence, this.state.selectedFile);

        const imageURL = await getDownloadURL(storageRefrence);

        await addDoc(collection(db, "Posts"),  {
            authorName: this.state.user.displayName,
            authorID: this.state.user.uid,
            created: serverTimestamp(),
            likesCount:0,
            jealousCount:0,
            postText: this.state.postText,
            reactions: {reaction:"", userID: ""},
            ImageURL: imageURL
        })


        this.setState({selectedFile: null, showPost:false, postText: ""})
    }

    updatePost = async(event) => {
        event.preventDefault();
        this.setState({postText: event.target.value});
    }

    handleYumClick = async(postId) =>{
        try{
            const db = this.props.db;
            const postref = doc(db,"Posts", postId);
            const docSnapShot = await getDoc(postref);


            if(docSnapShot.exists()){
                const post = docSnapShot.data();

                if(post.reactions && post.reactions[this.state.user.uid] === "yum"){
                    await updateDoc(postref, {
                        likesCount: increment(-1),
                        reactions:{
                            [this.state.user.uid]: "",
                        }
                    });

                    update(ref(dbRealtime, `Posts/${postId}/reactionCount`), {
                        yum: increment(-1)
                    });

                }else{
                    await updateDoc(postref, {
                        likesCount: increment(1),
                        reactions: {
                            [this.state.user.uid]:"yum",
                        }
                    });

                    update(ref(dbRealtime, `Posts/${postId}/reactionCount`), {
                        yum: increment(1)
                    });
                }
            }
        } catch(error){
            console.log(error);
        }


    }

    render(){
        const {user, showPost} = this.state
        return(
            <>

            <h1 className="feed_heading">CookingCompendium: the Feed <sub>*alpha</sub></h1>

            <Link className="feed_back_btn" to='/'> {"<- Back to Recipes"} </Link>

            {user ? (
                <>
                <div className="user-prof-section">

                    {this.state.user.photoURL ? (<img className="user_profile_picture" src={this.state.user.photoURL} alt="your-profile"/>):(<div className="user_profile_picture"></div>)}
                    <p className="user-name">{user.displayName}</p>
                </div>

                <div className="head-bar">

                    <div className="post">
                        <Form onSubmit={this.postSubmision}>
                            <Form.Group>
                                <Form.Label>Post</Form.Label>
                                <Form.Control type="text" placeholder="Share a Treat..." onClick={this.postExpanded} onChange={this.updatePost}></Form.Control>
                            </Form.Group>

                            {showPost && (
                                <>
                                    <Form.Group>
                                        <input  required={true} type="file" id="picture" label="Upload" onChange={this.handelFileChange}/>
                                    </Form.Group>
                                    <button type="submit">Post</button>
                                </>
                            )}
                        </Form>
                    </div>


                </div>

                <hr></hr>

                <div className="scroll_feed">

                    {this.state.yourFeed.map(item => (
                        <Card key={item.id}>
                            <Card.Img className="feed_pic" variant="top" src={item.ImageURL} alt="Post-image" />
                            <div className="reaction_center">
                                {item.reactions[this.state.user.uid] === "yum" ? (<img src={YumColor} className="yum_reaction_btn" alt="already-reacted-yum" onClick={() => this.handleYumClick(item.id)}/>):(<img src={Yum} className="yum_reaction_btn" alt="yum reaction button" onClick={() => this.handleYumClick(item.id)}/>)}
                                <p className="yum_count">{item.likesCount}</p>
                            </div>
                            <div className="post_sub_info">
                            <Card.Subtitle className="post_username">{item.authorName}</Card.Subtitle>
                            <Card.Subtitle className="post_date">{item.created.toDate().toLocaleDateString()}</Card.Subtitle>
                            </div>
                            <Card.Body>{item.postText}</Card.Body>
                            <Card.Footer>comments ...</Card.Footer>
                        </Card>
                    ))}

                </div>
            </>
            ):(
            <>
            <div className="feed_log_prompt">
                <p>No user logged in. Please sign in or sign up to view your feed</p>
                <Link className='log-btn' to="/signin">Sign In</Link>
            </div>

            </>)}
            </>
        )
    }
}

export default Feed;