/*
 * @Author: sizhou
 * @Date: 2020-11-09 18:22:09
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:00:38
 */
import request from '@/utils/request'

export async function articleList(params: any) {
  return request('/articles', {
    method: 'GET',
    params,
  });
}

export async function DraftList(params: any) {
  return request('/adminDraft/list', {
    method: 'GET',
    params,
  });
}

