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
            dessertData: [],
            mealData: [],
            holidayData: [],
            alphaSort: true,
            dessert: false,
            holiday: false,
            meal:false
        }
    }

    componentDidMount(){
        const data = require('./Database.json');
        data.sort((a,b) => {return a.title.localeCompare(b.title);});
        this.setState({data: data});
    }


    dessertHandler = () => {
        this.setState({dessert:true, alphaSort:false, holiday:false, meal: false});
        const filtered = this.state.data.filter(item => item.tag && item.tag.includes('dessert'));
        this.setState({dessertData: filtered});
    }
    mealHandler = () => {
        this.setState({meal:true, dessert:false, alphaSort:false, holiday:false});
         const filtered = this.state.data.filter(item => item.tag && item.tag.includes('meal'));
        this.setState({mealData: filtered});
    }
    alphaHandler = () => {
        this.setState({meal:false, dessert:false, alphaSort:true, holiday:false});
    }
    holidayHandler = () => {
        this.setState({meal:false, dessert:false, alphaSort:false, holiday:true});
        const filtered = this.state.data.filter(item => item.tag && item.tag.includes('holiday'));
        this.setState({holidayData: filtered});
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
                    <p onClick={() => {this.mealHandler()}} className='nav-link'>Meal</p>
                    <p onClick={()=> {this.dessertHandler()}} className='nav-link'>Dessert</p>
                    <p onClick={() => {this.alphaHandler()}} className='nav-link'>A-Z</p>
                    <p onClick={() => {this.holidayHandler()}} className='nav-link'>Holiday</p>
                    </Nav>
                </Container>
                </Navbar>
            </div>

            {this.state.alphaSort && <h2 className="sort-title">Alphabetical</h2>}
            {this.state.meal && <h2 className="sort-title">Meal</h2>}
            {this.state.holiday && <h2 className="sort-title">Holiday</h2>}
            {this.state.dessert && <h2 className="sort-title">Dessert</h2>}

            <div className="display">

                {this.state.holiday && this.state.holidayData.map(item => (

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

                {this.state.meal && this.state.mealData.map(item => (

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

                {this.state.dessert && this.state.dessertData.map(item => (

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

                {this.state.alphaSort && this.state.data.map(item => (

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