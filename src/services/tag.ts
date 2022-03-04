/*
 * @Author: sizhou
 * @Date: 2020-11-16 14:29:19
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:29:50
 */
import request from '@/utils/request'

export interface TagParamsType {
  status?:number|string;
}
export async function tagList(params: TagParamsType) {
  return request('/admin/tags', {
    method: 'GET',
    params,
  });
}
