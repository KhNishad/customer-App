
import request from '../utils/request';


// async function  Registration (data:any) {
  
//     const res = await request('/contractor/signup',{method:"POST",data:data})
    
//     return res;
// }
async function  Login (data:any) {
    const res = await request('/auth/seller/login',{method:'POST',data:data})
    return res;
}




export default {Login}




 

