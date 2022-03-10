/*
 * @Author: sizhou
 * @Date: 2020-11-09 18:22:09
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:00:38
 */
import request from '@/utils/request'

export async function articleList(params: any) {
  return request('/adminArticle/list', {
    method: 'GET',
    params,
  });
}

export async function articleDelete(data: any) {
  return request(`/adminArticle/delete/${data.id}`, {
    method: 'DELETE'
  });
}

export async function articleUpdate(data: any) {
  return request('/adminArticle/update', {
    method: 'POST',
    data,
  });
}

export async function articleGet(params: any) {
  return request(`/adminArticle/get/${params.id}`, {
    method: 'GET'
  });
}
