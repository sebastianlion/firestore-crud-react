import React from 'react';
import './App.css';

import Links from './components/Links'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {


  return (
    //<> y </> son fragment es de react para no cargar objetos innecesarios (div)
    <div className="container "> 
      <div className="row">
        <Links />
      </div> 
      {/* va a aparecer y desaparecer cuando nosotros ejecutemos una funcion */}
      <ToastContainer />
    </div>
  );
}

export default App;
