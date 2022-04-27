import request from '../utils/request';

async function getAllOrder() {
    const data = await request(`/order/sales-center/all?page=1&take=10`)
    return data;
  }

  async function getOrderDetails(id:any) {
    const data = await request(`/order/sales-center?id=${id}&withDetails=true`)
    
    return data;
  }


export default {getAllOrder,getOrderDetails}