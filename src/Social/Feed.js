import { getAuth } from "firebase/auth";
import React from "react";
import { Card, Col, Form, Image } from "react-bootstrap";
import { ref, uploadBytes, getStorage, getDownloadURL} from 'firebase/storage';
import { addDoc, collection, getDocs, QuerySnapshot, serverTimestamp, Timestamp} from 'firebase/firestore';
import { Link } from "react-router-dom";
import '../Styles/Feed.scss';



class Feed extends React.Component {
    state = {
        user: null,
        showPost: false,
        selectedFile: null,
        storageRef: null,
        postText: "",
        yourFeed: [],
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

        const storageRefrence = ref(storage, this.state.selectedFile.name);
        const reader = new FileReader();

        reader.readAsArrayBuffer(this.state.selectedFile);

        const buffer = reader.result;
        const snapshot = await uploadBytes(storageRefrence, buffer);

        const imageURL = await getDownloadURL(snapshot.ref);

        const docRef = await addDoc(collection(db, "Posts"),  {
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
        console.log(this.state.yourFeed)

    }

    updatePost = async(event) => {
        event.preventDefault();
        this.setState({postText: event.target.value});
    }

    render(){
        const {user, showPost} = this.state
        return(
            <>

            <h1>CookingCompendium: the Feed</h1>
            <Link to='/'> {"<- Back to Recipes"} </Link>

            {user ? (
                <>
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
                                        <input type="file" id="picture" label="Upload" onChange={this.handelFileChange}/>
                                    </Form.Group>
                                    <button type="submit">Post</button>
                                </>
                            )}
                        </Form>
                    </div>

                    <div className="user-prof-section">
                        <p className="user-name">{user.displayName}</p>
                    </div>

                </div>

                <hr></hr>

                <div className="scroll_feed">

                    {this.state.yourFeed.map(item => (
                    <Card key={item.id}>
                        <Card.Img variant="top" src={item.ImageURL} alt="Post-image" />
                        <image src={item.ImageURL}/>
                        <Card.Subtitle>{item.authorName}</Card.Subtitle>
                        <Card.Body>{item.postText}</Card.Body>
                        <Card.Footer>comments ...</Card.Footer>
                    </Card>
                    ))}

                </div>
            </>
            ):(<><p>No user logged in</p></>)}
            </>
        )
    }
}

export default Feed;