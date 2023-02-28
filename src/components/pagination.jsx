import React, { Component } from 'react';


class Pagination extends Component {
    state = {  } 


    render() { 

      const numberOfPages = (this.props.numberOfMovies / this.props.pageSize) 
      let pages = [];
      for(let  i = 0 ; i< numberOfPages ; i++){
        pages[i] = i + 1 
      }

        return (

            <nav aria-label="Page navigation example">
            <ul class="pagination">
              {pages.map(page => (
                <li key={page} className={page===this.props.currentPage ? "page-item active" : "page-item"  }>
                  <a className='page-link' onClick={() => this.props.onChangePage(page)}>{page}</a>
                </li> 
              ) )}
              {/* <li class= "page-item active"  ><a class="page-link" href="#">1</a></li>
              <li class="page-item active"  ><a class="page-link" href="#">2</a></li>
              <li class="page-item active"  ><a class="page-link" href="#">3</a></li> */}
            </ul>
          </nav>
        );
    }
}
 
export default Pagination;