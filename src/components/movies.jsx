import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService'
import Pagination from './pagination'
import ListGroups from './listGroups'

class Movies extends Component {
    state = { 
        Movies: getMovies(),
        whichIsActive : 1 ,
        moviesToShow : getMovies(),
        pageSize : 4,
     } 


     constructor(){
        super()
        this.handleDelete = this.handleDelete.bind(this);
        this.changePage = this.changePage.bind(this)
        this.changeGenre = this.changeGenre.bind(this)
        this.getAllMovies = this.getAllMovies.bind(this)
     }




    render() { 


        if (this.state.moviesToShow.length === 0){
            return <p> there are no movies in database </p>
        }else{

            return (
            <React.Fragment>

            <div class="row">
            <div class="col-2">
                <ListGroups
                onChangeGenre = {this.changeGenre}
                onPressAll = {this.getAllMovies}
                />
                </div>    
            <div class="col-10">

            <main className='container'>

             
            <p>showing {this.state.moviesToShow.length} movies in database</p>
            <table className="table">
            <thead>
            <tr>
                <th>title</th>
                <th>genre</th>
                <th>stock</th>
                <th>rate</th>
                <th></th>
                <th></th>
            </tr>

            </thead>
            <tbody>
            {this.state.moviesToShow.slice(this.getIndex(),this.getIndex() + 4).map(movie =>
                (
                <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><i class={movie.isLiked? this.getThis() : this.getThat()} aria-hidden="true" onClick={() => this.changeIcon(movie)} style={{cursor: 'pointer'}}></i></td>
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
        
            </React.Fragment>
            )

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
        this.setState({moviesToShow : newNew})
    }

    getAllMovies(){
        const sth = this.state.Movies
        this.setState({moviesToShow : sth })
    }

    changePage(something){
        this.setState({whichIsActive : something})
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