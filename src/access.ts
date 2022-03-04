/*
 * @Author: sizhou
 * @Date: 2020-11-09 18:22:09
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-12 11:47:56
 */
// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.account_type === 'ADMIN',
  };
}
