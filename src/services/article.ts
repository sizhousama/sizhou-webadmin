/*
 * @Author: sizhou
 * @Date: 2020-11-09 18:22:09
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:00:38
 */
import request from '@/utils/request'

export interface ArticleParamsType {
  page: number|undefined;
  size: number|undefined;
  orderType?:string;
  category?:number;
  tag?:number;
  status?:number|string;
}
export async function articleList(params: ArticleParamsType) {
  return request('/articles', {
    method: 'GET',
    params,
  });
}

export async function DraftList(params: ArticleParamsType) {
  return request('/admin/drafts', {
    method: 'GET',
    params,
  });
}

