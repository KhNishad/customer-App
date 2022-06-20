
import request from '../utils/request';


async function  addToCart (data:any) {
    const res = await request('/shopping-cart',{method:"POST",data:data})
    return res;
}

async function getAllCartItem() {
    const data = await request('/shopping-cart')
    return data;
  }

async function placeOrder(data:any) {
    const res = await request('/requisition',{method:'POST',data:data})
    return res;
  }

async function placeHurryOrder(data:any) {
    const res = await request('/order/hurry',{method:'POST',data:data})
    return res;
  }

  

export default {addToCart,getAllCartItem,placeOrder,placeHurryOrder}




 

