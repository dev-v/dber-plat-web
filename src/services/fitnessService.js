import {plat} from '../utils/request';

export async function query(currentPage, datas) {
  return plat(`fitness_service/query/${currentPage}`, {payload: datas});
}
