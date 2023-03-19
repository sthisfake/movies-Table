import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  state = {
    whichIsActive : "movies"
  }
    render() { 
        return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link class="navbar-brand" to="/movies" onClick={() => this.changeActive("movies")}>Website</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class={this.state.whichIsActive === "movies" ? "nav-item active" : "nav-item"} onClick={() => this.changeActive("movies")}>
                  <Link class="nav-link" to="/">Movies <span class="sr-only">(current)</span></Link>
                </li>
                <li class={this.state.whichIsActive === "customers" ? "nav-item active" : "nav-item"} onClick={() => this.changeActive("customers")}>
                  <Link class="nav-link" to="/customers">Customers</Link>
                </li>
                <li class={this.state.whichIsActive === "rental" ? "nav-item active" : "nav-item"} onClick={() => this.changeActive("renteal")}>
                  <Link class="nav-link" to="/rentals">Rentals</Link>
                </li>

                {
                  ((Object.keys(this.props.user).length === 0)) && 
                  (
                    <React.Fragment>
                  <li class={this.state.whichIsActive === "login" ? "nav-item active" : "nav-item"} onClick={() => this.changeActive("login")}>
                  <Link class="nav-link" to="/login">Login</Link>
                </li>
                <li class={this.state.whichIsActive === "signUp" ? "nav-item active" : "nav-item"} onClick={() => this.changeActive("signUp")}>
                  <Link class="nav-link" to="/signUp">SignUp</Link>
                </li>
                    </React.Fragment>
                  )
                }

                {
                  ((Object.keys(this.props.user).length !== 0)) && 
                  (
                    <React.Fragment>
                  <li class={this.state.whichIsActive === "login" ? "nav-item active" : "nav-item"} onClick={() => this.changeActive("login")}>
                  <Link class="nav-link" to="/profile">{this.props.user.name}</Link>
                </li>
                <li class={this.state.whichIsActive === "signUp" ? "nav-item active" : "nav-item"} onClick={() => this.changeActive("signUp")}>
                  <Link class="nav-link" to="/logout">logout</Link>
                </li>
                    </React.Fragment>
                  )
                }


                
              </ul>
            </div>
          </nav>
        );
    }

    changeActive(something){
      this.setState({whichIsActive: something})
    }





}
 
export default Navbar;