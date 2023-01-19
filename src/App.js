import './Styles/App.scss';
import React from 'react';
import Logo from './images/logo.png'
import { Navbar, Nav, Container, Row, Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import { Link} from 'react-router-dom';

class App extends React.Component{
  state = {
    data: []
  }

  componentDidMount() {
    const data = require('./Database.json');
    this.setState({data})
    document.title = "Cooking Compendium";
  }


  handelOnClick = (data) =>{
    this.props.title(data.title);
    this.props.image(data.image);
    this.props.list(data.ingredients);
    this.props.directions(data.directions);
  }
  pathHandler= (path) =>{
    this.props.path(path);
  }

  render(){
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
