
import request from '../utils/request';


async function getAllCategories() {
  const data = await request('/term/b2c/category?withChildren=true')
  return data;
}

async function categoryFilter(slug:string) {

  const data = await request(`/term/attribute/associate/filter/${slug}`)
  return data;
}
async function categoryFilterSPec(slug:string,id:number) {
 let arr  = [id]
  const data = await request(`/term/attribute/associate/filter/${slug}?spec${arr}`)
  return data;
}



 
export default {getAllCategories,categoryFilter,categoryFilterSPec}






