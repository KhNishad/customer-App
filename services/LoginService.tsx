
import request from '../utils/request';


async function  Registration (data:any) {
  
    const res = await request('/auth/b2c/register',{method:"POST",data:data})
    
    return res;
}
async function  loginOtpSend (number:any) {
    const res = await request(`/auth/b2c/otp/send?phone=${number}`)
    return res;
}




export default {loginOtpSend,Registration}




 

