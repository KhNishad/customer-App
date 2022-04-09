
import request from '../utils/request';


async function  getUser () {
     
    const res = await request(`/user/user-info`)
    
    return res;
}




export default {getUser}




 

