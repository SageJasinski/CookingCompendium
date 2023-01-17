import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Recipe from './Recipe';
import Footer from './Footer';
import './Styles/Index.scss';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={
      <div className='flow'>
        <App />
        <Footer/>
     </div>}/>

      <Route path='/recipe' element={<Recipe/>}/>
    </Routes>
  </BrowserRouter>
)