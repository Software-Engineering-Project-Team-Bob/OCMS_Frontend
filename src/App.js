import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import './App.css';
import React, {useEffect} from 'react';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Classroom from './components/Classroom/Classroom';
import ScrollToTop from './components/partials/ScrollToTop/ScrollToTop';
import AssignmentAdmin from './components/AssignmentAdmin/AssignmentAdmin';
import StudentSubmission from './components/StudentSubmission/StudentSubmission';
import { useDispatch, useSelector } from 'react-redux';
import { AUTOLOGIN, selectUserData } from './reduxSlices/authSlice';
import Reminders from './components/partials/Header/MobileReminder'
import CircularProgress from '@material-ui/core/CircularProgress';
import Calendar from './components/Classroom/Calendar';

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
                <Route path='/classes' element={<Dashboard/>} exact/>
                <Route path='/classes/reminders' element={<Reminders/>}/>
                <Route path='/classes/:id' element={<Classroom/>} exact/>
                <Route path='/classes/:id/:tab' element={<Classroom/>} exact/>
                <Route path='/classes/:id/assignment/:assignId/admin' element={<AssignmentAdmin/>} exact/>
                <Route path='/classes/:id/assignment/:assignId' element={<StudentSubmission/>} exact/>
                <Route path='/classes/:id/calendar' element={<Calendar/>} exact/>

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