import React, { Component } from 'react';
import  {ResgisterUser }  from  "../../services/registerService";

class SignUpForm extends Component {
    state = {
        account : {
            username : '' ,
             password : '' ,
             fullName : ''
            } ,
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

        
        if(this.state.account.fullName.trim() === ''){
            errors.fullName = 'fill the name'
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

            if(value.trim().includes("@") === false){
                return "username must be a valid"
            }

        }

        if(name === "password"){

            if(value.trim() === ""){
                return "password is not filled"
            }

            if(value.trim().length < 5){
                
                return "password lenght must be at least 5 charactor long"
            } else{
                

            }
            
        }

        if(name === "fullName"){

            if(value.trim() === ""){
                return "name is not filled"
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
        console.log(errors)
        if(Object.keys(errors).length !== 0) return;   

            const result  = await ResgisterUser(this.state.account)

            console.log(result.data)
    
            console.log("done")

        // this is where should call the server 



    }


    render() { 
        return (
            <div >
            <h1>
                Register
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



            <div className="form-group">
                <label 
                htmlFor="fullName">Name</label>
                <input
                
                name='fullName'
                value={this.state.account.fullName}
                onChange={this.handleChange}
                id="fullName" type="text" className="form-control"  />
            {this.state.errors.fullName && <div className='alert alert-danger'> {this.state.errors.fullName} </div>  }
            </div>

            <button  className="btn btn-primary">Sign Up</button>
            </form>

            </div>
        );
    }
}
 
export default SignUpForm;