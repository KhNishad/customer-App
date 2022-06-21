import request from '../utils/request';

async function placeHurryOrder(data:any) {
    const res = await request('/order/hurry',{method:'POST',data:data})
    return res;
  }

  async function getHurryOrder() {
    const data = await request('/order/hurry')
    return data;
  }
  async function getHurryOrderDetails(id:any) {
    const data = await request(`order/hurry/${id}`)
    return data;
  }


  export default {placeHurryOrder,getHurryOrder,getHurryOrderDetails}