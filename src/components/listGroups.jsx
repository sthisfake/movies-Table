import React, { Component } from 'react';
import { getGenres} from '../services/genreService'

 

class ListGroups extends Component {
    state = { 

        genres :[],
        genreActive : "All"
     }

     async componentDidMount(){

        const sth = await getGenres();
        this.setState({genres : sth.data})

     }



    render() { 
        return (
            
            <div class="list-group" id="list-tab" role="tablist">
                <button key={"All"} type="button" class={this.state.genreActive === "All" || this.props.changeToAll === true  ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} style={{cursor : 'pointer'}} onClick={() => this.allMovies()}>All Genres</button>
                {this.state.genres.map(genre => <button key={genre._id} type="button" class={this.state.genreActive === genre.name &&  this.props.changeToAll !== true ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} style={{cursor : 'pointer'}} onClick={() => this.changeGenres(genre.name)} >{genre.name}</button>
                )}
                </div>
       
        );
    }
    changeGenres(something){
        this.setState({genreActive : something})
        this.props.onChangeGenre(something)

    }

    allMovies(){
        this.setState({genreActive : "All"})
        this.props.onPressAll()

    }

    
}
 
export default ListGroups;