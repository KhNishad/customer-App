
import request from '../utils/request';


// async function  Registration (data:any) {
  
//     const res = await request('/contractor/signup',{method:"POST",data:data})
    
//     return res;
// }
async function  loginOtpSend (number:any) {
    const res = await request(`/auth/b2c/otp/send?phone=${number}`)
    return res;
}




export default {loginOtpSend}




 

