import './Styles/App.scss';
import React from 'react';
import Logo from './images/logo.png'
import { Navbar, Nav, Container} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component{
  state = {
    data: []
  }

  componentDidMount() {
    const data = require('./Database.json');
    this.setState({data})
  }


  render(){
    console.log(this.state.data);
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

        <div className='scroll-box'>
          {this.state.data.map(item => (
              <Card key={item.id}>
                <Card.Img src={item.image} />
                <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                </Card.Body>
              </Card>
          ))}
        </div>
      </>
    )
  }
}

export default App;
