
import request from '../utils/request';

async function getDivision() {
    const data = await request(`/term/b2c/division?withChildren=true`)
    return data;
  }

async function getPoliceStation(id:any) {
    const data = await request(`/term/b2c/city/${id}?withChildren=true&platform=4`)
    return data;
  }

  async function setAddress(id:any,data:any) {
    const res = await request(`/user/${id}`,{method:'PUT',data:data})
    return res;
  }

export default {getPoliceStation,getDivision,setAddress}