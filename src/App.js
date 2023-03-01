import './Styles/App.scss';
import React from 'react';
import Logo from './images/logo.png'
import { Navbar, Nav, Container, Row, Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import { Link} from 'react-router-dom';
import { collection, getDocs} from "firebase/firestore";
import { getAuth} from 'firebase/auth';



class App extends React.Component{
  state = {
    data: [],
    loading: true,
    user: null,
  }

  componentDidMount() {
    document.title = "Cooking Compendium";


    const storeData = JSON.parse(localStorage.getItem('recipesData'));

    if(storeData){
      this.setState({data: storeData, loading:false});
      console.log('reading local');
    }else{
      this.firestoreDataFunction()
      console.log('reading Firebase')
    }

    getAuth().onAuthStateChanged((user) => {
      if(user){
        this.setState({ user });
      }else{
        this.setState({user: null});
      }
      });
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

      localStorage.setItem('recipesData', JSON.stringify(data));
      this.setState({data: data, loading:false});
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

  signout() {
    getAuth().signOut();
  }


  render(){
    const {user} = this.state;
    return(
      <>

      {user ? (
        <div className='userBox'>
          <div className='styleBox'>
            <p className='welcome-message'>Welcome, {user.displayName}!</p>
            <button className='logOut' onClick={this.signout}>Log out</button>
          </div>
        </div>
      ):(
        <div className='sign-in'>
          <Link className='log-btn' to="/signin">Sign In</Link>
        </div>
      )}


      <div className='Head'>
        <img className='logo' src={Logo}  alt='Logo of the company'/>
        <h1>Cooking Compendium</h1>

        <Navbar className='main-nav'>
          <div className="nav-container">
            <Nav>
              <Link to="/sorted" onClick={() => {this.pathHandler('meal')}} className='nav-link'>Meal</Link>
              <Link to="/sorted" onClick={() => {this.pathHandler('dessert')}} className='nav-link'>Dessert</Link>
              <Link to="/sorted"  onClick={() => {this.pathHandler('alphaSort')}} className='nav-link'>A-Z</Link>
              <Link to="/sorted" onClick={() => {this.pathHandler('holiday')}} className='nav-link'>Holiday</Link>
            </Nav>
          </div>
        </Navbar>
      </div>


      <Container fluid className='scroll'>
        <Row className="overflow-auto">
          {this.state.data.map(item => (
            <Col key={item.id} className="column">

              <Link className='plain' to={`/recipe/${item.id}`}>

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

        <div className='about-box'>
            <h2>What Is the Compendium?</h2>
            <p>Welcome to the cooking compendium, where we take old, and new, family recipes and digitizes them on this site. We also offer comments under each recipe so that you can know of others success making the things you love. Here at CookingCompendium we are all about connecting people together through food they love. Some features coming soon are:</p>
            <ul>
              <li> Reaction to recipes and comments to find the yummiest of each category</li>
              <li>A histories tab where you can see the original source for each recipe</li>
              <li>A sharables tab where you can send your foodie pictures to other food minded individuals</li>
            </ul>
        </div>

      </>
    )
  }
}


export default App;
