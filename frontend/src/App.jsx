import React from 'react';
import {BrowserRouter , Routes , Route} from "react-router-dom";
import LoginForm from './Components/Loginform.jsx';
import HomePage from './Components/Homepage';
import Logo from './Components/Logo.jsx';
import Protectroute from './Components/Protectroute.jsx';
import { Registerform } from './Components/Registerform.jsx';

const App = () => {
  return (
      <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <Protectroute>
                <HomePage />
              </Protectroute>
              }/>
            
            
            
            <Route path='/Login' element={
                <div className=''>
                  <div className=' absolute'>
                  <Logo />
                  <LoginForm />
                  </div>
                </div>
              }>

            </Route>
            <Route path='/Register' element={
              <div className=''>
                <div className=' absolute'>
                <Logo />
                <Registerform />
                </div>
              </div>
            }>
            </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App