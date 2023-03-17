import React, { Component    }     from 'react';
import { withRouter , Redirect } from 'react-router-dom';
import { getMovies }  from '../../services/movieService'
import Axios from 'axios';

class NewMovie extends Component {
    
    state = { 
        account : {title : '' , genre : '' , numberInStock : '' , rate : ''} ,
        errors : {} ,
        goToAnotherPage : false,
        genreSelected : '' ,
        isUpdating : false ,
        shouldRedirect : false   ,
        movies : []
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

    handleSubmbit = async e => {
        e.preventDefault();
        
        const errors = this.handleErrors();
        this.setState({errors : errors})

        if(Object.keys(errors).length !== 0) return;        

        // this is where should call the server 

        if(this.state.isUpdating === true){

        const movies = this.state.movies

        const movie  =  movies.find(sth => sth._id === this.props.match.params.id )

        movie.genre.name = this.state.account.genre
        movie.dailyRentalRate = this.state.account.rate
        movie.title = this.state.account.title
        movie.numberInStock = this.state.account.numberInStock
        // movie.genreId = "64136edec4984f3208bb5201"

        const body = {...movie}
        delete body._id

        try{
            const result = await Axios.put("http://localhost:3900/api/movies/" + movie._id , body)
        } catch(ex){
            console.log(ex)
        }

        // console.log(result)

        }else{
            this.props.location.data.fromDashboard(this.state.account)
        }

        this.props.history.push('/movies')
   
    }

    async componentDidMount() {

        const sth = await getMovies();
        const movies = sth.data

        this.setState({movies : movies})


        if(this.props.match.path !== "/movies/new"){

            

            const movie = movies.find(m => m._id === this.props.match.params.id )

            if(movie === undefined){
                this.setState({shouldRedirect: true})
            }

            else{
                const newAccount = [...this.state.account]

                newAccount.title = movie.title
                newAccount.genre = movie.genre.name
                newAccount.numberInStock = movie.numberInStock.toString()
                newAccount.rate = movie.dailyRentalRate.toString()
    
                this.setState({account : newAccount , genreSelected : newAccount.genre , isUpdating:true})
            }

        }
    }


    render() {

        if(this.state.shouldRedirect === true){
            return <Redirect
            to="/not-found"
            />;
        }

        return (
            
            <div >
                
            <h1>
                Movie Form
            </h1>

            <form onSubmit={this.handleSubmbit.bind(this)}>


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
            <option selected={this.state.genreSelected === ""} value="" ></option>
            <option selected={this.state.genreSelected === "Action"} value="Action"  >Action</option>
            <option selected={this.state.genreSelected === "Comedy"} value="Comedy">Comedy</option>
            <option selected={this.state.genreSelected === "Thriller"} value="Thriller">Thriller</option>
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
                 type="number"
                 step="any"
                 min="0.0"
                 max="10"

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
 
export default withRouter (NewMovie);