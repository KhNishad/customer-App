import request from '../utils/request';

async function getRewuisition() {
    const data = await request(`/requisition?page=1&take=10`)
    return data;
  }

  async function getRequisitionDetails(id:any) {
    const data = await request(`/requisition/${id}`)
    return data;
  }


export default {getRewuisition,getRequisitionDetails}