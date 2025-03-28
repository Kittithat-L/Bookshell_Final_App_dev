import React from 'react';
import {BrowserRouter , Routes , Route} from "react-router-dom";
import LoginForm from './Components/Loginform.jsx';
import HomePage from './Components/Homepage';
import Logo from './Components/Logo.jsx';
import Protectroute from './Components/Protectroute.jsx';
import { Registerform } from './Components/Registerform.jsx';
import Myfavorites from './Components/Myfavorites.jsx';
import Search from './Components/Search.jsx';
import MyAccount from './Components/MyAccount.jsx';
import Forget from './Components/Forget.jsx'
import Feedback from './Components/Feedback.jsx'

const App = () => {
  return (
      <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <Protectroute>
                <HomePage />
              </Protectroute>
              }/>
            
            <Route path='/myfavorites' element={
              <Protectroute>
                <Myfavorites />
              </Protectroute>
              }/>
            <Route path='/feedback' element={
              <Protectroute>
                <Feedback />
              </Protectroute>
              }/>
            
            <Route path='/search' element={
              <Protectroute>
                <Search />
              </Protectroute>
              }/>

            <Route path='/myaccount' element={
              <Protectroute>
                <MyAccount />
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
            <Route path='/Forget' element={
              <div className=''>
                <div className=' absolute'>
                <Logo />
                <Forget />
                </div>
              </div>
            }>
            </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App