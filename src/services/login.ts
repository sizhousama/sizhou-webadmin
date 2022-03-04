/*
 * @Author: sizhou
 * @Date: 2020-11-09 18:22:09
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-12 10:31:36
 */
// import { request } from 'umi';
import request from '@/utils/request'

export interface LoginParamsType {
  email: string;
  password: string;
}

export async function LoginAdmin(params: LoginParamsType) {
  return request<API.LoginStateType>('/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function userInfo() {
  return request('/user/info', {
    method: 'GET',
  });
}
