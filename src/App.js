import './Styles/App.scss';
import React from 'react';
import Logo from './images/logo.png'
import { Navbar, Nav, Container, Row, Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
// import {withRouter} from 'react-router';
import { Link,} from 'react-router-dom';
// import Recipe from './Recipe';

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


  render(){
    return(
      <>

      <div className='Head'>
        <img className='logo' src={Logo}  alt='Logo of the company'/>
        <h1>Cooking Compendium</h1>

        <Navbar className='main-nav'>
          <Container>
            <Nav>
              <Nav.Link to="/" className='nav-link'>Meal</Nav.Link>
              <Nav.Link to="/" className='nav-link'>Dessert</Nav.Link>
              <Nav.Link to="/" className='nav-link'>A-Z</Nav.Link>
              <Nav.Link to="/" className='nav-link'>Holiday</Nav.Link>
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
