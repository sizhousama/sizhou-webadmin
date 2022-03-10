/*
 * @Author: sizhou
 * @Date: 2020-11-16 14:29:19
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:29:50
 */
import request from '@/utils/request'

export async function tagList(params: any) {
  return request('/adminTag/list', {
    method: 'GET',
    params,
  });
}

export async function tagAdd(data: any) {
  return request('/adminTag/add', {
    method: 'POST',
    data,
  });
}

export async function tagDelete(data: any) {
  return request(`/adminTag/delete/${data.id}`, {
    method: 'DELETE'
  });
}

export async function tagUpdate(data: any) {
  return request('/adminTag/update', {
    method: 'POST',
    data,
  });
}

export async function tagGet(params: any) {
  return request(`/adminTag/get/${params.id}`, {
    method: 'GET'
  });
}