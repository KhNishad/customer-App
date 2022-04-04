
import request from '../utils/request';


async function  getCatWiseProduct (data:any) {
     
    const res = await request(`/product/getList?catSlug=${data}`)
    
    return res;
}
async function  getSingleProductDetails (data:any) {
     
    const res = await request(`/product/details/${data}?withDetails=true`)
    
    return res;
}



export default {getCatWiseProduct,getSingleProductDetails}




 

