import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Footer from './Footer';
import './Styles/Index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='flow'>
      <App />
      <Footer/>
     </div>
  </React.StrictMode>
);