
import request from '../utils/request';


async function getAllBrand() {
  const data = await request('/term/b2c/Brand')
  return data;
}

async function getAllShop() {
  const data = await request('seller/b2c')
  return data;
}

async function getBrandWiseProduct(slug:any) {
  const data = await request(`product/getList?page=1&take=10&brandSlug=${slug}`)
  return data;
}
async function getShopWiseProduct(slug:any) {
  const data = await request(`product/getList?page=1&take=10&shopSlug=${slug}`)
  return data;
}




 
export default {getAllBrand,getBrandWiseProduct,getAllShop,getShopWiseProduct}