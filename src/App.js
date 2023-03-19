import './App.css';


import Navbar from './components/navBar';
import React, { Component } from 'react';
import { Redirect, Route, Switch   } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import Rentals from './components/Pages/rentals';
import Customers from './components/Pages/customers';
import Movies from './components/movies';
import NotFound from './components/Pages/notFound';
import LoginForm from './components/Pages/loginForm';
import SignUpForm from './components/Pages/signUpForm';
import NewMovie from './components/Pages/newMovie';
import logout from './components/Pages/logout';


class App extends Component {

  state = {
    currentUser : {}
  }

  componentDidMount() {
    try{

      const jwt = localStorage.getItem("token")
      const currentUser = jwtDecode(jwt)
      console.log(currentUser)
      this.setState({currentUser})

    }
    catch (ex){

    }
  }




  render() {
    return (

          <div>
          <Navbar user={this.state.currentUser} />
          <main className='container'>
          <Switch>
          <Route path="/login" component={LoginForm}/>  
          <Route path="/logout" component={logout}/>  
          <Route path="/signUp" component={SignUpForm}/>  
          <Route path="/rentals" component={Rentals}/>
          <Route path="/customers" component={Customers} />
          <Route path="/movies/new" render={(props) => {
                        if(Object.keys(this.state.currentUser).length === 0) return <Redirect to="/login"/>
                        return <NewMovie something="Sdg" {...props}/>} 
          }            
            />
          <Route path="/movies/:id" render={(props) => {
                        if(Object.keys(this.state.currentUser).length === 0) return <Redirect to="/login"/>
                        return <NewMovie  {...props}/>} 
          }            
            />
          <Route path="/movies" render={(props) =>  <Movies user ={this.state.currentUser} {...props}/>}  />
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
