import React, { Component } from 'react';
import {getMovies , movies} from '../services/fakeMovieService'
import Pagination from './pagination'
import ListGroups from './listGroups'
import '../index.css' 
import { Link } from 'react-router-dom'; 

class Movies extends Component {
    state = { 
        Movies: getMovies(),
        whichIsActive : 1 ,
        moviesToShow : getMovies(),
        pageSize : 4,
        sortedBy : '',
        searchValue :'' ,
        changeToAll : false
     } 


     constructor(){
        super()
        this.handleDelete = this.handleDelete.bind(this);
        this.changePage = this.changePage.bind(this)
        this.changeGenre = this.changeGenre.bind(this)
        this.getAllMovies = this.getAllMovies.bind(this)
        this.sort = this.sort.bind(this)
        this.updateMovies = this.updateMovies.bind(this)
     }




    render() { 


        


        // if (this.state.moviesToShow.length === 0){

        //     // return <p> there are no movies in database </p>
        // }
        if(true === false){

        }
        else{

            return (
            <React.Fragment>

                <div className='space'>

                <div className="row">
            <div className="col-2">
                <ListGroups
                onChangeGenre = {this.changeGenre}
                onPressAll = {this.getAllMovies}
                changeToAll = {this.state.changeToAll}
                />
                </div>    
            <div className="col-10">

            <main className='container'>
            <Link
            
            to={{
                pathname : "/movies/new" ,
                data: { fromDashboard: this.updateMovies }
            }}
            
            >
            <button className="btn btn-primary" 
            style={{marginBottom:20}}
            
            >New Movie</button> 
            </Link>

            <p>showing {this.state.moviesToShow.length} movies in database</p>


            <div className="form-group">
                <input 
                name='title'
                placeholder="Search..."
                value={this.state.searchValue}
                onChange={this.search}
                id="title"
                 type="text"
                  className="form-control"
                />
            </div>

            <table className="table">
            <thead>
            <tr className='something'>
                <th onClick={() => this.sort("title")}>title {this.state.sortedBy.includes("title") ?  <i className="fa fa-sort" aria-hidden="true"></i> :  <i></i> } </th>
                <th onClick={() => this.sort("genre")}>genre {this.state.sortedBy.includes("genre") ?  <i className="fa fa-sort" aria-hidden="true"></i> :  <i></i> }</th>
                <th onClick={() => this.sort("stock")}>stock {this.state.sortedBy.includes("stock") ?  <i className="fa fa-sort" aria-hidden="true"></i> :  <i></i> }</th>
                <th onClick={() => this.sort("rate")}>rate {this.state.sortedBy.includes("rate") ?  <i className="fa fa-sort" aria-hidden="true"></i> :  <i></i> }</th>
                <th></th>
                <th></th>
            </tr>

            </thead>
            <tbody>
            {this.state.moviesToShow.slice(this.getIndex(),this.getIndex() + 4).map(movie =>
                (
                <tr key={movie._id}>
                    <td><Link to={"/movies/" + movie._id}>{movie.title}
                    </Link>
                    
                    </td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><i className={movie.isLiked? this.getThis() : this.getThat()} aria-hidden="true" onClick={() => this.changeIcon(movie)} style={{cursor: 'pointer'}}></i></td>
                    <td> <button onClick={() => this.handleDelete(movie)} className='btn btn-danger btn-sm'>Delete</button> </td>
                </tr>
                ))}
                

            </tbody>
            </table>
            <Pagination
                        numberOfMovies={this.state.moviesToShow.length}
                        currentPage={this.state.whichIsActive}
                        pageSize={this.state.pageSize }
                        onChangePage={this.changePage}
                        />
            </main>


                        </div>
                        </div>

                </div>
        
            </React.Fragment>
         
            )

        }

        
    }

    search= e => {

        this.changeGenre("All")
        this.setState({changeToAll : true})

        const serachThing = e.currentTarget.value

        const allMovies = [...this.state.moviesToShow]
        const matchedMovies = []

        for(let i=0 ; i<allMovies.length ; i++){

         const result =  allMovies[i].title.toLowerCase().includes(serachThing)
         const result2 =  allMovies[i].title.toUpperCase().includes(serachThing)
         if(result || result2){
            matchedMovies.push(allMovies[i])
         }

        }

        this.setState({
            moviesToShow : matchedMovies,
            searchValue : serachThing})
    }

    updateMovies(something){


       const  genresId = [
            { name : "Thriller" , 
            id: "5b21ca3eeb7f6fbccd471820"
        } ,
           { name : "Action" ,
            id: "5b21ca3eeb7f6fbccd471818"
        } ,
           { name : "Comedy" ,
            id: "5b21ca3eeb7f6fbccd471814"
        } ,
       ];

       const genre ={
            name : "" ,
            id : ""
        }

        for(let i=0 ; i< 3;  i++) {

            if(genresId[i].name === something.genre){
                genre.name = something.genre 
                genre.id = genresId[i].id
            }
            
        }

        const newMovie = {
            _id: "5b21ca3eeb7f6fbccd4718" +  (getMovies().length + 15).toString() ,
            title : something.title  ,
            genre: { _id: genre.id, name: genre.name },
            numberInStock: something.numberInStock,
            dailyRentalRate: something.rate,
            isLiked : false
        }

        movies.push(newMovie)

    }

    sort(something){

        if(something === "title"){

            if(this.state.sortedBy === "title ase"){
                const  sth = this.state.moviesToShow.sort(
                    (a , b ) => b.title.localeCompare(a.title)
                   )
                   const sortOrder = something + " des"
                   this.setState({sortedBy : sortOrder , 
                    moviesToShow  : sth
                })
            }
            else{

                const  sth = this.state.moviesToShow.sort(
                    (a , b ) => a.title.localeCompare(b.title)
                   )
                   const sortOrder = something + " ase"
                   this.setState({sortedBy : sortOrder , 
                    moviesToShow  : sth
                })

            }
        }

        if(something === "genre"){

            if(this.state.sortedBy === "genre ase"){
                const  sth = this.state.moviesToShow.sort(
                    (a , b ) => b.genre.name.localeCompare(a.genre.name)
                   )
                   const sortOrder = something + " des"
                   this.setState({sortedBy : sortOrder , 
                    moviesToShow  : sth
                })
            }
            else{

                const  sth = this.state.moviesToShow.sort(
                    (a , b ) => a.genre.name.localeCompare(b.genre.name)
                   )
                   const sortOrder = something + " ase"
                   this.setState({sortedBy : sortOrder , 
                    moviesToShow  : sth
                })

            }
        }

        if(something === "stock"){

            if(this.state.sortedBy === "stock ase"){
                const  sth = this.state.moviesToShow.sort((a, b) => b.numberInStock - a.numberInStock);
                   const sortOrder = something + " des"
                   this.setState({sortedBy : sortOrder , 
                    moviesToShow  : sth
                })
            }
            else{

                const  sth = this.state.moviesToShow.sort((a, b) => a.numberInStock - b.numberInStock);
                   const sortOrder = something + " ase"
                   this.setState({sortedBy : sortOrder , 
                    moviesToShow  : sth
                })

            }
        }

        if(something === "rate"){

            if(this.state.sortedBy === "rate ase"){
                const  sth = this.state.moviesToShow.sort((a, b) => b.dailyRentalRate - a.dailyRentalRate);
                   const sortOrder = something + " des"
                   this.setState({sortedBy : sortOrder , 
                    moviesToShow  : sth
                })
            }
            else{

                const  sth = this.state.moviesToShow.sort((a, b) => a.dailyRentalRate - b.dailyRentalRate);
                   const sortOrder = something + " ase"
                   this.setState({sortedBy : sortOrder , 
                    moviesToShow  : sth
                })

            }
        }

    }

    changeGenre(something){
        const newMovies = this.state.Movies
        const newNew = []
        for(let i=0 ; i<newMovies.length ; i++){

            if(newMovies[i].genre.name === something){
                newNew.push(newMovies[i])
            }

        }
        this.setState({moviesToShow : newNew , whichIsActive :1 ,  searchValue : "" , changeToAll : false})
    }

    getAllMovies(){
        const sth = this.state.Movies
        this.setState({moviesToShow : sth })
    }

    changePage(something){
        this.setState({whichIsActive : something  })
     }

    handleDelete(movie){
        let sth = []
        for(let i = 0 ; i < this.state.Movies.length ; i++){
            if (this.state.Movies[i]._id === movie._id){
                
            }else{
                sth.push(this.state.Movies[i])
            }
        }

        let sth2 = []
        for(let i = 0 ; i < this.state.moviesToShow.length ; i++){
            if (this.state.moviesToShow[i]._id === movie._id){
                
            }else{
                sth2.push(this.state.moviesToShow[i])
            }
        }

        this.setState({Movies : sth,
            moviesToShow : sth2
        })
    }

    getIndex(){
            return (this.state.whichIsActive - 1) *4
    }


    getThis(){
        return "fa fa-heart"
    }

    getThat(){
        return "fa fa-heart-o"
    }

    changeIcon(movie){

        let sth = []
        for(let i = 0 ; i < this.state.Movies.length ; i++){
            if (this.state.Movies[i]._id === movie._id){

                this.state.Movies[i].isLiked = !this.state.Movies[i].isLiked
                sth.push(this.state.Movies[i])
                
            }else{
                sth.push(this.state.Movies[i])
            }
        }
        this.setState({Movies : sth })
       
    }

}
 
export default Movies;