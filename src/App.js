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
    }else{
      this.firestoreDataFunction()
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
    this.props.user(this.state.user);
  }
  pathHandler= (path) =>{
    this.props.path(path);
    this.props.data(this.state.data);
    this.props.user(this.state.user);
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
            <Link className='profile-btn' to='/Profile'>Profile</Link>
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
              {/* <Link to="/Feed" onClick={() => {this.pathHandler('feed')}} className='nav-link'>Main Feed</Link> */}
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
            <p>Cooking Compendium is your ultimate online destination for timeless family recipes. Our website brings together a vast collection of cherished recipes passed down through generations, allowing users to explore and recreate these culinary delights in their own kitchens. <br/> With Cooking Compendium, you can delve into a treasure trove of old family recipes that have stood the test of time. Discover beloved classics, secret family favorites, and hidden gems from around the world. Whether you're looking for comforting soups, hearty main courses, delectable desserts, or anything in between, we have a wide range of recipes to suit every taste and occasion. <br/>What sets Cooking Compendium apart is the interactive community it fosters. As a registered user, you can engage with fellow food enthusiasts by leaving comments and sharing your experiences with specific recipes. Discuss tips, variations, and personal anecdotes, creating a vibrant space for culinary discussions.<br/>Furthermore, Cooking Compendium offers a personalized experience through user profiles. By creating an account, you can save your favorite recipes, curating your own recipe collection tailored to your preferences. Easily access these recipes whenever you need them, and find inspiration for your next gastronomic adventure.<br/>Join our community of passionate home cooks and culinary enthusiasts at Cooking Compendium. Embrace the rich traditions of family recipes, share your love for food, and create lasting connections through the universal language of cooking.</p>
        </div>

      </>
    )
  }
}


export default App;
