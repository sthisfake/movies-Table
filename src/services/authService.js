
import  axios  from 'axios';

export function loginUser(email , password){

    return axios.post("http://localhost:3900/api/auth" ,{
        email , password
    } )

}