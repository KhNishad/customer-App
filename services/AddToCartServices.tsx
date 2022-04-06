
import request from '../utils/request';


async function  addToCart (data:any) {
    const res = await request('/shopping-cart',{method:"POST",data:data})
    return res;
}

async function getAllCartItem() {
    const data = await request('/shopping-cart')
    return data;
  }





export default {addToCart,getAllCartItem}




 

