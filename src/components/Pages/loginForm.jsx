import React, { Component } from 'react';
import { loginUser } from './../../services/authService';


class LoginForm extends Component {
    state = { 
        account : {username : '' , password : ''} ,
        errors : {}
     } 

    handleErrors = e => {
        const errors = {}
        const emptyObjc = {}
        let flag = false 

        if(this.state.account.username.trim() === ''){
            errors.username = 'fill the username'
            flag = true
        }

        if(this.state.account.password.trim() === ''){
            errors.password = 'fill the password'
            flag = true
        }

        if( flag === true){
            return errors
        }else{
            return emptyObjc
        }



        // using joi :

    } 



    validInputCheck = ({name , value}) => {
        if(name === "username"){

            if(value.trim() === ""){
                return "username is not filled"
            }

        }

        if(name === "password"){

            if(value.trim() === ""){
                return "password is not filled"
            }
            
        }


        // using joi


    }


    handleChange = e => {

        const errors = {...this.state.errors}
        const errorMassage = this.validInputCheck(e.currentTarget);

        if(errorMassage){
            errors[e.currentTarget.name] = errorMassage
        }else{
            delete errors[e.currentTarget.name]
        }

        const account = {...this.state.account}
        account[e.currentTarget.name] = e.currentTarget.value
        this.setState({account , errors})
    }

    handleSubmbit = async e => {
        e.preventDefault();
        
        const errors = this.handleErrors();
        this.setState({errors : errors})
        if(Object.keys(errors).length !== 0) return;   

        // this is where should call the server 

        try{
            const result = await loginUser(this.state.account.username , this.state.account.password)
            const jwt = result.data
            console.log(jwt)
            localStorage.setItem("token" , jwt)
            window.location = "/"
        }
            catch(ex){
                if(ex.response && ex.response.status === 400){
                    const errors = {...this.state.errors}
                    errors.username = ex.response.data
                    this.setState({errors : errors})
                }
            }

    }

    render() { 


        return (
            <div >
            <h1>
                Login
            </h1>

            <form onSubmit={this.handleSubmbit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                name='username'
                value={this.state.account.username}
                onChange={this.handleChange}
                id="username"
                 type="text"
                  className="form-control"
                   />
                {this.state.errors.username && <div className='alert alert-danger'> {this.state.errors.username} </div>  }
            </div>
            <div className="form-group">
                <label 
                htmlFor="password">Password</label>
                <input
                
                name='password'
                value={this.state.account.password}
                onChange={this.handleChange}
                id="password" type="password" className="form-control"  />
            {this.state.errors.password && <div className='alert alert-danger'> {this.state.errors.password} </div>  }
            </div>
            <button  className="btn btn-primary">Login</button>
            </form>

            </div>
        );
    }

    
}
 
export default LoginForm;