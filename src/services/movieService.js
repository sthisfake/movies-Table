import  axios  from 'axios';


export function getMovies() {
    const result = axios.get("http://localhost:3900/api/movies")
    return result;
  }