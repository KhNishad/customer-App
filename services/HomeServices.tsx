import request from '../utils/request';


async function  homeSettings (data:any) {
  
    const res = await request('/settings/info',{method:"POST",data:data})
    
    return res;
}

export default {homeSettings}