import './Styles/App.scss';
import React from 'react';
import Logo from './images/logo.png'
import { Navbar, Nav, Container, Row, Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import { Link} from 'react-router-dom';
import { collection, getDocs, addDoc } from "firebase/firestore";
import Main from './Main';



class App extends React.Component{
  state = {
    data: [],
    loading: true,
  }

  componentDidMount() {
    document.title = "Cooking Compendium";

    this.firestoreDataFunction()
    this.setState({loading: false});
  }

  firestoreDataFunction = async() => {
    const db = this.props.db;
    const querySnapshot = await getDocs(collection(db, "Recipes "));

    if (querySnapshot.size === 0) {
      console.error('No documents found.');
    } else {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      this.setState({data: data})
    }
  }

  uploadDataToFirestore = async(db, collectionName, jsonData) => {
    const collectionRef = collection(db, collectionName);
  
    try {
      for (const item of jsonData) {
        const docRef = await addDoc(collectionRef, item);
        console.log(`Document written with ID: ${docRef.id}`);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }


  handelOnClick = (data) =>{
    this.props.title(data.title);
    this.props.image(data.image);
    this.props.list(data.ingredients);
    this.props.directions(data.directions);
  }
  pathHandler= (path) =>{
    this.props.path(path);
    this.props.data(this.state.data);
  }


  render(){
    const {loading} = this.state;

    if(loading) {
      return <div>Loading ...</div>
    }

    return(
      <>

      <div className='Head'>
        <img className='logo' src={Logo}  alt='Logo of the company'/>
        <h1>Cooking Compendium</h1>

        <Navbar className='main-nav'>
          <Container>
            <Nav>
              <Link to="/sorted" onClick={() => {this.pathHandler('meal')}} className='nav-link'>Meal</Link>
              <Link to="/sorted" onClick={() => {this.pathHandler('dessert')}} className='nav-link'>Dessert</Link>
              <Link to="/sorted"  onClick={() => {this.pathHandler('alphaSort')}} className='nav-link'>A-Z</Link>
              <Link to="/sorted" onClick={() => {this.pathHandler('holiday')}} className='nav-link'>Holiday</Link>
            </Nav>
          </Container>
        </Navbar>
      </div>


      <Container fluid className='scroll'>
        <Row className="overflow-auto">
          {this.state.data.map(item => (
            <Col key={item.id} className="column">

              <Link className='plain' to={{
                pathname: '/recipe',
              }}>

                <Card onClick={() => {this.handelOnClick(item)}}>
                  <Card.Img src={item.image} />
                  <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      </>
    )
  }
}


export default App;
