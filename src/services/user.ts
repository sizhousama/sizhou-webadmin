/*
 * @Author: sizhou
 * @Date: 2020-11-16 14:43:43
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:44:49
 */
import request from '@/utils/request'


export async function userList(params: any) {
  return request('/adminUser/list', {
    method: 'GET',
    params,
  });
}

export async function userGet(params: any) {
  return request('/adminUser/get', {
    method: 'GET',
    params,
  });
}

export async function userUpdate(data: any) {
  return request('/adminUser/update', {
    method: 'POST',
    data,
  });
}

export async function userAdd(data: any) {
  return request('/adminUser/add', {
    method: 'POST',
    data,
  });
}

export async function userDelete(data: any) {
  return request('/adminUser/delete', {
    method: 'POST',
    data,
  });
}
