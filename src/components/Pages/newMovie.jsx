import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class NewMovie extends Component {
    
    state = { 
        account : {title : '' , genre : '' , numberInStock : '' , rate : ''

    
    } ,
        errors : {} ,
        goToAnotherPage : false
     } 

     handleErrors = e => {
        const errors = {}
        const emptyObjc = {}
        let flag = false 

        if(this.state.account.title.trim() === ''){
            errors.title = 'fill the title'
            flag = true
        }

        if(this.state.account.genre.trim() === ''){
            errors.genre = 'fill the genre'
            flag = true
        }

        if(this.state.account.numberInStock.trim() === ''){
            errors.numberInStock = 'fill the numberInstock'
            flag = true
        }

        if(this.state.account.rate.trim() === ''){
            errors.rate = 'fill the rate'
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

        if(name === "title"){

            if(value.trim() === ""){
                return "title is not filled"
            }

        }

        if(name === "genre"){

            if(value.trim() === "blah"){
                return "genre is not filled"
            }
            
        }

        if(name === "numberInStock"){

            if(value.trim() === ""){
                return "numberInStock is not filled"
            }

        }

        if(name === "rate"){

            if(value.trim() === ""){
                return "rate is not filled"
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

    handleSubmbit = e => {
        e.preventDefault();
        
        const errors = this.handleErrors();
        this.setState({errors : errors})
        if(errors) return;

       this.setState({goToAnotherPage : true})
        



        // this is where should call the server 
        

    }


    render() {

        if(this.state.goToAnotherPage === true){
            return this.props.history.push("/movies")
        }

        return (
            <div >
            <h1>
                Movie Form
            </h1>

            <form onSubmit={this.handleSubmbit}>


            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input 
                name='title'
                value={this.state.account.title}
                onChange={this.handleChange}
                id="title"
                 type="text"
                  className="form-control"
                   />
                {this.state.errors.title && <div className='alert alert-danger'> {this.state.errors.title} </div>  }
            </div>


            <div className="form-group">
                <label 
                htmlFor="genre">Genre
                </label>
            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" name='genre' onChange={this.handleChange}>
            <option selected value="blah" ></option>
            <option value="action"  >Action</option>
            <option value="comedy">Comedy</option>
            <option value="thriller">Thriller</option>
            </select>
            {this.state.errors.genre && <div className='alert alert-danger'> {this.state.errors.genre} </div>  }
            </div>


            <div className="form-group">
                <label htmlFor="numberInStock">Number in Stock</label>
                <input 
                name='numberInStock'
                value={this.state.account.numberInStock}
                onChange={this.handleChange}
                id="numberInStock"
                 type="number"
                  className="form-control"
                  min="0"
                  max="100"
                   />
                {this.state.errors.numberInStock && <div className='alert alert-danger'> {this.state.errors.numberInStock} </div>  }
            </div>


            <div className="form-group">
                <label htmlFor="rate">Rate</label>
                <input 
                name='rate'
                value={this.state.account.rate}
                onChange={this.handleChange}
                id="rate"
                 type="text"

                  className="form-control"
                   />
                {this.state.errors.rate && <div className='alert alert-danger'> {this.state.errors.rate} </div>  }
            </div>




            <button  className="btn btn-primary" >Save</button>

            </form>

            </div>

        );

    }

}
 
export default NewMovie;