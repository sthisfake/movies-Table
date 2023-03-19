
import  axios  from 'axios';

export function ResgisterUser(user){

    return axios.post("http://localhost:3900/api/users" ,{
        email : user.username,
        password : user.password,
        name : user.fullName
    } )

}