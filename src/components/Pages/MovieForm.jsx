import React, { Component } from 'react';

class MovieForm extends Component {
    state = {  } 
    render() { 
        return (

            <div>

            <h1>
                 movie form {this.props.match.params.id}
            </h1>

            <button className="btn btn-primary" onClick={() => this.goBack()}>save</button>

            </div>
        );
    
    }

        
    goBack(){
        this.props.history.push("/movies")
    }    
}
 
export default MovieForm;