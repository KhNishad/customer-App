import request from "../utils/request";

async function getAllBrand(page: number) {
  const data = await request(`/term/b2c/brand?page=${page}&take=18`);
  return data;
}

async function getAllShop() {
  const data = await request("seller/b2c");
  return data;
}

async function getBrandWiseProduct(page:number,slug: any) {
  const data = await request(
    `product/getList?page=${page}&take=10&brandSlug=${slug}`
  );
  return data;
}
async function getShopWiseProduct(page:number,slug: any,) {
  const data = await request(`product/getList?page=${page}&take=12&shopSlug=${slug}`);
  return data;
}

export default {
  getAllBrand,
  getBrandWiseProduct,
  getAllShop,
  getShopWiseProduct,
};
