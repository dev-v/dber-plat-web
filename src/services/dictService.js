import {plat} from '../utils/request';

const rootPath = 'dict_category';
const rootDictPath = 'dict';

/**
 * 根据所属系统查询
 * @param currentPage
 * @param sys
 * @returns {Promise<*>}
 */
export async function queryCategory(currentPage, sys) {
  return plat(`${rootPath}/query/${currentPage}`, {payload: sys});
}

export async function queryByCategoryId(categoryId) {
  return plat(`${rootDictPath}/query`, {payload: {categoryId}});
}

export async function addCategory(category) {
  return plat(`${rootDictPath}/query`, {payload: category});
}
