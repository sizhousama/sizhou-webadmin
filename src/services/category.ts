/*
 * @Author: sizhou
 * @Date: 2020-11-16 14:19:11
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:20:26
 */
import request from '@/utils/request'

export async function categoryList(params: any) {
  return request('/adminCate/list', {
    method: 'GET',
    params,
  });
}

export async function categoryAdd(data: any) {
  return request('/adminCate/add', {
    method: 'POST',
    data,
  });
}

export async function categoryDelete(data: any) {
  return request(`/adminCate/delete/${data.id}`, {
    method: 'DELETE'
  });
}

export async function categoryUpdate(data: any) {
  return request('/adminCate/update', {
    method: 'POST',
    data,
  });
}

export async function categoryGet(params: any) {
  return request(`/adminCate/get/${params.id}`, {
    method: 'GET'
  });
}
