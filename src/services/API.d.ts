/*
 * @Author: sizhou
 * @Date: 2020-11-09 18:22:09
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-12 11:18:41
 */
declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    username?: string;
    email?: string;
    id?: string;
    account_type?: 'ADMIN' | 'GENERAL';
  }

  export interface LoginStateType {
    status?: 1 | 0;
    data?:any;
    type?: string;
  }
}