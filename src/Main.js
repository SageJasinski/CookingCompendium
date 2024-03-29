import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Recipe from './Recipe';
import Footer from './Footer';
import './Styles/Index.scss';
import Sorted from './Sorted';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';
import Feed from './Social/Feed';
import Policy from './Policy';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_DATABASEURL,
};

const app = initializeApp(firebaseConfig);



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
      user: {},
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
  getUserFromApp = (data) => {
    this.setState({user: data})
  }

  render(){

    const db = getFirestore(app);
    const database = getDatabase(app);
    return (
      <>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5445071165173481" crossOrigin="anonymous"></script>

        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={
            <div className='flow'>
              <App db={db} data={this.getDataFromApp} title={this.getTitleFromApp} image={this.getImageFromApp} list={this.getListFromApp} directions={this.getDirectionsFromApp} path={this.pathHandler} user={this.getUserFromApp}/>
              <Footer/>
            </div>}/>

            <Route path='/recipe/:id' element={
              <div>
                <Recipe database={database} user={this.state.user}/>
                <Footer/>
              </div>
            }/>

            <Route path='/sorted' element={
              <div className='flow'>
                <Sorted  data={this.state.data} title={this.getTitleFromApp} image={this.getImageFromApp} list={this.getListFromApp} directions={this.getDirectionsFromApp} path={this.state.path} user={this.getUserFromApp}/>
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

            <Route path='/Profile' element={
              <div className='flow'>
                <Profile />
              </div>
            }/>

            <Route path='/Feed' element={
              <div className='flow'>
                <Feed user={this.state.user} db={db}/>
              </div>
            }></Route>

            <Route path='/policy' element={
              <div className='flow'>
                  <Policy/>
                  <Footer/>
              </div>
            }/>

          </Routes>
        </BrowserRouter>
      </>
    )
  }

}
export default Main;