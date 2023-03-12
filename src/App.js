import './App.css';


import Navbar from './components/navBar';
import React, { Component } from 'react';
import { Redirect, Route, Switch   } from 'react-router-dom';
import Rentals from './components/Pages/rentals';
import Customers from './components/Pages/customers';
import Movies from './components/movies';
import NotFound from './components/Pages/notFound';
import MovieForm from './components/Pages/MovieForm';
import LoginForm from './components/Pages/loginForm';
import SignUpForm from './components/Pages/signUpForm';


class App extends Component {
  render() {
    return (

          <div>
          <Navbar/>
          <main className='container'>
          <Switch>
          <Route path="/login" component={LoginForm}/>  
          <Route path="/signUp" component={SignUpForm}/>  
          <Route path="/rentals" component={Rentals}/>
          <Route path="/customers" component={Customers} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from='/' exact to='movies' />
          <Redirect to='/not-found' />
          </Switch>
          </main>
          </div>
    );
  }
}

export default App;
