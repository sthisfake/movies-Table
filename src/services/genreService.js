import axios from "axios"



export  function  getGenres(){

        const result = axios.get("http://localhost:3900/api/genres")
        return result

}



