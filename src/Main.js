import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Recipe from './Recipe';
import Footer from './Footer';
import './Styles/Index.scss';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      cardTitle: 'No title',
      image:'',
    }
  }

  getTitleFromApp = (data) => {
    this.setState({cardTitle: data});
  }
  getImageFromApp=(data) => {
    this.setState({image: data});
  }

  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={
          <div className='flow'>
            <App title={this.getTitleFromApp} image={this.getImageFromApp}/>
            <Footer/>
          </div>}/>

          <Route path='/recipe' element={
            <div>
              <Recipe title={this.state.cardTitle} image={this.state.image}/>
              <Footer/>
            </div>
          }/>
        </Routes>
      </BrowserRouter>
    )
  }

}
export default Main;