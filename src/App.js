import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import './App.css';
import React, {useEffect} from 'react';
import Home from './components/Home/Home';
import ScrollToTop from './components/partials/ScrollToTop/ScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { AUTOLOGIN, selectUserData } from './reduxSlices/authSlice';

import CircularProgress from '@material-ui/core/CircularProgress';

const App = () => {
  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AUTOLOGIN());
  }, []);

  return (
    <div className="app">
        <Router>
      <ScrollToTop>
          {
            userData.loading ? (
              <div className="col-12 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                <CircularProgress size={80} className="display-block"/>
              </div>
            ) : userData.token ? (
              <Routes>
                <Route path='/' element={<Home/>} exact/>
                

              </Routes> 
            ) : (
              <Routes>
                <Route path='/' element={<Home/>} exact/>

              </Routes>
            )
          }
      </ScrollToTop>
        </Router>
    </div>
  )
} 

export default App