
import request from '../utils/request';


async function getAllCategories() {
  const data = await request('/term/b2c/category?withChildren=true')
  return data;
}

async function categoryFilter(slug: string) {

  const data = await request(`/term/attribute/associate/filter/${slug}`)
  return data;
}

async function categoryFilterSPec(slug: string, id: any) {
  // if (id?.length > 1) {
  //   const stringVal = id.map((value) => `spec=${value}`).join('&');
  //   const data = await request(`/term/attribute/associate/filter/${slug}?${stringVal}`)
  //   return data;
  // } else {
  //   const data = await request(`/term/attribute/associate/filter/${slug}?spec=${id[0]}`)
  //   return data;
  // }

}

async function getCatWiseProductss(slug:string,id:any) {
  
  if (id?.length > 1) {

    const stringVal = id.map((value) => `spec=${value}`).join('&');
    console.log('............called',stringVal);

    const res = await request(`/product/getList?catSlug=${slug}&${stringVal}`)
    return res;
  } else {
    const data = await request(`/product/getList?catSlug${slug}&spec=${id[0]}`)
    return data;
  }
}




export default { getAllCategories, categoryFilter, categoryFilterSPec, getCatWiseProductss }






