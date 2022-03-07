/*
 * @Author: sizhou
 * @Date: 2020-11-16 14:19:11
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:20:26
 */
import request from '@/utils/request'

export interface CateParamsType {
  status?:number|string;
}
export async function categoryList(params: CateParamsType) {
  return request('/adminCate/list', {
    method: 'GET',
    params,
  });
}
