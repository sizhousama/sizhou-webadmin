/*
 * @Author: sizhou
 * @Date: 2020-11-16 14:43:43
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:44:49
 */
import request from '@/utils/request'


export async function userList(params: any) {
  return request('/admin/user', {
    method: 'GET',
    params,
  });
}

export async function userUpdate(data: any) {
  return request('/user/updateUserInfo', {
    method: 'POST',
    data,
  });
}
