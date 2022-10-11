
import request from '../utils/request';


async function  Registration (data:any) {
  
    const res = await request('/auth/b2c/register',{method:"POST",data:data})
    
    return res;
}
async function  loginOtpSend (number:any) {
    const res = await request(`/auth/b2c/otp/send?phone=${number}`)
    return res;
}
async function  forgotOtpSend (number:any) {
    const res = await request(`/auth/b2c/otp/send?phone=${number}`)
    return res;
}
async function  loginWithPassword (data:any) {
    const res = await request(`/auth/b2c/login`,{method:'POST',data:data})
    return res;
}
async function  resetPassword (data:any) {
    const res = await request(`/auth/b2c/reset`,{method:'POST',data:data})
    return res;
}




export default {loginOtpSend,Registration,loginWithPassword,forgotOtpSend,resetPassword}




 

