import React from "react";
import { Link } from "react-router-dom";
import { Card, Navbar, Nav, Container } from "react-bootstrap";
import Logo from './images/logo.png';
import './Styles/Sorted.scss';

class Sorted extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            alphaSort: true,
        }
    }

    componentDidMount(){
        const data = require('./Database.json');
        data.sort((a,b) => {return a.title.localeCompare(b.title);});
        this.setState({data})
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
                    <Link to="/" className='nav-link'>Meal</Link>
                    <Link to="/" className='nav-link'>Dessert</Link>
                    <Link to="/sorted" className='nav-link' active='true' >A-Z</Link>
                    <Link to="/" className='nav-link'>Holiday</Link>
                    </Nav>
                </Container>
                </Navbar>
            </div>

            {this.state.alphaSort && <h2 className="sort-title">Alphabetical</h2>}

            <div className="display">
                {this.state.data.map(item => (

                <Link key={item.id} className='plain' to={{
                    pathname: '/recipe',
                }}>
                    <Card   onClick={() => {this.handelOnClick(item)}}>
                    <Card.Img src={item.image} />
                    <Card.Body>
                        <div className="plain">
                            <Card.Title>{item.title}</Card.Title>
                        </div>
                    </Card.Body>
                    </Card>
                </Link>
                ))}
          </div>
            </>
        )
    }

}

export default Sorted;