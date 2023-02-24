import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Recipe from './Recipe';
import Footer from './Footer';
import './Styles/Index.scss';
import Sorted from './Sorted';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import SignIn from './SignIn';
import SignUp from './SignUp';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth();


class Main extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      data: [],
      cardTitle: 'No title',
      image:'',
      ingredients: [],
      directions: '',
      path: '',
    }
  }

  getTitleFromApp = (data) => {
    this.setState({cardTitle: data});
  }
  getImageFromApp=(data) => {
    this.setState({image: data});
  }
  getListFromApp = (data) => {
    this.setState({ingredients: data});
  }
  getDirectionsFromApp =(data) =>{
    this.setState({directions: data});
  }
  pathHandler = (data) => {
    this.setState({path: data});
  }
  getDataFromApp = (data) => {
    this.setState({data: data});
  }

  render(){

    const db = getFirestore(app);
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={
          <div className='flow'>
            <App db={db} data={this.getDataFromApp} title={this.getTitleFromApp} image={this.getImageFromApp} list={this.getListFromApp} directions={this.getDirectionsFromApp} path={this.pathHandler}/>
            <Footer/>
          </div>}/>

          <Route path='/recipe' element={
            <div>
              <Recipe title={this.state.cardTitle} image={this.state.image} ingredients={this.state.ingredients} directions={this.state.directions}/>
              <Footer/>
            </div>
          }/>

          <Route path='/sorted' element={
            <div className='flow'>
              <Sorted  data={this.state.data} title={this.getTitleFromApp} image={this.getImageFromApp} list={this.getListFromApp} directions={this.getDirectionsFromApp} path={this.state.path}/>
              <Footer/>
            </div>
          }/>

          <Route path='/signin' element={
            <div className='flow'>
              <SignIn/>
            </div>
          }/>

          <Route path='/signup' element={
            <div className='flow'>
              <SignUp/>
            </div>
          }/>

        </Routes>
      </BrowserRouter>
    )
  }

}
export default Main;