
import request from '../utils/request';


async function  getCatWiseProduct (data:any) {
     
    const res = await request(`/product/getList?catSlug=${data}`)
    
    return res;
}
async function  getSingleProductDetails (data:any) {
     
    const res = await request(`/product/details/${data}?withDetails=true`)
    
    return res;
}

async function ImageUpload(file:any) {
    // console.log('..................file',file);

  const res = await request('/media/upload/base64',{method:'POST',data:file})
  return res;
}



export default {getCatWiseProduct,getSingleProductDetails,ImageUpload}




 

