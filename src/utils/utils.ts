/*
 * @Author: sizhou
 * @Date: 2020-09-11 15:59:27
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-12 11:21:51
 */
import { history } from 'umi'
import storageHelper from '@/utils/storage'
import { stringify } from 'querystring';
import Cookies from 'js-cookie'
const TokenKey = 'token'

export const getToken = () => {
  return Cookies.get(TokenKey)
}

export const setToken = (token: string) => {
  return Cookies.set(TokenKey, token)
}

export const removeToken = () => {
  return Cookies.remove(TokenKey)
}

// 跳转登录
export const pageLogin = () => {
  storageHelper.clear('user')
  removeToken()
  const { query } = history.location;
  const { redirect } = query;
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
    });
  }
}