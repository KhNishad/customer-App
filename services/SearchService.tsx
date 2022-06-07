import request from '../utils/request';


// async function  globalSearch (data:any,limit:any,current:any) {
//   const res = await request(`product/search?searchTerm=${data}&pageSize=${limit}&current=${current}`)
//   return res;
// }
async function  globalSearch (data:any,) {
  const res = await request(`/product/getList?searchTerm=${data}`)
  return res;
}


export default {globalSearch}