
import request from '../utils/request';


async function getAllCategories() {
  const data = await request('/term/b2c/category?withChildren=true')
  return data;
}




export default {getAllCategories}






