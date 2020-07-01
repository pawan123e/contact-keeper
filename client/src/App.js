import React from 'react';

import './App.css';

import Navbar from './components/layout/Navbar'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './components/pages/Home';

import Register from './components/pages/Register';

import Login from './components/pages/Login'

import About from './components/pages/About'

import ContactState from './context/contact/ContactState'

import AlertState from './context/alert/AlertState'

import AuthState from  './context/auth/AuthState'

import Alert from './components/pages/Alert'

import setAuthToken from './utils/setAuthToken'

import PrivateRoute from './components/routing/PrivateRoute';


if(localStorage.token) {
 
  setAuthToken(localStorage.token);

}

const App = () => {
  
return (
    
<div className="App">
      
<Router>
       
 <AuthState>
        
<AlertState>
        
<ContactState>
        
<Navbar/>
        
<Alert/>
        
<Switch>
          
<PrivateRoute exact path='/' component={Home}/>
          
<Route path='/register' component={Register}/>
          
<Route path='/login' component={Login}/>
          
<Route path='/about' component={About}/>
        
</Switch>
        
</ContactState>
        
</AlertState>
        
</AuthState>
      
</Router>
    
    
</div>
  );

}


export default App;
